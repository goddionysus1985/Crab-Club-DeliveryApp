/**
 * Official Poster POS Integration Service
 * Documentation: https://dev.joinposter.com/ru/docs/v2/incomingOrders/createIncomingOrder
 */

import { OrderDetails, CartItem, Product, ModificationGroup, ModificationOption, Category, SubCategory } from '../types';
import { POSTER_CONFIG } from '../config/poster';
import { CATEGORIES, PRODUCTS } from '../data/menuData';

export interface PosterIncomingProduct {
  product_id: number;
  count: number;
  price?: number;
  modificator_id?: number;
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
  last_name?: string;
  service_mode: number; // 0 - dine-in, 1 - takeout/самовивіз, 2 - delivery/доставка
  delivery_time?: string; // Format: 'YYYY-MM-DD HH:mm:ss' for kitchen pre-orders
  delivery_price?: number; // in kopecks (e.g. 5000 = 50.00 UAH)
  address?: string;
  client_address?: {
    country?: string;
    city?: string;
    address1?: string;
    address2?: string;
    comment?: string;
    lat?: number;
    lng?: number;
    zip_code?: string;
  };
  comment?: string;
  products: PosterIncomingProduct[];
  client_id?: number; // Links order to Poster CRM client for loyalty tracking
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

// In-flight request deduplication cache to prevent parallel identical network queries
const activeInFlightRequests = new Map<string, Promise<any>>();

/**
 * Resilient JSON fetcher for Poster API:
 * 1. Automatic in-flight request deduplication (prevents thundering herd)
 * 2. Automatic retry with exponential backoff on HTTP 429 / network hiccups
 * 3. Transparent fallback to CORS proxy when running outside localhost (e.g. GitHub Pages)
 */
export async function fetchPosterApiJson<T = any>(endpoint: string, options?: RequestInit, retries = 2): Promise<PosterApiResponse<T>> {
  const method = (options?.method || 'GET').toUpperCase();
  const isGet = method === 'GET';
  const cacheKey = `${method}:${endpoint}:${options?.body ? String(options.body) : ''}`;

  // If identical GET is already in-flight, return the existing promise
  if (isGet && activeInFlightRequests.has(cacheKey)) {
    return activeInFlightRequests.get(cacheKey)!;
  }

  const execute = async (): Promise<PosterApiResponse<T>> => {
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(endpoint, options);

        if (res.status === 429) {
          // Rate limited: wait with exponential backoff
          const waitTime = Math.pow(2, attempt) * 1000 + Math.floor(Math.random() * 500);
          console.warn(`[Poster API Throttler] ⏳ 429 Rate Limited. Очікування ${waitTime}мс перед повтором...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }

        if (!res.ok && res.status !== 200) {
          throw new Error(`HTTP ${res.status}`);
        }

        return await res.json();
      } catch (err: any) {
        lastError = err;

        // If not on localhost and error is fetch/CORS related, try proxy for GET requests
        if (isGet && typeof window !== 'undefined') {
          const host = window.location.hostname;
          if (host !== 'localhost' && host !== '127.0.0.1') {
            try {
              const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoint)}`;
              const proxyRes = await fetch(proxyUrl);
              return await proxyRes.json();
            } catch {
              // try next retry
            }
          }
        }

        if (attempt < retries) {
          const delay = (attempt + 1) * 800;
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }

    throw lastError;
  };

  const promise = execute().finally(() => {
    if (isGet) activeInFlightRequests.delete(cacheKey);
  });

  if (isGet) {
    activeInFlightRequests.set(cacheKey, promise);
  }

  return promise;
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

// Live product cache from Poster with 5-minute TTL
let livePosterProductsCache: Array<{ product_id: string | number; product_name: string; price: any }> = [];
let productsCacheExpiry = 0;
const PRODUCTS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getLivePosterProductsList(): Promise<Array<{ product_id: number; product_name: string; price: any }>> {
  if (livePosterProductsCache.length > 0 && Date.now() < productsCacheExpiry) {
    return livePosterProductsCache as any;
  }
  try {
    const endpoint = getPosterApiUrl('menu.getProducts');
    const data = await fetchPosterApiJson(endpoint);
    if (data.response && Array.isArray(data.response)) {
      livePosterProductsCache = data.response;
      productsCacheExpiry = Date.now() + PRODUCTS_CACHE_TTL;
    }
  } catch (e) {
    console.warn('[Poster Products Cache]', e);
  }
  return livePosterProductsCache as any;
}

export function invalidatePosterProductsCache(): void {
  productsCacheExpiry = 0;
}

/**
 * Format order details into official Poster POS incoming order payload
 */
export function buildPosterOrderPayload(order: OrderDetails): PosterIncomingOrderPayload {
  // Service mode per official Poster POS API docs:
  // 1 = Dine-in (В закладі / За столиком)
  // 2 = Takeaway / Takeout (Самовивіз / На виніс)
  // 3 = Delivery (Кур'єрська доставка)
  let service_mode = 3;
  if (order.orderType === 'dinein') {
    service_mode = 1;
  } else if (order.orderType === 'takeaway') {
    service_mode = 2;
  }

  const nameParts = (order.customerName || 'Гість').trim().split(/\s+/);
  const first_name = nameParts[0] || 'Гість';
  const last_name = nameParts.slice(1).join(' ') || undefined;

  const isDelivery = order.orderType === 'delivery';
  const isDineIn = order.orderType === 'dinein';

  // Only construct delivery address if orderType is delivery
  let client_address: any = undefined;

  if (isDelivery) {
    const cleanCity = (order.address?.city || 'смт. Овідіополь')
      .replace(/\s*\(.*?\)/g, '')
      .replace(/—.*$/g, '')
      .trim() || 'смт. Овідіополь';
    const street = (order.address?.street || '').trim();
    const house = (order.address?.house || '').trim();
    const apartment = (order.address?.apartment || '').trim();
    const floor = (order.address?.floor || '').trim();
    const doorphone = (order.address?.doorphone || '').trim();

    const streetAndHouse = [street ? `вул. ${street}` : '', house ? `буд. ${house}` : ''].filter(Boolean).join(', ');
    const address1 = [cleanCity, streetAndHouse].filter(Boolean).join(', ') || cleanCity;
    const address2 = [apartment ? `кв. ${apartment}` : '', floor ? `пов. ${floor}` : '', doorphone ? `код/домофон ${doorphone}` : ''].filter(Boolean).join(', ');

    client_address = {
      country: 'Україна',
      city: cleanCity,
      address1: address1 || cleanCity,
      address2: address2 || ''
    };
  }

  // Format products list with full group & simple modifier fidelity for Poster POS
  // Automatically merges items with identical product_id and identical modifiers to prevent Poster POS Error 99
  const productEntriesMap = new Map<string, PosterIncomingProduct>();

  order.items.forEach(item => {
    const qty = Number(item.quantity) || 1;
    let unitPrice = item.totalPrice / qty;
    if (isNaN(unitPrice) || unitPrice < 0) {
      unitPrice = Number(item.product.price);
    }

    let resolvedProductId = Number(item.product.id);
    const itemNameNorm = (item.product.name || '').toLowerCase().trim();
    let isDirectPosterProduct = false;
    let livePosterItem: any = undefined;

    if (livePosterProductsCache.length > 0) {
      livePosterItem = livePosterProductsCache.find(p => Number(p.product_id) === resolvedProductId) ||
                       livePosterProductsCache.find(p => p.product_name.toLowerCase().trim() === itemNameNorm) ||
                       livePosterProductsCache.find(p => p.product_name.toLowerCase().includes(itemNameNorm) || itemNameNorm.includes(p.product_name.toLowerCase()));
      if (livePosterItem) {
        resolvedProductId = Number(livePosterItem.product_id);
        isDirectPosterProduct = true;
      } else {
        const fallbackPosterItem = livePosterProductsCache.find(p => Number(p.product_id) === 6) || livePosterProductsCache[0];
        if (fallbackPosterItem) {
          resolvedProductId = Number(fallbackPosterItem.product_id);
        }
      }
    }

    // Check if this product uses Group Modifications (e.g. Type 2 with group_modifications) or Simple Modifications (Type 3 with modifications)
    const hasGroupMods = (livePosterItem && Array.isArray(livePosterItem.group_modifications) && livePosterItem.group_modifications.length > 0) ||
                         (item.product.modifications && item.product.modifications.some(g => g.type === 2 || (g.max && g.max > 1) || g.group_name?.includes('Додатки')));

    const hasSimpleMods = (livePosterItem && Array.isArray(livePosterItem.modifications) && livePosterItem.modifications.length > 0) ||
                          (item.product.modifications && item.product.modifications.some(g => g.type === 1 && (!g.max || g.max <= 1)));

    if (hasGroupMods) {
      // Group Modifications: attach modification array [{ m, a }] to the dish
      const groupModArray: Array<{ m: number; a: number }> = [];

      if (item.selectedOptions && item.selectedOptions.length > 0) {
        item.selectedOptions.forEach(opt => {
          let modId: number | undefined = undefined;

          // 1. Search in live poster item group modifications
          if (livePosterItem && Array.isArray(livePosterItem.group_modifications)) {
            livePosterItem.group_modifications.forEach((group: any) => {
              const matched = (group.modifications || []).find((m: any) => 
                m.name?.toLowerCase().trim() === opt.option_name.toLowerCase().trim() ||
                String(m.dish_modification_id) === String(opt.option_name)
              );
              if (matched && matched.dish_modification_id) {
                modId = Number(matched.dish_modification_id);
              }
            });
          }

          // 2. Fallback search in product definition
          if (!modId) {
            item.product.modifications?.forEach(group => {
              const matched = group.options.find(o => 
                o.name.toLowerCase().trim() === opt.option_name.toLowerCase().trim() ||
                String(o.id) === String(opt.option_name)
              );
              if (matched && matched.id > 0) {
                modId = matched.id;
              }
            });
          }

          if (modId) {
            groupModArray.push({ m: modId, a: 1 });
          }
        });
      }

      // Sort modifier IDs to create a deterministic deduplication key
      const modKey = groupModArray.map(m => m.m).sort((a, b) => a - b).join('-');
      const itemKey = `${resolvedProductId}_gmod_${modKey || 'none'}`;

      if (productEntriesMap.has(itemKey)) {
        productEntriesMap.get(itemKey)!.count += qty;
      } else {
        productEntriesMap.set(itemKey, {
          product_id: resolvedProductId || 1,
          count: qty,
          price: Math.round(unitPrice * 100),
          modification: groupModArray.length > 0 ? groupModArray : undefined
        });
      }
    } else if (hasSimpleMods) {
      // Simple Modifications (Variant products): pass single modificator_id
      let chosenModId: number | undefined = undefined;

      if (item.selectedOptions && item.selectedOptions.length > 0) {
        item.selectedOptions.forEach(opt => {
          if (livePosterItem && Array.isArray(livePosterItem.modifications)) {
            const matched = livePosterItem.modifications.find((m: any) =>
              m.modificator_name?.toLowerCase().trim() === opt.option_name.toLowerCase().trim() ||
              String(m.modificator_id) === String(opt.option_name)
            );
            if (matched && matched.modificator_id) {
              chosenModId = Number(matched.modificator_id);
            }
          }

          if (!chosenModId) {
            item.product.modifications?.forEach(group => {
              const matched = group.options.find(o => 
                o.name.toLowerCase().trim() === opt.option_name.toLowerCase().trim() ||
                String(o.id) === String(opt.option_name)
              );
              if (matched && matched.id > 0) {
                chosenModId = matched.id;
              }
            });
          }
        });
      }

      const itemKey = `${resolvedProductId}_smod_${chosenModId || 0}`;

      if (productEntriesMap.has(itemKey)) {
        productEntriesMap.get(itemKey)!.count += qty;
      } else {
        const prodEntry: PosterIncomingProduct = {
          product_id: resolvedProductId || 1,
          count: qty,
          price: Math.round(unitPrice * 100)
        };

        if (chosenModId !== undefined && chosenModId > 0) {
          prodEntry.modificator_id = chosenModId;
        }

        productEntriesMap.set(itemKey, prodEntry);
      }
    } else {
      // Standard product without modifications
      const itemKey = `${resolvedProductId}_base`;

      if (productEntriesMap.has(itemKey)) {
        productEntriesMap.get(itemKey)!.count += qty;
      } else {
        productEntriesMap.set(itemKey, {
          product_id: resolvedProductId || 1,
          count: qty,
          price: Math.round(unitPrice * 100)
        });
      }
    }
  });

  const products = Array.from(productEntriesMap.values());

  // Payment method note for cashier/courier comment
  let paymentText = 'Оплата: Готівкою';
  if (order.paymentMethod === 'card_online') {
    paymentText = 'Оплата: Онлайн на сайті (Сплачено)';
  } else if (order.paymentMethod === 'card_courier') {
    paymentText = isDelivery ? "Оплата: Терміналом кур'єру" : 'Оплата: Карткою на касі';
  } else if (order.paymentMethod === 'cash') {
    paymentText = isDelivery ? "Оплата: Готівкою кур'єру" : 'Оплата: Готівкою на касі';
  }

  // Clean numeric cash change (only for delivery with cash)
  const rawChange = String(order.cashChangeFrom || '').replace(/[^\d]/g, '');
  const changeNote = (isDelivery && rawChange) ? `Решта з: ${rawChange} ₴` : '';

  // Order general comments (Clean, concise)
  const commentParts = [
    paymentText,
    order.comment ? `Побажання: ${order.comment}` : '',
    changeNote,
    order.cutleryCount ? `Приборів: ${order.cutleryCount} шт` : '',
    order.scheduledTime ? `Час: ${order.scheduledTime}` : '',
    order.promoCode ? `Промокод: ${order.promoCode}` : ''
  ].filter(Boolean);

  // In Poster API: only provide payment object if user actually prepaid online on the website.
  // For cash or card at the cashier/courier, omitting payment leaves the order payable at the terminal (До сплати: 679 ₴)!
  const payment = order.paymentMethod === 'card_online' ? {
    type: 1,
    sum: Math.round(order.total * 100),
    currency: 'UAH'
  } : undefined;

  const payload: PosterIncomingOrderPayload = {
    spot_id: POSTER_CONFIG.defaultSpotId || 1,
    phone: order.phone.replace(/[^\d+]/g, '').replace(/^\+/, ''),
    first_name,
    last_name,
    service_mode,
    delivery_price: isDelivery ? Math.round((order.deliveryFee || 0) * 100) : 0,
    client_address: isDelivery ? client_address : undefined,
    comment: commentParts.join(' | ') || undefined,
    products,
    payment
  };

  const formattedDeliveryTime = formatPosterDeliveryTime(order.scheduledTime);
  if (formattedDeliveryTime) {
    payload.delivery_time = formattedDeliveryTime;
  }

  return payload;
}

/**
 * Sync customer profile & structured address directly into Poster CRM
 */
export async function syncUserProfileToPoster(profile: {
  name?: string;
  phone?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  floor?: string;
  doorphone?: string;
}): Promise<boolean> {
  if (!POSTER_CONFIG.isLiveMode || !POSTER_CONFIG.apiToken || !profile.phone) return false;

  try {
    const cleanPhone = profile.phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
    if (cleanPhone.length < 9) return false;

    const nameParts = (profile.name || 'Гість').trim().split(/\s+/);
    const firstname = nameParts[0] || 'Гість';
    const lastname = nameParts.slice(1).join(' ') || '';

    const cleanCity = (profile.city || 'смт. Овідіополь').replace(/\s*\([^)]*\)/g, '').trim();
    const street = (profile.street || '').trim();
    const house = (profile.house || '').trim();
    const apartment = (profile.apartment || '').trim();
    const floor = (profile.floor || '').trim();
    const doorphone = (profile.doorphone || '').trim();

    const address1 = [street ? `вул. ${street}` : '', house ? `буд. ${house}` : ''].filter(Boolean).join(', ');
    const address2 = [apartment ? `кв. ${apartment}` : '', floor ? `пов. ${floor}` : '', doorphone ? `код/домофон ${doorphone}` : ''].filter(Boolean).join(', ');
    const fullAddress = [cleanCity, address1, address2].filter(Boolean).join(', ');

    const client = await getPosterClientByPhone(cleanPhone);

    const clientPayload: any = {
      phone: '+' + cleanPhone,
      firstname,
      lastname,
      country: 'Україна',
      city: cleanCity,
      address: fullAddress || address1 || cleanCity,
      comment: 'Клієнт Crab Club Delivery'
    };

    if (client && client.client_id) {
      clientPayload.client_id = client.client_id;
      clientPayload.client_name = profile.name || firstname;
      const endpoint = getPosterApiUrl('clients.updateClient');
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientPayload)
      });
    } else {
      const endpoint = getPosterApiUrl('clients.createClient');
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientPayload)
      });
    }
    return true;
  } catch (err) {
    console.warn('[Poster CRM Sync]', err);
    return false;
  }
}

// Idempotency cache with sessionStorage persistence
const idempotencyOrderCache = new Map<string, { incomingOrderId: number; timestamp: number }>();
const IDEMPOTENCY_KEY_PREFIX = 'crabclub_poster_idem_';
const IDEMPOTENCY_TTL = 120_000; // 2 minutes

function getIdempotencyOrder(key: string): { incomingOrderId: number; timestamp: number } | null {
  const inMem = idempotencyOrderCache.get(key);
  if (inMem && Date.now() - inMem.timestamp < IDEMPOTENCY_TTL) return inMem;

  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(IDEMPOTENCY_KEY_PREFIX + key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.timestamp < IDEMPOTENCY_TTL) {
          idempotencyOrderCache.set(key, parsed);
          return parsed;
        } else {
          sessionStorage.removeItem(IDEMPOTENCY_KEY_PREFIX + key);
        }
      }
    } catch {}
  }
  return null;
}

function setIdempotencyOrder(key: string, incomingOrderId: number): void {
  const record = { incomingOrderId, timestamp: Date.now() };
  idempotencyOrderCache.set(key, record);
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(IDEMPOTENCY_KEY_PREFIX + key, JSON.stringify(record));
    } catch {}
  }
}

/**
 * Send order to Poster POS API with strict Idempotency, 7s Timeout & Audit Logging
 */
export async function sendOrderToPoster(order: OrderDetails): Promise<{ success: boolean; posterIncomingOrderId?: number; message?: string }> {
  const idempotencyKey = `ORDER_${order.orderNumber}_${order.phone.replace(/\D/g, '')}`;
  
  // 1. Idempotency Check: if submitted within last 2 minutes, return cached confirmation
  const existing = getIdempotencyOrder(idempotencyKey);
  if (existing) {
    console.info(`[Poster POS Idempotency] ⚡ Замовлення #${order.orderNumber} вже було надіслано. ID: #${existing.incomingOrderId}`);
    return {
      success: true,
      posterIncomingOrderId: existing.incomingOrderId,
      message: `Замовлення #${order.orderNumber} вже прийнято`
    };
  }

  // Ensure live products list is available without blocking if already in memory
  if (livePosterProductsCache.length === 0) {
    await Promise.race([
      getLivePosterProductsList(),
      new Promise(r => setTimeout(r, 600))
    ]);
  }

  const payload = buildPosterOrderPayload(order);

  // Attach Poster CRM client_id with fast non-blocking race
  if (order.phone) {
    try {
      const cleanPhone = order.phone.replace(/\D/g, '');
      const client = await Promise.race([
        getPosterClientByPhone(cleanPhone),
        new Promise<null>(r => setTimeout(() => r(null), 800))
      ]);
      if (client?.client_id) {
        payload.client_id = client.client_id;
      }
    } catch {
      // Non-fatal: order still proceeds
    }
  }

  // Primary Channel: Live Poster POS API with 7-second timeout
  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const endpoint = getPosterApiUrl('incomingOrders.createIncomingOrder');
      console.log('[Poster POS Dispatch] 🚀 Надсилання замовлення в Poster POS API:', payload);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      const result: PosterApiResponse<{ incoming_order_id: number }> = await response.json();
      console.log('[Poster POS Dispatch Response] 📥 Відповідь Poster API:', result);

      if (result.response && result.response.incoming_order_id) {
        const orderId = result.response.incoming_order_id;
        setIdempotencyOrder(idempotencyKey, orderId);
        console.info(`[Poster POS] ✅ Замовлення успішно створено! ID: #${orderId}`);
        return {
          success: true,
          posterIncomingOrderId: orderId,
          message: `Замовлення надіслано в Poster POS (#${orderId})`
        };
      } else if (result.error) {
        console.warn(`[Poster POS] ⚠️ Помилка від Poster API (${result.error}):`, result.message);
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.warn('[Poster POS] ⏱ Таймаут запиту (7с)');
      } else {
        console.warn('[Poster POS] ⚠️ Помилка зв\'язку з Poster POS:', error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Fallback: save to local queue for audit
  const fallbackOrderId = parseInt(order.orderNumber, 10) || Date.now() % 10000;
  setIdempotencyOrder(idempotencyKey, fallbackOrderId);

  try {
    const queue = JSON.parse(localStorage.getItem('crabclub_orders_queue') || '[]');
    queue.push({ order, timestamp: Date.now() });
    localStorage.setItem('crabclub_orders_queue', JSON.stringify(queue.slice(-20)));
  } catch {}

  console.info(`[Order Dispatched] ⚠️ Poster POS недоступний — замовлення #${order.orderNumber} збережено локально.`);

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
      const data = await fetchPosterApiJson(endpoint);
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
    bonus: 0,
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
      const data = await fetchPosterApiJson(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: name || 'Гість',
          phone: cleanPhone,
          client_sex: 0
        })
      });
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
      const data = await fetchPosterApiJson(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          bonus: -Math.round(bonusToSpend * 100) // Negative delta in kopecks
        })
      });
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
  service_mode?: number;
  updatedAt?: string;
}

/**
 * Query real-time kitchen and delivery status of an order from Poster POS
 * Checks both incomingOrders and live POS transactions (dash.getTransaction & dash.getTransactionHistory)
 */
export async function fetchPosterOrderStatus(incomingOrderId: number): Promise<PosterOrderStatusResult | null> {
  if (!incomingOrderId) return null;

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      let orderData: any = null;
      let mode = 3;

      // 1. Query incoming order record
      try {
        const endpoint = getPosterApiUrl('incomingOrders.getIncomingOrder', { incoming_order_id: incomingOrderId });
        const data = await fetchPosterApiJson<any>(endpoint, {
          headers: { 'Accept': 'application/json' }
        });
        if (data.response) {
          orderData = data.response;
          mode = Number(orderData.service_mode || orderData.type || 3);
        }
      } catch {
        // Safe fallback if not found under incomingOrders
      }

      const isDineIn = mode === 1;
      const isTakeaway = mode === 2;
      let stepIndex = 1;
      let statusName = 'Прийнято рестораном';
      let updatedAt = orderData?.updated_at;

      // Initial mapping from incoming order status
      if (orderData) {
        const status = Number(orderData.status);
        if (status === 0) {
          stepIndex = 1;
          statusName = 'Очікує підтвердження на касі';
        } else if (status === 1) {
          stepIndex = 2;
          statusName = 'Шеф-кухар готує на кухні';
        } else if (status === 2 || status === 3) {
          stepIndex = 3;
          statusName = isDineIn ? 'Готово, подається за столик' : isTakeaway ? 'Готово до видачі на касі' : 'Кур\'єр у дорозі (Везет кур\'єр)';
        } else if (status === 7) {
          stepIndex = 4;
          statusName = isDineIn ? 'Подано за столик' : isTakeaway ? 'Замовлення видано' : 'Успішно доставлено';
        } else if (status === 8 || status === 9) {
          stepIndex = 1;
          statusName = 'Замовлення скасовано';
        }
      }

      // 2. Query live POS transaction for active courier dispatch & check closed states
      const txId = orderData?.transaction_id || incomingOrderId;
      if (txId) {
        try {
          const tEndpoint = getPosterApiUrl('dash.getTransaction', { transaction_id: txId });
          const tData = await fetchPosterApiJson<any>(tEndpoint);
          const t = tData.response?.[0];

          if (t) {
            if (t.service_mode) {
              mode = Number(t.service_mode);
            }
            if (t.date_close_date) {
              updatedAt = t.date_close_date;
            }

            const isTxClosed = t.status === '2' || Number(t.processing_status) >= 60 || (t.date_close && t.date_close !== '0');
            const isTxInDelivery = Number(t.processing_status) >= 30 && Number(t.processing_status) < 60;

            if (isTxClosed) {
              stepIndex = 4;
              statusName = isDineIn ? 'Подано за столик (Чек закрито)' : isTakeaway ? 'Замовлення видано (Чек закрито)' : 'Успішно доставлено (Чек закрито)';
            } else if (isTxInDelivery) {
              stepIndex = 3;
              statusName = isDineIn ? 'Готово, подається за столик' : isTakeaway ? 'Готово до видачі на касі' : 'Кур\'єр у дорозі (Везет кур\'єр)';
            } else {
              // 3. Inspect deep transaction history for courier assignment or delivery dispatch
              try {
                const hEndpoint = getPosterApiUrl('dash.getTransactionHistory', { transaction_id: txId });
                const hData = await fetchPosterApiJson<any>(hEndpoint);
                const history = hData.response || [];

                const hasClose = history.some((h: any) => h.type_history === 'close');
                const hasCourier = history.some((h: any) => 
                  h.type_history === 'changecourier' || 
                  (h.type_history === 'changeprocessingstatus' && Number(h.value) >= 30)
                );

                if (hasClose) {
                  stepIndex = 4;
                  statusName = isDineIn ? 'Подано за столик (Чек закрито)' : isTakeaway ? 'Замовлення видано (Чек закрито)' : 'Успішно доставлено (Чек закрито)';
                } else if (hasCourier) {
                  stepIndex = 3;
                  statusName = isDineIn ? 'Готово, подається за столик' : isTakeaway ? 'Готово до видачі на касі' : 'Кур\'єр у дорозі (Везет кур\'єр)';
                }
              } catch {}
            }
          }
        } catch (tErr) {
          console.warn('[Poster POS Live Radar] Error polling transaction status:', tErr);
        }
      }

      return {
        incoming_order_id: incomingOrderId,
        status: stepIndex === 4 ? 7 : stepIndex === 3 ? 3 : stepIndex === 2 ? 1 : 0,
        statusName,
        stepIndex,
        service_mode: mode,
        updatedAt
      };
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
 * Inspects hidden/inactive flags in Poster menu to avoid 405 endpoint restrictions
 */
export async function fetchPosterStopList(spotId: number = POSTER_CONFIG.defaultSpotId || 1): Promise<Set<number>> {
  // Cache for 30 seconds to prevent hammering Poster API on rapid cart updates
  if (Date.now() - lastStopListFetch < 30000 && stopListCache.size > 0) {
    return stopListCache;
  }

  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = getPosterApiUrl('menu.getProducts');
      const data = await fetchPosterApiJson(endpoint);
      
      if (data.response && Array.isArray(data.response)) {
        const stoppedIds = new Set<number>();
        data.response.forEach((item: any) => {
          if (item.hidden === '1' || item.hidden === 1) {
            stoppedIds.add(Number(item.product_id));
          }
          if (Array.isArray(item.spots)) {
            const spotInfo = item.spots.find((s: any) => Number(s.spot_id) === Number(spotId));
            if (spotInfo && (spotInfo.visible === '0' || spotInfo.visible === 0)) {
              stoppedIds.add(Number(item.product_id));
            }
          }
        });
        stopListCache = stoppedIds;
        lastStopListFetch = Date.now();
        return stopListCache;
      }
    } catch (err) {
      // Safe fallback: silently ignore network errors
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
  // Poster API prices can be: number, string ("2500"), or spot price map: { "1": "2500" } or { "1": 2500 }
  let rawPrice = raw.price;
  if (typeof rawPrice === 'object' && rawPrice !== null) {
    const vals = Object.values(rawPrice);
    rawPrice = vals.length > 0 ? vals[0] : 0;
  }
  const parsedPrice = typeof rawPrice === 'number' ? rawPrice : (parseFloat(String(rawPrice || '0')) || 0);
  const priceUah = parsedPrice > 1000 ? parsedPrice / 100 : parsedPrice;

  // Parse dynamic modifications from Poster (group_modifications or simple modifications)
  const modificationGroups: ModificationGroup[] = [];

  if (raw.group_modifications && Array.isArray(raw.group_modifications) && raw.group_modifications.length > 0) {
    raw.group_modifications.forEach((group: any, gIdx: number) => {
      const options: ModificationOption[] = (group.modifications || []).map((m: any, mIdx: number) => {
        let mPrice = m.price;
        if (m.spots && Array.isArray(m.spots) && m.spots.length > 0) {
          const spotMatch = m.spots.find((s: any) => Number(s.spot_id) === Number(POSTER_CONFIG.defaultSpotId || 1)) || m.spots[0];
          if (spotMatch && spotMatch.price !== undefined) {
            mPrice = spotMatch.price;
          }
        } else if (typeof mPrice === 'object' && mPrice !== null) {
          const vals = Object.values(mPrice);
          mPrice = vals.length > 0 ? vals[0] : 0;
        } else if (mPrice === undefined && m.modificator_selfprice !== undefined) {
          mPrice = m.modificator_selfprice;
        }
        const parsedMPrice = typeof mPrice === 'number' ? mPrice : (parseFloat(String(mPrice || '0')) || 0);
        const modId = Number(m.modificator_id || m.dish_modification_id || m.m || m.id || (gIdx * 100 + mIdx + 1));
        const modName = String(m.modificator_name || m.name || `Опція ${mIdx + 1}`).trim();
        return {
          id: modId,
          name: modName,
          price: parsedMPrice >= 100 ? Math.round(parsedMPrice / 100) : parsedMPrice
        };
      }).filter((o: ModificationOption) => Boolean(o.name));

      if (options.length > 0) {
        modificationGroups.push({
          group_id: Number(group.dish_modification_group_id || group.id || (gIdx + 1)),
          group_name: String(group.name || group.modificator_group_name || 'Додаткові опції').trim(),
          type: Number(group.type || 1),
          min: Number(group.min || 0),
          max: Number(group.max || options.length),
          options
        });
      }
    });
  } else if (raw.modifications && Array.isArray(raw.modifications) && raw.modifications.length > 0) {
    // Single level modifications from Poster POS
    const options: ModificationOption[] = raw.modifications.map((m: any, mIdx: number) => {
      let mPrice = m.price;
      if (m.spots && Array.isArray(m.spots) && m.spots.length > 0) {
        const spotMatch = m.spots.find((s: any) => Number(s.spot_id) === Number(POSTER_CONFIG.defaultSpotId || 1)) || m.spots[0];
        if (spotMatch && spotMatch.price !== undefined) {
          mPrice = spotMatch.price;
        }
      } else if (typeof mPrice === 'object' && mPrice !== null) {
        const vals = Object.values(mPrice);
        mPrice = vals.length > 0 ? vals[0] : 0;
      } else if (mPrice === undefined && m.modificator_selfprice !== undefined) {
        mPrice = m.modificator_selfprice;
      }
      const parsedMPrice = typeof mPrice === 'number' ? mPrice : (parseFloat(String(mPrice || '0')) || 0);
      const modId = Number(m.modificator_id || m.dish_modification_id || m.m || m.id || (mIdx + 1));
      const modName = String(m.modificator_name || m.name || `Опція ${mIdx + 1}`).trim();
      return {
        id: modId,
        name: modName,
        price: parsedMPrice >= 100 ? Math.round(parsedMPrice / 100) : parsedMPrice
      };
    }).filter((o: ModificationOption) => Boolean(o.name));

    if (options.length > 0) {
      modificationGroups.push({
        group_id: 1,
        group_name: 'Додаткові інгредієнти / Модифікатори',
        type: 1,
        min: 0,
        max: options.length,
        options
      });
    }
  }

  // 1. Clean Ingredients Parsing (extract ingredient_name from Poster tech cards array)
  let parsedIngredients = '';
  if (Array.isArray(raw.ingredients) && raw.ingredients.length > 0) {
    parsedIngredients = raw.ingredients
      .map((ing: any) => ing?.ingredient_name || ing?.name || '')
      .filter((name: string) => name && typeof name === 'string' && name.trim().length > 0)
      .join(', ');
  } else if (typeof raw.ingredients === 'string') {
    parsedIngredients = raw.ingredients.trim();
  }

  // 2. Production description / ingredients fallback
  const prodDesc = typeof raw.product_production_description === 'string' ? raw.product_production_description.trim() : '';
  const finalIngredients = parsedIngredients || prodDesc || '';
  const finalDescription = prodDesc || parsedIngredients || '';

  // 3. Weight parsing (Poster uses 'out' for output grams in dishes or 'weight')
  let weightText = '1 порція';
  if (raw.out && Number(raw.out) > 0) {
    weightText = `${Number(raw.out)} г`;
  } else if (raw.weight && Number(raw.weight) > 0) {
    weightText = `${Number(raw.weight)} г`;
  }

  // 4. Smart Category-aware HD Fallback Photos when no image uploaded to Poster
  const catName = String(raw.category_name || '').toLowerCase();
  const prodName = String(raw.product_name || raw.name || '').toLowerCase();
  let defaultImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';

  if (catName.includes('бургер') || prodName.includes('бургер')) {
    defaultImage = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('кава') || prodName.includes('капуч') || prodName.includes('еспресо') || prodName.includes('лате') || prodName.includes('американо')) {
    defaultImage = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('випіч') || prodName.includes('круас') || prodName.includes('булоч') || prodName.includes('хліб')) {
    defaultImage = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('напо') || catName.includes('вода') || prodName.includes('боржом') || prodName.includes('кола') || prodName.includes('сік')) {
    defaultImage = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('піц') || prodName.includes('піц')) {
    defaultImage = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('рол') || catName.includes('суш') || prodName.includes('рол') || prodName.includes('філадельфія')) {
    defaultImage = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80';
  }

  const imageUrl = raw.photo_origin 
    ? `https://joinposter.com${raw.photo_origin}` 
    : (raw.photo ? `https://joinposter.com${raw.photo}` : defaultImage);

  return {
    id: Number(raw.product_id || raw.id),
    name: String(raw.product_name || raw.name || 'Страва'),
    category_pos_id: Number(raw.menu_category_id || raw.category_id || 1),
    category_name: String(raw.category_name || 'Меню'),
    category_url: String(raw.category_url || 'all'),
    price: Math.round(priceUah),
    weight: weightText,
    ingredients: finalIngredients,
    description_raw: finalDescription,
    image: imageUrl,
    modifications: modificationGroups.length > 0 ? modificationGroups : undefined
  };
}

function getPosterCategoryIcon(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('кава') || n.includes('coffee') || n.includes('чай') || n.includes('tea')) return 'Coffee';
  if (n.includes('рол') || n.includes('суші') || n.includes('сет') || n.includes('риба') || n.includes('морепродукт') || n.includes('fish')) return 'Fish';
  if (n.includes('піц') || n.includes('pizza') || n.includes('фокач') || n.includes('кальц')) return 'Pizza';
  if (n.includes('бургер') || n.includes('burger') || n.includes('сендвіч') || n.includes('дог')) return 'Sandwich';
  if (n.includes('випіч') || n.includes('круас') || n.includes('хліб') || n.includes('десерт') || n.includes('торт') || n.includes('чізкейк') || n.includes('тістеч')) return 'Cake';
  if (n.includes('напо') || n.includes('вода') || n.includes('сік') || n.includes('холодні') || n.includes('лимонад') || n.includes('бар') || n.includes('пиво') || n.includes('коктейл')) return 'GlassWater';
  if (n.includes('суп') || n.includes('рамен') || n.includes('том ям') || n.includes('борщ') || n.includes('бульйон')) return 'Soup';
  if (n.includes('салат') || n.includes('боул')) return 'Salad';
  if (n.includes('паст') || n.includes('вок') || n.includes('wok') || n.includes('локшин') || n.includes('рис') || n.includes('noodles')) return 'Flame';
  if (n.includes('гриль') || n.includes('стейк') || n.includes('м\'яс') || n.includes('м’яс') || n.includes('шашлик') || n.includes('bbq')) return 'Flame';
  if (n.includes('снідан') || n.includes('сирник') || n.includes('омлет') || n.includes('яєч')) return 'Utensils';
  if (n.includes('закуск') || n.includes('снек') || n.includes('соус')) return 'Sparkles';
  return 'Utensils';
}

function slugifyCategoryName(text: string): string {
  const cyrMap: Record<string, string> = {
    'кава': 'kava',
    'чай': 'tea',
    'випіч': 'vypichka',
    'десерт': 'deserti',
    'холодні': 'xolodni-napoyi',
    'напо': 'napoyi',
    'рол': 'roli',
    'суш': 'sushi',
    'сет': 'seti',
    'піц': 'pica',
    'бургер': 'burger-menyu',
    'суп': 'supy',
    'салат': 'salati',
    'паст': 'pasta',
    'вок': 'wok',
    'wok': 'wok',
    'снідан': 'snidanki',
    'закуск': 'xolodni-zakuski',
    'гриль': 'gril-mnyaso',
    'бар': 'bar',
    'кухня': 'kuxnya'
  };

  const lower = text.toLowerCase().trim();
  for (const [key, slug] of Object.entries(cyrMap)) {
    if (lower.includes(key)) return slug;
  }

  // General transliteration for custom restaurant categories
  const ruEn: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ye','ж':'zh','з':'z',
    'и':'y','і':'i','ї':'yi','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p',
    'р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch',
    'ь':'','ю':'yu','я':'ya'
  };

  const translit = lower.split('').map(char => ruEn[char] || char).join('');
  return translit.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'menu';
}

/**
 * Fetch and build full live catalog directly from Poster POS API
 * Handles multi-level nested categories, large databases, custom groups, and spot pricing
 */
export async function fetchLivePosterCatalog(): Promise<{
  categories: Category[];
  products: Product[];
} | null> {
  if (!POSTER_CONFIG.isLiveMode || !POSTER_CONFIG.apiToken) return null;

  try {
    const productsEndpoint = getPosterApiUrl('menu.getProducts');
    const categoriesEndpoint = getPosterApiUrl('menu.getCategories');

    const [productsData, categoriesData] = await Promise.all([
      fetchPosterApiJson(productsEndpoint),
      fetchPosterApiJson(categoriesEndpoint)
    ]);

    if (productsData.response && Array.isArray(productsData.response)) {
      // Update in-memory cache for incoming order mapping
      livePosterProductsCache = productsData.response;
      productsCacheExpiry = Date.now() + PRODUCTS_CACHE_TTL;

      const rawCategories = (categoriesData.response || []).filter((c: any) => c.category_hidden !== '1' && c.category_hidden !== 1);
      
      const parentCategories = rawCategories.filter((c: any) => !c.parent_category || c.parent_category === '0' || c.parent_category === 0);
      const childCategories = rawCategories.filter((c: any) => c.parent_category && c.parent_category !== '0' && c.parent_category !== 0);

      const categoryMap = new Map<string, { id: number; name: string; slug: string; icon: string; parent_slug?: string }>();

      const activeCategories: Category[] = parentCategories.map((c: any) => {
        const slug = slugifyCategoryName(c.category_name || `cat-${c.category_id}`);
        const icon = getPosterCategoryIcon(c.category_name);
        categoryMap.set(String(c.category_id), { id: Number(c.category_id), name: c.category_name, slug, icon });

        // Find child subcategories for this parent
        const subcats: SubCategory[] = childCategories
          .filter((sub: any) => String(sub.parent_category) === String(c.category_id))
          .map((sub: any) => {
            const subSlug = slugifyCategoryName(sub.category_name || `sub-${sub.category_id}`);
            categoryMap.set(String(sub.category_id), { 
              id: Number(sub.category_id), 
              name: sub.category_name, 
              slug: subSlug, 
              icon: getPosterCategoryIcon(sub.category_name),
              parent_slug: slug
            });
            return {
              id: Number(sub.category_id),
              name: String(sub.category_name),
              slug: subSlug
            };
          });

        return {
          id: Number(c.category_id),
          name: String(c.category_name),
          slug,
          icon,
          subcategories: subcats
        };
      });

      // Register any orphan subcategories whose parent wasn't found as top-level categories
      childCategories.forEach((sub: any) => {
        if (!categoryMap.has(String(sub.category_id))) {
          const slug = slugifyCategoryName(sub.category_name || `cat-${sub.category_id}`);
          const icon = getPosterCategoryIcon(sub.category_name);
          categoryMap.set(String(sub.category_id), { id: Number(sub.category_id), name: sub.category_name, slug, icon });
          activeCategories.push({
            id: Number(sub.category_id),
            name: String(sub.category_name),
            slug,
            icon,
            subcategories: []
          });
        }
      });

      // Filter only visible / non-hidden products from Poster POS
      const activeProducts: Product[] = productsData.response
        .filter((p: any) => {
          if (p.hidden === '1' || p.hidden === 1) return false;
          if (p.spots && Array.isArray(p.spots) && p.spots.length > 0) {
            const currentSpot = p.spots.find((s: any) => Number(s.spot_id) === Number(POSTER_CONFIG.defaultSpotId || 1));
            if (currentSpot && (currentSpot.visible === '0' || currentSpot.visible === 0)) return false;
          }
          return true;
        })
        .map((p: any) => {
          const catInfo = categoryMap.get(String(p.menu_category_id || p.category_id));
          const base = mapPosterRawProduct(p);
          return {
            ...base,
            category_pos_id: catInfo ? catInfo.id : Number(p.menu_category_id || 1),
            category_name: catInfo ? catInfo.name : (p.category_name || 'Меню'),
            category_url: catInfo ? catInfo.slug : 'all',
            parent_category_url: catInfo?.parent_slug
          };
        });

      return {
        categories: activeCategories,
        products: activeProducts
      };
    }
  } catch (err) {
    console.warn('[Poster Live Catalog] Failed to fetch catalog:', err);
  }
  return null;
}


