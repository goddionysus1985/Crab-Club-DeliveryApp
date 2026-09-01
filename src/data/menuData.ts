// Auto-generated & Live Synchronized from Poster POS API
// Generated at: 2026-09-01T21:33:22.387Z
import { Category, Product, RestaurantInfo, Banner, Review } from '../types';

export const RESTAURANT_INFO: RestaurantInfo = {
  "name": "CRAB CLUB",
  "badge": "PREMIUM DELIVERY & RESTAURANT",
  "tagline": "Висока кухня у вас вдома. Свіжі морепродукти, преміальні бургери, авторські страви та свіжа випічка.",
  "city": "смт. Овідіополь",
  "address": "смт. Овідіополь, Одеська область",
  "phone": "+380 (68) 692 13 78",
  "phone_raw": "+380686921378",
  "work_hours": "Пн–Сб: 10:00–22:00, Нд: 11:00–22:00",
  "delivery_time": "45–60 хв",
  "min_order": 300,
  "free_delivery_from": 500,
  "delivery_zones": [
    { "id": "center", "zone": "Центр", "price": 50, "freeFromAmount": 500, "time": "5–15 хв", "description": "Центральна частина смт. Овідіополь" },
    { "id": "ovidiopol", "zone": "Овідіополь", "price": 100, "freeFromAmount": 1000, "time": "15–30 хв", "description": "Всі райони смт. Овідіополь" },
    { "id": "rostok", "zone": "Росток", "price": 200, "freeFromAmount": 1700, "time": "40–55 хв", "description": "Масив Росток та прилеглі райони" },
    { "id": "neighbor_villages", "zone": "Сусідні села", "price": 300, "freeFromAmount": 2700, "time": "45–60 хв", "description": "Роксолани, Калаглія, Миколаївка та прилеглі села" },
    { "id": "beyond_villages", "zone": "За межами сусідніх сел", "price": 500, "freeFromAmount": 3700, "time": "50–75 хв", "description": "Віддалені населені пункти та дачні кооперативи" }
  ],
  "features": [
    { "icon": "Sparkles", "title": "Преміум якість", "desc": "Лише якісні свіжі інгредієнти та добірні соуси." },
    { "icon": "Flame", "title": "Гаряча кухня & Бургери", "desc": "Соковиті бургери, авторські рецепти та свіжа випічка." },
    { "icon": "ShieldCheck", "title": "Poster POS Інтеграція", "desc": "Пряма синхронізація замовлень з касою та бонусною системою." }
  ],
  "socials": {
    "instagram": "https://www.instagram.com/crab_club.ovi/",
    "tiktok": "https://www.tiktok.com/@crab_club.ovi",
    "telegram": "https://t.me/crabclub_delivery",
    "viber": "viber://chat?number=%2B380686921378"
  },
  "logo": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
  "logo_icon": "https://img.postershop.me/21253/48ff3a5a-f1f0-4892-8331-602d1b6620bb_image.png"
};

export const BANNERS: Banner[] = [
  {
    "id": 1,
    "title": "ПРЕМІАЛЬНІ БУРГЕРИ ТА СВІЖА ВИПІЧКА",
    "subtitle": "Соковите м'ясо, авторські соуси та хрусткі булочки власного виробництва.",
    "badge": "ХІТ ПРОДАЖІВ",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85",
    "link": "#category-kava",
    "ctaText": "Переглянути меню"
  },
  {
    "id": 2,
    "title": "АРОМАТНА КАВА ТА ДЕСЕРТИ",
    "subtitle": "Свіжообсмажені зерна 100% арабіки та ніжні круасани з бельгійським шоколадом.",
    "badge": "РАНКОВИЙ ЗАРЯД",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85",
    "link": "#category-kava",
    "ctaText": "Обрати каву"
  },
  {
    "id": 3,
    "title": "ШВИДКА ДОСТАВКА ТА САМОВИВІЗ",
    "subtitle": "Замовляйте онлайн та отримуйте 5% кешбеку бонусами на рахунок Poster POS.",
    "badge": "ЗРУЧНО ТА ШВИДКО",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
    "link": "#menu",
    "ctaText": "Замовити зараз"
  }
];

export const CATEGORIES: Category[] = [
  {
    "id": 1,
    "name": "Кава",
    "slug": "kava",
    "icon": "Coffee",
    "subcategories": []
  },
  {
    "id": 2,
    "name": "Випічка",
    "slug": "vypichka",
    "icon": "Cake",
    "subcategories": []
  },
  {
    "id": 3,
    "name": "Холодні напої",
    "slug": "xolodni-napoyi",
    "icon": "GlassWater",
    "subcategories": []
  },
  {
    "id": 4,
    "name": "бургер меню",
    "slug": "burger-menyu",
    "icon": "Sandwich",
    "subcategories": []
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": 11,
    "name": "Бургер",
    "category_pos_id": 4,
    "category_name": "бургер меню",
    "category_url": "burger-menyu",
    "price": 25,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    "modifications": [
      {
        "group_id": 1,
        "group_name": "Додаткові інгредієнти / Модифікатори",
        "type": 1,
        "min": 0,
        "max": 3,
        "options": [
          {
            "id": 2,
            "name": "+ котлета",
            "price": 25
          },
          {
            "id": 3,
            "name": "+ сир",
            "price": 10
          },
          {
            "id": 4,
            "name": "+ соус",
            "price": 35
          }
        ]
      }
    ]
  },
  {
    "id": 1,
    "name": "Вода мінеральна Боржомі у склі 0.5л",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "price": 25,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://joinposter.com/upload/pos_cdb_7631/menu/product_1464609975_1_original.jpg"
  },
  {
    "id": 8,
    "name": "Кока Кола 0,5",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "price": 39,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 6,
    "name": "Бургер",
    "category_pos_id": 4,
    "category_name": "бургер меню",
    "category_url": "burger-menyu",
    "price": 100,
    "weight": "796 г",
    "ingredients": "Борошно, Вода, Цукор, котлета",
    "description_raw": "Борошно, Вода, Цукор, котлета",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 7,
    "name": "Бургер 1",
    "category_pos_id": 4,
    "category_name": "бургер меню",
    "category_url": "burger-menyu",
    "price": 0,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 9,
    "name": "Бургер420",
    "category_pos_id": 4,
    "category_name": "бургер меню",
    "category_url": "burger-menyu",
    "price": 420,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 3,
    "name": "Капучино 250 мл",
    "category_pos_id": 1,
    "category_name": "Кава",
    "category_url": "kava",
    "price": 30,
    "weight": "248 г",
    "ingredients": "Вода, Кава, Молоко, Паперовий стакан 250 мл, Кришка 250 мл, Розмішувач",
    "description_raw": "Вода, Кава, Молоко, Паперовий стакан 250 мл, Кришка 250 мл, Розмішувач",
    "image": "https://joinposter.com/upload/pos_cdb_7631/menu/product_1464608672_3_original.jpg"
  },
  {
    "id": 5,
    "name": "Круасан з шоколадом",
    "category_pos_id": 2,
    "category_name": "Випічка",
    "category_url": "vypichka",
    "price": 16,
    "weight": "190 г",
    "ingredients": "Шоколад чорний, Тісто для круасанів",
    "description_raw": "Шоколад чорний, Тісто для круасанів",
    "image": "https://joinposter.com/upload/pos_cdb_7631/menu/product_1464251849_5_original.jpg"
  },
  {
    "id": 10,
    "name": "молоко",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "price": 0,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
  }
];

export const REVIEWS: Review[] = [];

export const PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'CRABCLUB': { discountPercent: 10, description: 'Знижка 10% на все замовлення' },
  'VIP15': { discountPercent: 15, description: 'VIP знижка 15%' },
  'WELCOME': { discountPercent: 10, description: 'Вітальна знижка 10%' },
  'CRAB50': { discountFixed: 50, description: 'Знижка 50₴ на замовлення' }
};
