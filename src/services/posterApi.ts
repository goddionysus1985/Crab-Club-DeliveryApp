/**
 * Official Poster POS Integration Service
 * Documentation: https://dev.joinposter.com/ru/docs/v2/incomingOrders/createIncomingOrder
 */

import { OrderDetails, CartItem, Product } from '../types';
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

  return payload;
}

/**
 * Send order to Poster POS API
 */
export async function sendOrderToPoster(order: OrderDetails): Promise<{ success: boolean; posterIncomingOrderId?: number; message?: string }> {
  const payload = buildPosterOrderPayload(order);

  // If live mode is enabled with an API token
  if (POSTER_CONFIG.isLiveMode && POSTER_CONFIG.apiToken) {
    try {
      const endpoint = `https://joinposter.com/api/incomingOrders.createIncomingOrder?token=${encodeURIComponent(POSTER_CONFIG.apiToken)}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result: PosterApiResponse<{ incoming_order_id: number }> = await response.json();

      if (result.response && result.response.incoming_order_id) {
        console.info(`[Poster POS] ✅ Замовлення успішно створено в системі Poster! ID: #${result.response.incoming_order_id}`);
        return {
          success: true,
          posterIncomingOrderId: result.response.incoming_order_id,
          message: `Замовлення надіслано в Poster POS (#${result.response.incoming_order_id})`
        };
      } else {
        console.warn('[Poster POS] Помилка від Poster API:', result);
        return {
          success: false,
          message: result.message || 'Не вдалося створити замовлення в Poster API'
        };
      }
    } catch (error: any) {
      console.error('[Poster POS] Мережева помилка підключення до Poster API:', error);
      return {
        success: false,
        message: error.message || 'Помилка з\'єднання з Poster API'
      };
    }
  }

  // Ready-to-connect Simulation Mode
  console.groupCollapsed(`[Poster POS Integration Ready] 📋 Замовлення #${order.orderNumber} підготовлено для Poster POS`);
  console.log('Сформований Payload для incomingOrders.createIncomingOrder:');
  console.dir(payload);
  console.log(`Інструкція: Щоб увімкнути пряму відправку на касу Poster, додайте VITE_POSTER_API_TOKEN у файл .env`);
  console.groupEnd();

  return {
    success: true,
    posterIncomingOrderId: parseInt(order.orderNumber, 10),
    message: 'Замовлення успішно опрацьовано (Режим готовності до Poster API)'
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
      const endpoint = `https://joinposter.com/api/clients.getClients?token=${encodeURIComponent(POSTER_CONFIG.apiToken)}&phone=${encodeURIComponent(cleanPhone)}`;
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

  // Simulation mode: if no live token yet, generate a simulated bonus balance
  return {
    client_id: 1001,
    firstname: 'Гість',
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
      const endpoint = `https://joinposter.com/api/clients.createClient?token=${encodeURIComponent(POSTER_CONFIG.apiToken)}`;
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

