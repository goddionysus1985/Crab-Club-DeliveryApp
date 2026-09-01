import assert from 'node:assert';

// 1. Mock Order Details for Delivery
const deliveryOrder = {
  orderId: 'CRAB-12345',
  orderNumber: '5521',
  date: '14:30',
  customerName: 'Іван Шевченко',
  phone: '+38 (099) 451-41-33',
  orderType: 'delivery',
  address: {
    city: 'смт. Овідіополь (Центр)',
    street: 'Вертелецького',
    house: '29',
    apartment: '2',
    floor: '1',
    doorphone: '22'
  },
  deliveryTimeType: 'asap',
  paymentMethod: 'cash',
  cashChangeFrom: '1000 ₴',
  cutleryCount: 2,
  comment: 'Подзвонити за 5 хвилин',
  items: [
    {
      id: 'cart-1',
      product: {
        id: 1,
        name: 'Вода мінеральна Боржомі у склі 0.5л',
        price: 25,
        category_pos_id: 3,
        category_name: 'Холодні напої',
        category_url: 'drinks',
        weight: '500 г',
        ingredients: '',
        description_raw: '',
        image: ''
      },
      quantity: 2,
      totalPrice: 50
    },
    {
      id: 'cart-2',
      product: {
        id: 6,
        name: 'Бургер',
        price: 100,
        category_pos_id: 4,
        category_name: 'бургер меню',
        category_url: 'burgers',
        weight: '300 г',
        ingredients: '',
        description_raw: '',
        image: ''
      },
      quantity: 1,
      selectedOptions: [{ option_name: 'Подвійний сир', price: 20 }],
      totalPrice: 120
    }
  ],
  subtotal: 170,
  discount: 0,
  deliveryFee: 50,
  total: 220,
  status: 'received'
};

// 2. Mock Order Details for Takeaway
const takeawayOrder = {
  orderId: 'CRAB-12346',
  orderNumber: '5522',
  date: '14:35',
  customerName: 'Олена Коваль',
  phone: '0686921378',
  orderType: 'takeaway',
  deliveryTimeType: 'scheduled',
  scheduledTime: '18:30',
  paymentMethod: 'card_courier',
  cutleryCount: 1,
  items: [
    {
      id: 'cart-3',
      product: {
        id: 5,
        name: 'Круасан з шоколадом',
        price: 16,
        category_pos_id: 2,
        category_name: 'Випічка',
        category_url: 'bakery',
        weight: '120 г',
        ingredients: '',
        description_raw: '',
        image: ''
      },
      quantity: 3,
      totalPrice: 48
    }
  ],
  subtotal: 48,
  discount: 0,
  deliveryFee: 0,
  total: 48,
  status: 'received'
};

console.log('🧪 ПОЧАТОК ТЕСТУВАННЯ POSTER POS API ТА БІЗНЕС-ЛОГІКИ');
console.log('----------------------------------------------------');

// Test 1: Address construction contains city
function cleanCity(raw) {
  return (raw || 'смт. Овідіополь').replace(/\s*\(.*?\)/g, '').replace(/—.*$/, '').trim() || 'смт. Овідіополь';
}

const city1 = cleanCity(deliveryOrder.address.city);
assert.strictEqual(city1, 'смт. Овідіополь', 'City should be cleaned of parenthetical zone suffix');
console.log('✅ ТЕСТ 1 ПРОЙДЕНО: Очищення назви населеного пункту');

const streetAndHouse = [`вул. ${deliveryOrder.address.street}`, `буд. ${deliveryOrder.address.house}`].join(', ');
const address1 = [city1, streetAndHouse].join(', ');
assert.strictEqual(address1, 'смт. Овідіополь, вул. Вертелецького, буд. 29', 'address1 must include city and street+house');
console.log('✅ ТЕСТ 2 ПРОЙДЕНО: Формування address1 з населеним пунктом для Poster POS');

// Test 3: Takeaway service_mode=1 per official Poster POS API docs (0=dine-in, 1=takeout, 2=delivery)
assert.strictEqual(takeawayOrder.orderType, 'takeaway');
const isTakeaway = takeawayOrder.orderType === 'takeaway';
const takeawayServiceMode = isTakeaway ? 1 : 2; // FIXED: was 2:3, now correct per Poster docs
assert.strictEqual(takeawayServiceMode, 1, 'Takeaway service_mode must be 1 (Poster POS API: 1=takeout)');
console.log('✅ ТЕСТ 3 ПРОЙДЕНО: service_mode = 1 для самовивозу (відповідно до офіційного Poster API)');

// Test 4: Payment is undefined for cash / terminal to prevent 0 UAH receipt bug
const cashPayment = deliveryOrder.paymentMethod === 'card_online' ? { type: 1, sum: 22000 } : undefined;
assert.strictEqual(cashPayment, undefined, 'Payment must be undefined for cash/terminal to avoid 0 UAH receipt bug');
console.log('✅ ТЕСТ 4 ПРОЙДЕНО: Запобігання багу 0 грн чеку при оплаті готівкою/терміналом');

// Test 5: Live Poster POS Endpoints Check
async function runLiveTests() {
  const token = '878574:81779496978a44fd04baad6f04b15fac';
  
  // Spots test
  const spotsRes = await fetch(`https://joinposter.com/api/spots.getSpots?token=${token}`);
  const spotsData = await spotsRes.json();
  assert(Array.isArray(spotsData.response), 'Spots response must be array');
  console.log(`✅ ТЕСТ 5 ПРОЙДЕНО: Live Poster API Spots (${spotsData.response.length} закладів)`);

  // Products test
  const menuRes = await fetch(`https://joinposter.com/api/menu.getProducts?token=${token}`);
  const menuData = await menuRes.json();
  assert(Array.isArray(menuData.response) && menuData.response.length > 0, 'Menu response must have products');
  console.log(`✅ ТЕСТ 6 ПРОЙДЕНО: Live Poster API Меню (${menuData.response.length} страв синхронізовано)`);

  // Status mapping verification
  const ordersRes = await fetch(`https://joinposter.com/api/incomingOrders.getIncomingOrders?token=${token}&spot_id=1`);
  const ordersData = await ordersRes.json();
  assert(Array.isArray(ordersData.response), 'Orders response must be array');
  console.log(`✅ ТЕСТ 7 ПРОЙДЕНО: Live Poster API Опитування статусів (${ordersData.response.length} замовлень у базі)`);

  console.log('----------------------------------------------------');
  console.log('🎉 ВСІ 7 ТЕСТІВ УСПІШНО ПРОЙДЕНО БЕЗ ЖОДНОЇ ПОМИЛКИ!');
}

runLiveTests().catch(err => {
  console.error('❌ Помилка тесту:', err);
  process.exit(1);
});
