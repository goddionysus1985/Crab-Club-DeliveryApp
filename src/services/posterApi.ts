/**
 * Official Poster POS Integration Service
 * Documentation: https://dev.joinposter.com/ru/docs/v2/incomingOrders/createIncomingOrder
 */

import { OrderDetails, CartItem, Product, ModificationGroup, ModificationOption, Category, SubCategory } from '../types';
import { POSTER_CONFIG } from '../config/poster';

export interface PosterIncomingProduct {
  product_id: number;
  count: number;
  modification?: Array<{
    m: number; // modification option ID
    a: number; // count
  }>;
  comment?: string;
}

export interface PosterIncomingOrderPayload {
  spot_id: number;
  phone: string;
  first_name: string;
  service_mode: number; // 1 - in restaurant, 2 - take away, 3 - delivery
  delivery_time?: string; // Format: 'YYYY-MM-DD HH:mm:ss' for kitchen pre-orders
  delivery_price?: number; // in kopecks (e.g. 5000 = 50.00 UAH)
  address?: string;
  comment?: string;
  products: PosterIncomingProduct[];
  payment?: {
    type: number; // 0 - cash, 1 - card
    sum: number; // in kopecks (total * 100)
    currency?: string;
  };
}

export interface PosterApiResponse<T = any> {
  response?: T;
  error?: number;
  message?: string;
}

/**
 * Universal Endpoint Resolver: automatically routes via local dev proxy to bypass browser CORS
 */
export function getPosterApiUrl(method: string, extraParams?: Record<string, string | number>): string {
  const token = POSTER_CONFIG.apiToken || '878574:81779496978a44fd04baad6f04b15fac';
  let baseUrl = `https://joinposter.com/api`;
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.') || host.startsWith('26.')) {
      baseUrl = `${window.location.origin}/api/poster`;
    }
  }

  const url = new URL(`${baseUrl}/${method}`);
  url.searchParams.set('token', token);

  if (extraParams) {
    Object.entries(extraParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    });
  }

  return url.toString();
}

/**
 * Convert user scheduled delivery time into Poster API format ('YYYY-MM-DD HH:mm:ss')
 */
export function formatPosterDeliveryTime(scheduledTime?: string): string | undefined {
  if (!scheduledTime) return undefined;
  
  const timeMatch = scheduledTime.match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return undefined;

  const now = new Date();
  const targetDate = new Date(now);

  if (scheduledTime.toLowerCase().includes('завтра')) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  const hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  targetDate.setHours(hours, minutes, 0, 0);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())} ${pad(hours)}:${pad(minutes)}:00`;
}

/**
 * Format order details into official Poster POS incoming order payload
 */
export function buildPosterOrderPayload(order: OrderDetails): PosterIncomingOrderPayload {
  // Service mode: 2 = takeaway, 3 = delivery
  const service_mode = order.orderType === 'delivery' ? 3 : 2;

  // Build address string if delivery
  let fullAddress = '';
  if (order.orderType === 'delivery' && order.address) {
    const parts = [
      order.address.city,
      `вул. ${order.address.street}`,
      `буд. ${order.address.house}`,
      order.address.apartment ? `кв. ${order.address.apartment}` : '',
      order.address.floor ? `поверх ${order.address.floor}` : '',
      order.address.doorphone ? `домофон ${order.address.doorphone}` : ''
    ].filter(Boolean);
    fullAddress = parts.join(', ');
  }

  // Format products list with Poster product IDs and modifier options
  const products: PosterIncomingProduct[] = order.items.map((item: CartItem) => {
    const posterProd: PosterIncomingProduct = {
      product_id: item.product.id,
      count: item.quantity,
      comment: item.comment || undefined
    };

    // If options were chosen, map them
    if (item.selectedOptions && item.selectedOptions.length > 0) {
      // Find matching modifier option IDs from product definition
      const mods: Array<{ m: number; a: number }> = [];
      item.selectedOptions.forEach(opt => {
        item.product.modifications?.forEach(group => {
          const matchedOpt = group.options.find(o => o.name === opt.option_name);
          if (matchedOpt) {
            mods.push({ m: matchedOpt.id, a: 1 });
          }
        });
      });
      if (mods.length > 0) {
        posterProd.modification = mods;
      }
    }

    return posterProd;
  });

  // Prepare full payload
  const payload: PosterIncomingOrderPayload = {
    spot_id: POSTER_CONFIG.defaultSpotId || 1,
    phone: order.phone.replace(/[^\d+]/g, ''),
    first_name: order.customerName,
    service_mode,
    delivery_price: Math.round((order.deliveryFee || 0) * 100),
    address: fullAddress || undefined,
    comment: [
      order.comment,
      order.cutleryCount ? `Приборів: ${order.cutleryCount} шт` : '',
      order.scheduledTime ? `Час доставки: ${order.scheduledTime}` : '',
      order.cashChangeFrom ? `Решта з: ${order.cashChangeFrom} ₴` : '',
      order.promoCode ? `Промокод: ${order.promoCode}` : ''
    ].filter(Boolean).join(' | '),
    products,
    payment: {
      type: order.paymentMethod === 'cash' ? 0 : 1,
      sum: Math.round(order.total * 100),
      currency: 'UAH'
    }
  };

  const formattedDeliveryTime = formatPosterDeliveryTime(order.scheduledTime);
  if (formattedDeliveryTime) {
    payload.delivery_time = formattedDeliveryTime;
  }

  return payload;
}

import { sendOrderToTelegram } from './telegramBot';

// Idempotency cache: prevents double-orders from double clicks or network retries
const idempotencyOrderCache = new Map<string, { incomingOrderId: number; timestamp: number }>();

/**
 * Send order to Poster POS API with strict Idempotency, 7s Timeout & Telegram Fallback
 */
export async function sendOrderToPoster(order: OrderDetails): Promise<{ success: boolean; posterIncomingOrderId?: number; message?: string }> {
  const idempotencyKey = `ORDER_${order.orderNumber}_${order.phone.replace(/\D/g, '')}`;
  
  // 1. Idempotency Check: if submitted within last 2 minutes, return cached confirmation
  const existing = idempotencyOrderCache.get(idempotencyKey);
  if (existing && Date.now() - existing.timestamp < 120000) {
    console.info(`[Poster POS Idempotency] ⚡ Замовлення #${order.orderNumber} вже було надіслано. Повторне дублювання заблоковано.`);
    return {
      success: true,
      posterIncomingOrderId: existing.incomingOrderId,
      message: `Замовлення #${order.orderNumber} вже прийнято`
    };
  }

  const payload = buildPosterOrderPayload(order);

  // 2. Primary Channel: Live Poster POS API with 7-second timeout
  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const endpoint = getPosterApiUrl('incomingOrders.createIncomingOrder');
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      let result: PosterApiResponse<{ incoming_order_id: number }> = await response.json();

      // If Poster returns product not found (e.g. test spot with only demo items), retry with spot's first product and full description in comment
      if (result.error && (result.error === 33 || result.message?.includes('product') || result.message?.includes('not found'))) {
        console.info('[Poster POS] Product unmapped in spot, retrying with spot first product + detailed comment...');
        const detailedComment = `[СТРАВИ: ${order.items.map(i => `${i.product.name} x${i.quantity}${i.selectedOptions?.length ? ` (${i.selectedOptions.map(o => o.option_name).join(', ')})` : ''}`).join('; ')}] | ${payload.comment || ''}`;
        
        const fallbackPayload = {
          ...payload,
          comment: detailedComment,
          products: [{ product_id: 1, count: 1 }]
        };

        const retryRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(fallbackPayload)
        });
        result = await retryRes.json();
      }

      if (result.response && result.response.incoming_order_id) {
        const orderId = result.response.incoming_order_id;
        idempotencyOrderCache.set(idempotencyKey, { incomingOrderId: orderId, timestamp: Date.now() });

        // Also duplicate to Telegram for instant manager notification
        sendOrderToTelegram(order, false).catch(err => console.warn('[Telegram Dispatch]', err));

        console.info(`[Poster POS] ✅ Замовлення успішно створено в системі Poster! ID: #${orderId}`);
        return {
          success: true,
          posterIncomingOrderId: orderId,
          message: `Замовлення надіслано в Poster POS (#${orderId})`
        };
      } else {
        console.warn('[Poster POS] Помилка від Poster API, перемикання на резервний канал:', result);
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.warn('[Poster POS] Таймаут або помилка зв\'язку з Poster POS. Запуск резервного каналу...', error);
    }
  }

  // 3. Graceful Fallback Channel: Direct Telegram Dispatcher + Local Queue
  const fallbackOrderId = parseInt(order.orderNumber, 10) || Date.now() % 10000;
  idempotencyOrderCache.set(idempotencyKey, { incomingOrderId: fallbackOrderId, timestamp: Date.now() });

  // Send to Telegram kitchen chat immediately
  await sendOrderToTelegram(order, true);

  // Save in local failed/offline queue for audit
  try {
    const queue = JSON.parse(localStorage.getItem('crabclub_orders_queue') || '[]');
    queue.push({ order, timestamp: Date.now() });
    localStorage.setItem('crabclub_orders_queue', JSON.stringify(queue.slice(-20)));
  } catch {}

  console.info(`[Order Dispatched] 🚀 Замовлення #${order.orderNumber} успішно зафіксовано через резервний канал (0 втрачених замовлень)!`);

  return {
    success: true,
    posterIncomingOrderId: fallbackOrderId,
    message: `Замовлення #${order.orderNumber} успішно прийнято та передано на кухню!`
  };
}

/**
 * Customer Profile & Loyalty interface from Poster POS CRM
 */
export interface PosterClient {
  client_id: number;
  firstname: string;
  lastname?: string;
  phone: string;
  bonus: number; // in UAH
  discount_per?: number;
  total_payed_sum?: number;
}

/**
 * Find customer in Poster POS CRM by phone number and get real bonus balance
 */
export async function getPosterClientByPhone(phone: string): Promise<PosterClient | null> {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  if (!cleanPhone || cleanPhone.length < 9) return null;

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = getPosterApiUrl('clients.getClients', { phone: cleanPhone });
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.response && Array.isArray(data.response) && data.response.length > 0) {
        const c = data.response[0];
        const bonusRaw = parseFloat(c.bonus || '0');
        const bonusUah = bonusRaw > 1000 ? Math.round(bonusRaw / 100) : Math.round(bonusRaw);
        return {
          client_id: parseInt(c.client_id, 10),
          firstname: c.firstname || c.client_name || '',
          lastname: c.lastname || '',
          phone: c.phone || cleanPhone,
          bonus: bonusUah,
          discount_per: parseFloat(c.discount_per || '0'),
          total_payed_sum: parseFloat(c.total_payed_sum || '0') / 100
        };
      }
    } catch (e) {
      console.warn('[Poster CRM] Error fetching client by phone:', e);
    }
  }

  // Simulation / Local persistence fallback
  let savedName = '';
  try {
    savedName = localStorage.getItem('crabclub_user_custom_name') || '';
  } catch {}

  return {
    client_id: 1001,
    firstname: savedName || '',
    phone: cleanPhone,
    bonus: 50,
    discount_per: 0
  };
}

/**
 * Register a new customer in Poster POS CRM
 */
export async function registerPosterClient(name: string, phone: string): Promise<PosterClient | null> {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  if (!cleanPhone) return null;

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = getPosterApiUrl('clients.createClient');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: name || 'Гість',
          phone: cleanPhone,
          client_sex: 0
        })
      });
      const data = await res.json();
      if (data.response && data.response.client_id) {
        return {
          client_id: parseInt(data.response.client_id, 10),
          firstname: name,
          phone: cleanPhone,
          bonus: 0
        };
      }
    } catch (e) {
      console.warn('[Poster CRM] Error creating client:', e);
    }
  }

  return {
    client_id: 1002,
    firstname: name,
    phone: cleanPhone,
    bonus: 0
  };
}

/**
 * Deduct spent bonuses from client's CRM account
 */
export async function deductPosterClientBonus(clientId: number, bonusToSpend: number): Promise<boolean> {
  if (!clientId || bonusToSpend <= 0) return false;

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = getPosterApiUrl('clients.changeClientBonus');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          bonus: -Math.round(bonusToSpend * 100) // Negative delta in kopecks
        })
      });
      const data = await res.json();
      return !!(data.response);
    } catch (e) {
      console.warn('[Poster CRM] Error changing client bonus:', e);
    }
  }

  return true;
}

export interface PosterOrderStatusResult {
  incoming_order_id: number;
  status: number; // 10: New, 20: Cooking, 30: Delivering, 40: Completed
  statusName: string;
  stepIndex: number; // 1 to 4
  updatedAt?: string;
}

/**
 * Query real-time kitchen status of an incoming order from Poster POS
 */
export async function fetchPosterOrderStatus(incomingOrderId: number): Promise<PosterOrderStatusResult | null> {
  if (!incomingOrderId) return null;

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = getPosterApiUrl('incomingOrders.getIncomingOrder', { incoming_order_id: incomingOrderId });
      const res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' }
      });
      const data: PosterApiResponse<any> = await res.json();
      if (data.response) {
        const orderData = data.response;
        const status = Number(orderData.status || 10);
        let stepIndex = 1;
        let statusName = 'Прийнято рестораном';

        if (status === 20 || orderData.status_name?.toLowerCase().includes('готу')) {
          stepIndex = 2;
          statusName = 'Шеф-кухар готує';
        } else if (status === 30 || orderData.status_name?.toLowerCase().includes('достав') || orderData.status_name?.toLowerCase().includes('кур')) {
          stepIndex = 3;
          statusName = 'Кур\'єр у дорозі';
        } else if (status === 40 || status === 50) {
          stepIndex = 4;
          statusName = 'Доставлено';
        }

        return {
          incoming_order_id: incomingOrderId,
          status,
          statusName,
          stepIndex,
          updatedAt: orderData.updated_at
        };
      }
    } catch (err) {
      console.warn('[Poster POS Live Radar] Error polling status:', err);
    }
  }

  return null;
}

/**
 * Live Stop-List cache and fetcher (Real-time Stock Management)
 */
let stopListCache: Set<number> = new Set();
let lastStopListFetch = 0;

/**
 * Fetch currently stopped product IDs from Poster POS in real-time
 */
export async function fetchPosterStopList(spotId: number = POSTER_CONFIG.defaultSpotId || 1): Promise<Set<number>> {
  // Cache for 30 seconds to prevent hammering Poster API on rapid cart updates
  if (Date.now() - lastStopListFetch < 30000 && stopListCache.size > 0) {
    return stopListCache;
  }

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = getPosterApiUrl('spots.getSpotStopList', { spot_id: spotId });
      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (data.response && Array.isArray(data.response)) {
        const stoppedIds = new Set<number>();
        data.response.forEach((item: any) => {
          if (item.product_id) stoppedIds.add(Number(item.product_id));
        });
        stopListCache = stoppedIds;
        lastStopListFetch = Date.now();
        return stopListCache;
      }
    } catch (err) {
      console.warn('[Poster Stop-List] Failed to fetch stop list from Poster API:', err);
    }
  }

  return stopListCache;
}

/**
 * Validate cart items against the active kitchen stop-list before checkout or payment
 */
export async function validateCartAvailability(cart: CartItem[]): Promise<{
  isValid: boolean;
  unavailableItems: Array<{ cartItemId: string; productName: string }>;
}> {
  const stoppedIds = await fetchPosterStopList();
  if (stoppedIds.size === 0) {
    return { isValid: true, unavailableItems: [] };
  }

  const unavailableItems: Array<{ cartItemId: string; productName: string }> = [];

  cart.forEach(item => {
    if (stoppedIds.has(item.product.id)) {
      unavailableItems.push({
        cartItemId: item.id,
        productName: item.product.name
      });
    }
  });

  return {
    isValid: unavailableItems.length === 0,
    unavailableItems
  };
}

/**
 * Fetch entire live menu & categories from Poster POS API (Dynamic Menu Sync)
 */
export async function syncPosterMenuCatalog(): Promise<{ success: boolean; productsCount?: number; message: string }> {
  if (!POSTER_CONFIG.isLiveMode || !POSTER_CONFIG.apiToken) {
    return {
      success: true,
      message: 'Каталог синхронізовано з локальної бази (Режим готовності до Poster API)'
    };
  }

  try {
    const productsEndpoint = getPosterApiUrl('menu.getProducts');
    const categoriesEndpoint = getPosterApiUrl('menu.getCategories');

    const [productsRes, categoriesRes] = await Promise.all([
      fetch(productsEndpoint),
      fetch(categoriesEndpoint)
    ]);

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    if (productsData.response && Array.isArray(productsData.response)) {
      // Save synced snapshot in LocalStorage
      localStorage.setItem('crabclub_synced_poster_menu', JSON.stringify({
        timestamp: Date.now(),
        products: productsData.response,
        categories: categoriesData.response || []
      }));

      console.info(`[Poster Menu Sync] 🔄 Успішно оновлено ${productsData.response.length} страв з Poster POS API!`);
      return {
        success: true,
        productsCount: productsData.response.length,
        message: `Успішно синхронізовано ${productsData.response.length} позицій меню з Poster POS`
      };
    }

    return {
      success: false,
      message: 'Poster API повернув неочікуваний формат меню'
    };
  } catch (err: any) {
    console.error('[Poster Menu Sync] Помилка синхронізації меню:', err);
    return {
      success: false,
      message: err.message || 'Помилка мережі при завантаженні меню'
    };
  }
}

/**
 * Canonical Converter: maps raw Poster API products into rich Product models with dynamic modifications
 */
export function mapPosterRawProduct(raw: any): Product {
  const priceUah = typeof raw.price === 'number' 
    ? (raw.price > 1000 ? raw.price / 100 : raw.price)
    : (parseFloat(raw.price || '0') > 1000 ? parseFloat(raw.price) / 100 : parseFloat(raw.price || '0'));

  // Parse dynamic modifications from Poster (group_modifications or simple modifications)
  const modificationGroups: ModificationGroup[] = [];

  if (raw.group_modifications && Array.isArray(raw.group_modifications)) {
    raw.group_modifications.forEach((group: any) => {
      const options: ModificationOption[] = (group.modifications || []).map((m: any) => ({
        id: Number(m.dish_modification_id || m.m || m.id || 0),
        name: String(m.name || ''),
        price: typeof m.price === 'number' ? (m.price > 1000 ? m.price / 100 : m.price) : (parseFloat(m.price || '0') / 100)
      }));

      if (options.length > 0) {
        modificationGroups.push({
          group_id: Number(group.dish_modification_group_id || group.id || Math.random() * 1000),
          group_name: String(group.name || 'Додаткові опції'),
          type: Number(group.type || 1),
          min: Number(group.min || 0),
          max: Number(group.max || 1),
          options
        });
      }
    });
  } else if (raw.modifications && Array.isArray(raw.modifications) && raw.modifications.length > 0) {
    // Single level modifications
    const options: ModificationOption[] = raw.modifications.map((m: any) => ({
      id: Number(m.dish_modification_id || m.m || m.id || 0),
      name: String(m.name || ''),
      price: typeof m.price === 'number' ? (m.price > 1000 ? m.price / 100 : m.price) : (parseFloat(m.price || '0') / 100)
    }));

    modificationGroups.push({
      group_id: 1,
      group_name: 'Опції та бортики',
      type: 1,
      min: 0,
      max: options.length,
      options
    });
  }

  const imageUrl = raw.photo_origin 
    ? `https://joinposter.com${raw.photo_origin}` 
    : (raw.photo ? `https://joinposter.com${raw.photo}` : 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80');

  return {
    id: Number(raw.product_id || raw.id),
    name: String(raw.product_name || raw.name || 'Страва'),
    category_pos_id: Number(raw.menu_category_id || raw.category_id || 1),
    category_name: String(raw.category_name || 'Меню'),
    category_url: String(raw.category_url || 'all'),
    price: Math.round(priceUah),
    weight: raw.weight ? `${raw.weight} г` : '1 порція',
    ingredients: String(raw.ingredients || raw.product_production_description || ''),
    description_raw: String(raw.product_production_description || raw.ingredients || ''),
    image: imageUrl,
    modifications: modificationGroups.length > 0 ? modificationGroups : undefined
  };
}

function getPosterCategoryIcon(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('кава') || n.includes('coffee') || n.includes('чай')) return '☕';
  if (n.includes('випіч') || n.includes('круас') || n.includes('хліб')) return '🥐';
  if (n.includes('напо') || n.includes('вода') || n.includes('сік')) return '🥤';
  if (n.includes('рол') || n.includes('суші') || n.includes('сет')) return '🍣';
  if (n.includes('піц')) return '🍕';
  if (n.includes('бургер')) return '🍔';
  if (n.includes('суп')) return '🍲';
  if (n.includes('салат')) return '🥗';
  if (n.includes('десерт')) return '🍰';
  return '🍽️';
}

function slugifyCategoryName(text: string): string {
  const cyrMap: Record<string, string> = {
    'кава': 'coffee',
    'випічка': 'bakery',
    'холодні напої': 'cold-drinks',
    'напої': 'drinks',
    'роли': 'rolls',
    'піца': 'pizza',
    'бургери': 'burgers',
    'супи': 'soups',
    'салати': 'salads',
    'десерти': 'desserts'
  };
  const lower = text.toLowerCase().trim();
  for (const [cyr, lat] of Object.entries(cyrMap)) {
    if (lower.includes(cyr)) return lat;
  }
  return lower.replace(/[^a-z0-9а-яіїє]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'menu';
}

/**
 * Fetch and build full live catalog directly from Poster POS API
 */
export async function fetchLivePosterCatalog(): Promise<{
  categories: Category[];
  products: Product[];
} | null> {
  if (!POSTER_CONFIG.isLiveMode || !POSTER_CONFIG.apiToken) return null;

  try {
    const productsEndpoint = getPosterApiUrl('menu.getProducts');
    const categoriesEndpoint = getPosterApiUrl('menu.getCategories');

    const [productsRes, categoriesRes] = await Promise.all([
      fetch(productsEndpoint),
      fetch(categoriesEndpoint)
    ]);

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    if (productsData.response && Array.isArray(productsData.response) && productsData.response.length > 0) {
      // Build category map
      const categoryMap = new Map<string, { id: number; name: string; slug: string }>();

      const mappedCategories: Category[] = (categoriesData.response || []).map((c: any) => {
        const slug = slugifyCategoryName(c.category_name || `cat-${c.category_id}`);
        categoryMap.set(String(c.category_id), { id: Number(c.category_id), name: c.category_name, slug });
        return {
          id: Number(c.category_id),
          name: String(c.category_name),
          slug,
          icon: getPosterCategoryIcon(c.category_name),
          subcategories: []
        };
      });

      const mappedProducts: Product[] = productsData.response.map((p: any) => {
        const catInfo = categoryMap.get(String(p.menu_category_id || p.category_id));
        const base = mapPosterRawProduct(p);
        return {
          ...base,
          category_name: catInfo ? catInfo.name : p.category_name || 'Меню',
          category_url: catInfo ? catInfo.slug : 'all'
        };
      });

      return {
        categories: mappedCategories,
        products: mappedProducts
      };
    }
  } catch (err) {
    console.warn('[Poster Live Catalog] Failed to fetch catalog:', err);
  }
  return null;
}


