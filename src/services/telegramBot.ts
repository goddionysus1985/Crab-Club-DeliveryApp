/**
 * Telegram Notification & Fallback Dispatcher
 * Sends formatted orders directly to restaurant administrators/kitchen chat
 */

import { OrderDetails, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

const env = (import.meta as any).env || {};
const TELEGRAM_BOT_TOKEN = env.VITE_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = env.VITE_TELEGRAM_CHAT_ID || "";

export async function sendOrderToTelegram(order: OrderDetails, isFallback = false): Promise<boolean> {
  const token = TELEGRAM_BOT_TOKEN;
  const chatId = TELEGRAM_CHAT_ID;

  // Format order message
  const serviceType = order.orderType === 'delivery' ? '🛵 ДОСТАВКА КУР\'ЄРОМ' : '🏬 САМОВИВІЗ (-10%)';
  const payType = order.paymentMethod === 'card_online' ? '💳 Оплачено Онлайн' : order.paymentMethod === 'card_courier' ? '💳 Термінал при отриманні' : '💵 Готівка';

  const addressText = order.address ? `📍 *Адреса:* ${order.address.city}, вул. ${order.address.street}, буд. ${order.address.house}${order.address.apartment ? `, кв. ${order.address.apartment}` : ''}` : '📍 *Самовивіз з ресторану*';

  const itemsList = order.items.map((i: CartItem, idx: number) => {
    const opts = i.selectedOptions && i.selectedOptions.length > 0
      ? ` (${i.selectedOptions.map(o => o.option_name).join(', ')})`
      : '';
    return `${idx + 1}. *${i.product.name}*${opts} x${i.quantity} — ${i.totalPrice} ₴`;
  }).join('\n');

  const text = `
${isFallback ? '⚠️ *РЕЗЕРВНИЙ КАНАЛ (POSTER OFFLINE)*\n' : ''}🦀 *НОВЕ ЗАМОВЛЕННЯ #${order.orderNumber}*
━━━━━━━━━━━━━━━━━━
👤 *Клієнт:* ${order.customerName}
📞 *Телефон:* [${order.phone}](tel:${order.phone.replace(/[^\d+]/g, '')})
📋 *Тип:* ${serviceType}
${addressText}
${order.scheduledTime ? `⏰ *Час доставки:* ${order.scheduledTime}\n` : ''}💰 *Оплата:* ${payType}
━━━━━━━━━━━━━━━━━━
🍽️ *Склад замовлення:*
${itemsList}

💵 *Сума страв:* ${order.subtotal} ₴
${order.discount > 0 ? `🎁 *Знижка:* -${order.discount} ₴\n` : ''}${order.deliveryFee > 0 ? `🚚 *Доставка:* +${order.deliveryFee} ₴\n` : ''}⭐️ *РАЗОМ ДО СПЛАТИ:* *${order.total} ₴*
${order.comment ? `\n💬 *Коментар:* ${order.comment}` : ''}
━━━━━━━━━━━━━━━━━━
_Час створення: ${order.date}_
  `.trim();

  if (token && chatId) {
    try {
      const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });
      const result = await response.json();
      return Boolean(result.ok);
    } catch (err) {
      console.warn('[Telegram Dispatcher] Network error:', err);
    }
  }

  // Simulation mode
  console.groupCollapsed(`[Telegram Alert Simulated] 🦀 Замовлення #${order.orderNumber}`);
  console.log(text);
  console.groupEnd();
  return true;
}
