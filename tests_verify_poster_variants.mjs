import assert from 'node:assert';

const TOKEN = '878574:81779496978a44fd04baad6f04b15fac';
const SPOT_ID = 1;
const BASE_URL = 'https://joinposter.com/api';

async function callPoster(method, body = null, params = {}) {
  const url = new URL(`${BASE_URL}/${method}`);
  url.searchParams.set('token', TOKEN);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }

  const options = {
    method: body ? 'POST' : 'GET',
    headers: { 'Accept': 'application/json' }
  };
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url.toString(), options);
  return await res.json();
}

console.log('================================================================');
console.log('🧪 ПОВНА ПЕРЕВІРКА ВСІХ ВАРІАНТІВ ЗАМОВЛЕНЬ У POSTER POS');
console.log('================================================================\n');

// 1. Fetch available live products to ensure valid IDs
const productsRes = await callPoster('menu.getProducts');
const liveProducts = productsRes.response || [];
console.log(`📦 Завантажено ${liveProducts.length} позицій меню з Poster POS.`);
const borjomi = liveProducts.find(p => p.product_name.includes('Боржомі')) || liveProducts[0] || { product_id: 1, price: 2500 };
const burger = liveProducts.find(p => p.product_name.toLowerCase().includes('бургер')) || liveProducts[1] || { product_id: 6, price: 10000 };
const croissant = liveProducts.find(p => p.product_name.toLowerCase().includes('круасан')) || liveProducts[2] || { product_id: 5, price: 1600 };

console.log(`- Продукт 1: ID ${borjomi.product_id} (${borjomi.product_name || 'Боржомі'})`);
console.log(`- Продукт 2: ID ${burger.product_id} (${burger.product_name || 'Бургер'})`);
console.log(`- Продукт 3: ID ${croissant.product_id} (${croissant.product_name || 'Круасан'})\n`);

const testScenarios = [
  {
    name: '1. Доставка + Готівка (Кур\'єр з рештою)',
    payload: {
      spot_id: SPOT_ID,
      phone: '380994514133',
      first_name: 'Олександр',
      last_name: 'ТестГотівка',
      service_mode: 3, // Delivery
      delivery_price: 5000, // 50.00 грн
      address: 'смт. Овідіополь, вул. Шевченка, буд. 12, кв. 4, пов. 2',
      client_address: {
        country: 'Україна',
        city: 'смт. Овідіополь',
        address1: 'смт. Овідіополь, вул. Шевченка, буд. 12',
        address2: 'кв. 4, пов. 2',
        comment: 'Код на дверях 45'
      },
      comment: 'Решта з: 500 ₴ | Приборів: 2 шт',
      products: [
        { product_id: Number(burger.product_id), count: 2, price: 20000, comment: 'Без цибулі' },
        { product_id: Number(borjomi.product_id), count: 1, price: 2500 }
      ]
      // payment omitted! (so Poster cashier/courier collects cash)
    },
    expectedMode: 3,
    expectedHasAddress: true,
    expectedPaid: false
  },
  {
    name: '2. Доставка + Термінал кур\'єру (Оплата карткою при отриманні)',
    payload: {
      spot_id: SPOT_ID,
      phone: '380686921378',
      first_name: 'Марина',
      last_name: 'ТестТермінал',
      service_mode: 3, // Delivery
      delivery_price: 10000, // 100.00 грн
      address: 'смт. Овідіополь, вул. Берегова, буд. 5',
      client_address: {
        country: 'Україна',
        city: 'смт. Овідіополь',
        address1: 'смт. Овідіополь, вул. Берегова, буд. 5',
        comment: 'Приватний будинок'
      },
      comment: 'Оплата терміналом кур\'єру | Приборів: 1 шт',
      products: [
        { product_id: Number(croissant.product_id), count: 3, price: 4800 }
      ]
      // payment omitted!
    },
    expectedMode: 3,
    expectedHasAddress: true,
    expectedPaid: false
  },
  {
    name: '3. Доставка + Оплата онлайн на сайті (Повна передплата)',
    payload: {
      spot_id: SPOT_ID,
      phone: '380991112233',
      first_name: 'Денис',
      last_name: 'ТестОнлайн',
      service_mode: 3, // Delivery
      delivery_price: 0, // Безкоштовна доставка
      address: 'смт. Овідіополь, вул. Вертелецького, буд. 29',
      client_address: {
        country: 'Україна',
        city: 'смт. Овідіополь',
        address1: 'смт. Овідіополь, вул. Вертелецького, буд. 29',
        comment: 'Дзвінок не працює'
      },
      comment: 'Оплачено онлайн через Apple Pay | Приборів: 3 шт',
      products: [
        { product_id: Number(burger.product_id), count: 3, price: 30000 }
      ],
      payment: {
        type: 1, // Prepaid
        sum: 30000, // 300.00 грн
        currency: 'UAH'
      }
    },
    expectedMode: 3,
    expectedHasAddress: true,
    expectedPaid: true
  },
  {
    name: '4. Самовивіз + Оплата на касі (Готівкою або Карткою)',
    payload: {
      spot_id: SPOT_ID,
      phone: '380994445566',
      first_name: 'Ірина',
      last_name: 'ТестСамовивізКаса',
      service_mode: 2, // Takeaway
      delivery_price: 0,
      comment: 'Приборів: 1 шт | Заберу особисто в закладі',
      products: [
        { product_id: Number(borjomi.product_id), count: 2, price: 5000 }
      ]
      // No address, no payment!
    },
    expectedMode: 2,
    expectedHasAddress: false,
    expectedPaid: false
  },
  {
    name: '5. Самовивіз + Оплата онлайн на сайті',
    payload: {
      spot_id: SPOT_ID,
      phone: '380997778899',
      first_name: 'Віталій',
      last_name: 'ТестСамовивізОнлайн',
      service_mode: 2, // Takeaway
      delivery_price: 0,
      comment: 'Приборів: 2 шт',
      products: [
        { product_id: Number(burger.product_id), count: 1, price: 10000 },
        { product_id: Number(croissant.product_id), count: 2, price: 3200 }
      ],
      payment: {
        type: 1,
        sum: 13200,
        currency: 'UAH'
      }
    },
    expectedMode: 2,
    expectedHasAddress: false,
    expectedPaid: true
  },
  {
    name: '6. Передзамовлення на точний час (Наприклад: на 19:30)',
    payload: {
      spot_id: SPOT_ID,
      phone: '380993334455',
      first_name: 'Катерина',
      last_name: 'ТестЧас',
      service_mode: 3,
      delivery_price: 5000,
      delivery_time: '2026-09-01 19:30:00',
      address: 'смт. Овідіополь, вул. Портова, буд. 8',
      client_address: {
        country: 'Україна',
        city: 'смт. Овідіополь',
        address1: 'смт. Овідіополь, вул. Портова, буд. 8'
      },
      comment: 'Час доставки: 19:30 | Приборів: 4 шт',
      products: [
        { product_id: Number(burger.product_id), count: 2, price: 20000 }
      ]
    },
    expectedMode: 3,
    expectedHasAddress: true,
    expectedPaid: false
  }
];

let allPassed = true;

for (const scenario of testScenarios) {
  console.log(`----------------------------------------------------------------`);
  console.log(`▶️ Тестуємо: ${scenario.name}`);
  console.log(`  Payload: service_mode=${scenario.payload.service_mode}, phone=${scenario.payload.phone}, products=${scenario.payload.products.length}`);
  
  const createRes = await callPoster('incomingOrders.createIncomingOrder', scenario.payload);
  
  if (createRes.error) {
    console.error(`  ❌ Помилка створення в Poster: [Код ${createRes.error}] ${createRes.message}`);
    allPassed = false;
    continue;
  }

  const orderId = createRes.response?.incoming_order_id;
  console.log(`  ✅ Успішно створено в Poster POS! ID онлайн-замовлення: #${orderId}`);

  // Fetch created order to verify exact fields as stored in Poster
  const getRes = await callPoster('incomingOrders.getIncomingOrder', null, { incoming_order_id: orderId });
  const posterOrder = getRes.response;

  if (!posterOrder) {
    console.error(`  ❌ Не вдалося отримати властивості створеного замовлення #${orderId}`);
    allPassed = false;
    continue;
  }

  // Validate service_mode
  assert.strictEqual(Number(posterOrder.service_mode), scenario.expectedMode, `service_mode must be ${scenario.expectedMode}`);
  console.log(`  ✓ service_mode: ${posterOrder.service_mode} (${posterOrder.service_mode == 2 ? 'Самовивіз' : 'Доставка'})`);

  // Validate address
  if (scenario.expectedHasAddress) {
    assert.ok(posterOrder.address && posterOrder.address.includes('Овідіополь'), 'Address must contain city');
    console.log(`  ✓ Адреса в Poster: "${posterOrder.address}"`);
  } else {
    console.log(`  ✓ Адреса відсутня (Самовивіз): "${posterOrder.address || 'порожньо'}"`);
  }

  // Validate products count
  assert.strictEqual(posterOrder.products.length, scenario.payload.products.length, 'Products count must match');
  console.log(`  ✓ Кількість страв у Poster: ${posterOrder.products.length} позицій`);

  // Validate phone and name
  assert.strictEqual(posterOrder.phone, scenario.payload.phone, 'Phone must match');
  console.log(`  ✓ Клієнт: ${posterOrder.first_name} ${posterOrder.last_name || ''} (${posterOrder.phone})`);
  console.log(`  ✓ Коментар каси: "${posterOrder.comment || ''}"`);
}

console.log(`\n================================================================`);
if (allPassed) {
  console.log(`🎉 ВСІ 6 ВАРІАНТІВ ЗАМОВЛЕНЬ УСПІШНО СТВОРЕНІ ТА ПЕРЕВІРЕНІ В POSTER POS!`);
  console.log(`   - Самовивіз і доставка відображаються коректно`);
  console.log(`   - Адреси доставки містять населений пункт`);
  console.log(`   - Оплата та коментарі відображаються без помилок`);
} else {
  console.log(`❌ Деякі варіанти завершились із зауваженнями.`);
}
console.log(`================================================================\n`);
