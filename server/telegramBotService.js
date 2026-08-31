/**
 * CRAB CLUB Official Telegram Verification Bot Daemon
 * Bot Token: 8876828349:AAGRzgX60aFsEYD5MRiE5rePRHeCkC7jXQ0
 * Run command: node server/telegramBotService.js
 */

const BOT_TOKEN = '8876828349:AAGRzgX60aFsEYD5MRiE5rePRHeCkC7jXQ0';
let offset = 0;

console.log('🦀 Crab Club Telegram Bot Daemon starting up...');

async function fetchUpdates() {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=25`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok && Array.isArray(data.result)) {
      for (const update of data.result) {
        offset = update.update_id + 1;
        if (update.message) {
          await handleMessage(update.message);
        }
      }
    }
  } catch (err) {
    // Network retry backoff
    await new Promise(r => setTimeout(r, 3000));
  }

  // Continue long-polling loop
  setImmediate(fetchUpdates);
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim();
  const userName = msg.from.first_name || 'Гість';

  // Handling /start login_PHONE_CODE
  if (text.startsWith('/start login_')) {
    const parts = text.split('_');
    const phone = parts[1] || '';
    const code = parts[2] || '';

    if (code) {
      const reply = `🦀 *Вітаємо в CRAB CLUB, ${userName}!* \n\n` +
        `🔐 Ваш одноразовий код авторизації: \n` +
        `👉 \`${code}\` 👈\n\n` +
        `📱 Номер: +${phone}\n` +
        `⏱ Код дійсний 5 хвилин.\n\n` +
        `_Нікому не передавайте цей код для безпеки ваших бонусів._`;

      await sendMessage(chatId, reply);
      return;
    }
  }

  // General /start greeting
  if (text.startsWith('/start')) {
    const reply = `🦀 *Вітаємо в CRAB CLUB!* \n\n` +
      `Ми — ресторан доставки преміум-рівня в смт. Овідіополь.\n\n` +
      `🌟 *Ваші переваги клубу:*\n` +
      `• Кешбек 5% на кожне замовлення\n` +
      `• Свіжі роли, суші-бургери та неаполітанська піца\n` +
      `• Швидка доставка по Овідіополю за 5–15 хв\n\n` +
      `🌐 *Сайт ресторану:* https://crabclub.com.ua`;

    await sendMessage(chatId, reply);
  }
}

async function sendMessage(chatId, text) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });
  } catch (err) {
    console.error('Error sending Telegram message:', err);
  }
}

fetchUpdates();
console.log('✅ Bot polling active. Listening for authentication requests...');
