// Auto-generated & Live Synchronized from Poster POS API
// Generated at: 2026-09-02T23:57:10.279Z
import { Category, Product, RestaurantInfo, Banner, Review } from '../types';

export const RESTAURANT_INFO: RestaurantInfo = {
  "name": "CRAB CLUB",
  "badge": "PREMIUM DELIVERY & RESTAURANT",
  "tagline": "Висока кухня у вас вдома. Свіжі морепродукти, преміальні бургери, авторські страви та свіжа випічка.",
  "city": "смт. Овідіополь",
  "address": "вулиця Миру, 2, Овідіополь, Одеська область, 67800",
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
    "subcategories": [
      {
        "id": 5,
        "name": "супер кава",
        "slug": "kava"
      }
    ]
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
  },
  {
    "id": 6,
    "name": "Краби & Морепродукти",
    "slug": "kraby-moreprodukty",
    "icon": "Utensils",
    "subcategories": []
  },
  {
    "id": 7,
    "name": "Краби та Морепродукти",
    "slug": "kraby-ta-moreprodukty",
    "icon": "Utensils",
    "subcategories": []
  },
  {
    "id": 8,
    "name": "Суші та Роли",
    "slug": "roli",
    "icon": "Fish",
    "subcategories": []
  },
  {
    "id": 9,
    "name": "Піца на дровах",
    "slug": "pica",
    "icon": "Pizza",
    "subcategories": []
  },
  {
    "id": 10,
    "name": "Гарячі закуски та Снеки",
    "slug": "xolodni-zakuski",
    "icon": "Sparkles",
    "subcategories": []
  },
  {
    "id": 11,
    "name": "Свіжі салати",
    "slug": "salati",
    "icon": "Salad",
    "subcategories": []
  },
  {
    "id": 12,
    "name": "Супи та Рамени",
    "slug": "supy",
    "icon": "Soup",
    "subcategories": []
  },
  {
    "id": 13,
    "name": "Десерти",
    "slug": "deserti",
    "icon": "Cake",
    "subcategories": []
  },
  {
    "id": 14,
    "name": "Соуси та Діпи",
    "slug": "sousy-ta-dipy",
    "icon": "Sparkles",
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
    "price": 35,
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
        "max": 1,
        "options": [
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
    "id": 12,
    "name": "Бургер цезар",
    "category_pos_id": 4,
    "category_name": "бургер меню",
    "category_url": "burger-menyu",
    "price": 150,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    "modifications": [
      {
        "group_id": 1,
        "group_name": "Додатки до бургерів",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1,
            "name": "Сир чедер",
            "price": 15
          },
          {
            "id": 2,
            "name": "Фірмовий соус",
            "price": 15
          },
          {
            "id": 3,
            "name": "Котлета для бургера",
            "price": 25
          }
        ]
      }
    ]
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
    "id": 27,
    "name": "Грецький салат з ніжним сиром фета",
    "category_pos_id": 11,
    "category_name": "Свіжі салати",
    "category_url": "salati",
    "price": 250,
    "weight": "1 порція",
    "ingredients": "Томати, огірки, болгарський перець, оливки каламата, оливкова олія",
    "description_raw": "Томати, огірки, болгарський перець, оливки каламата, оливкова олія",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 19,
    "name": "Зелений Дракон з вугром",
    "category_pos_id": 8,
    "category_name": "Суші та Роли",
    "category_url": "roli",
    "price": 360,
    "weight": "1 порція",
    "ingredients": "Копчений вугор, авокадо, крем-сир, соус унагі, кунжут",
    "description_raw": "Копчений вугор, авокадо, крем-сир, соус унагі, кунжут",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 18,
    "name": "Каліфорнія з тигровою креветкою",
    "category_pos_id": 8,
    "category_name": "Суші та Роли",
    "category_url": "roli",
    "price": 260,
    "weight": "1 порція",
    "ingredients": "Креветка, ікра тобіко, авокадо, японський майонез",
    "description_raw": "Креветка, ікра тобіко, авокадо, японський майонез",
    "image": "https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80"
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
    "id": 23,
    "name": "Картопля фрі з трюфельним соусом",
    "category_pos_id": 10,
    "category_name": "Гарячі закуски та Снеки",
    "category_url": "xolodni-zakuski",
    "price": 120,
    "weight": "1 порція",
    "ingredients": "Хрустка картопля фрі з пармезаном та трюфельним айолі",
    "description_raw": "Хрустка картопля фрі з пармезаном та трюфельним айолі",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 15,
    "name": "Краб-рол у бріоші",
    "category_pos_id": 7,
    "category_name": "Краби та Морепродукти",
    "category_url": "kraby-ta-moreprodukty",
    "price": 290,
    "weight": "1 порція",
    "ingredients": "Ніжний краб у вершковому соусі на підсмаженій бріош-булочці",
    "description_raw": "Ніжний краб у вершковому соусі на підсмаженій бріош-булочці",
    "image": "https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 14,
    "name": "Крабовий Боул Преміум",
    "category_pos_id": 7,
    "category_name": "Краби та Морепродукти",
    "category_url": "kraby-ta-moreprodukty",
    "price": 380,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 16,
    "name": "Креветки Панко з чилі соусом",
    "category_pos_id": 7,
    "category_name": "Краби та Морепродукти",
    "category_url": "kraby-ta-moreprodukty",
    "price": 240,
    "weight": "1 порція",
    "ingredients": "Хрусткі тигрові креветки в сухарях панко з фірмовим соусом",
    "description_raw": "Хрусткі тигрові креветки в сухарях панко з фірмовим соусом",
    "image": "https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80"
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
    "id": 25,
    "name": "Курячі крильця BBQ у глазурі",
    "category_pos_id": 10,
    "category_name": "Гарячі закуски та Снеки",
    "category_url": "xolodni-zakuski",
    "price": 190,
    "weight": "1 порція",
    "ingredients": "Соковиті крильця у солодко-пікантному маринаді барбекю",
    "description_raw": "Соковиті крильця у солодко-пікантному маринаді барбекю",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80"
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
  },
  {
    "id": 20,
    "name": "Піца 4 Сири Преміум",
    "category_pos_id": 9,
    "category_name": "Піца на дровах",
    "category_url": "pica",
    "price": 280,
    "weight": "1 порція",
    "ingredients": "Моцарела, дорблю, пармезан, брі, вершковий соус, горіхи",
    "description_raw": "Моцарела, дорблю, пармезан, брі, вершковий соус, горіхи",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 22,
    "name": "Піца з морепродуктами",
    "category_pos_id": 9,
    "category_name": "Піца на дровах",
    "category_url": "pica",
    "price": 340,
    "weight": "1 порція",
    "ingredients": "Тигрові креветки, мідії, кальмари, вершковий соус, чері",
    "description_raw": "Тигрові креветки, мідії, кальмари, вершковий соус, чері",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 21,
    "name": "Піца Пепероні з моцарелою",
    "category_pos_id": 9,
    "category_name": "Піца на дровах",
    "category_url": "pica",
    "price": 250,
    "weight": "1 порція",
    "ingredients": "Пікантна салямі пепероні, моцарела, томатний базиліковий соус",
    "description_raw": "Пікантна салямі пепероні, моцарела, томатний базиліковий соус",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 29,
    "name": "Рамен з куркою та яйцем адицуке",
    "category_pos_id": 12,
    "category_name": "Супи та Рамени",
    "category_url": "supy",
    "price": 210,
    "weight": "1 порція",
    "ingredients": "Насичений бульйон, пшенична локшина, ніжна курка, норі, зелена цибуля",
    "description_raw": "Насичений бульйон, пшенична локшина, ніжна курка, норі, зелена цибуля",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 26,
    "name": "Салат Цезар з тигровими креветками",
    "category_pos_id": 11,
    "category_name": "Свіжі салати",
    "category_url": "salati",
    "price": 240,
    "weight": "1 порція",
    "ingredients": "Листя ромен, тигрові креветки, чері, крутони, пармезан, соус цезар",
    "description_raw": "Листя ромен, тигрові креветки, чері, крутони, пармезан, соус цезар",
    "image": "https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 24,
    "name": "Сирні палички Моцарела з журавлиною",
    "category_pos_id": 10,
    "category_name": "Гарячі закуски та Снеки",
    "category_url": "xolodni-zakuski",
    "price": 150,
    "weight": "1 порція",
    "ingredients": "Тягуча моцарела у хрусткій золотистій паніровці",
    "description_raw": "Тягуча моцарела у хрусткій золотистій паніровці",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 32,
    "name": "Соус Сирний Чедер",
    "category_pos_id": 14,
    "category_name": "Соуси та Діпи",
    "category_url": "sousy-ta-dipy",
    "price": 35,
    "weight": "1 порція",
    "ingredients": "Густий вершковий соус з витриманого сиру чедер",
    "description_raw": "Густий вершковий соус з витриманого сиру чедер",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 34,
    "name": "Соус Солодкий Чилі",
    "category_pos_id": 14,
    "category_name": "Соуси та Діпи",
    "category_url": "sousy-ta-dipy",
    "price": 30,
    "weight": "1 порція",
    "ingredients": "Ароматний тайський соус для закусок та морепродуктів",
    "description_raw": "Ароматний тайський соус для закусок та морепродуктів",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 33,
    "name": "Соус Тартар фірмовий",
    "category_pos_id": 14,
    "category_name": "Соуси та Діпи",
    "category_url": "sousy-ta-dipy",
    "price": 35,
    "weight": "1 порція",
    "ingredients": "Класичний соус з корнішонами, каперсами та свіжою зеленню",
    "description_raw": "Класичний соус з корнішонами, каперсами та свіжою зеленню",
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 13,
    "name": "супер пупер кава",
    "category_pos_id": 5,
    "category_name": "супер кава",
    "category_url": "kava",
    "price": 420,
    "weight": "1 порція",
    "ingredients": "",
    "description_raw": "",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 28,
    "name": "Том Ям з морепродуктами",
    "category_pos_id": 12,
    "category_name": "Супи та Рамени",
    "category_url": "supy",
    "price": 270,
    "weight": "1 порція",
    "ingredients": "Гостро-кислий суп з креветками, мідіями, печерицями та кокосовим молоком",
    "description_raw": "Гостро-кислий суп з креветками, мідіями, печерицями та кокосовим молоком",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 17,
    "name": "Філадельфія з лососем та крабом",
    "category_pos_id": 8,
    "category_name": "Суші та Роли",
    "category_url": "roli",
    "price": 320,
    "weight": "1 порція",
    "ingredients": "Свіжий лосось, сніговий краб, крем-сир філадельфія, огірок",
    "description_raw": "Свіжий лосось, сніговий краб, крем-сир філадельфія, огірок",
    "image": "https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 30,
    "name": "Чизкейк Нью-Йорк з ягодами",
    "category_pos_id": 13,
    "category_name": "Десерти",
    "category_url": "deserti",
    "price": 130,
    "weight": "1 порція",
    "ingredients": "Класичний ніжний сирний десерт з ягідним соусом",
    "description_raw": "Класичний ніжний сирний десерт з ягідним соусом",
    "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80"
  },
  {
    "id": 31,
    "name": "Шоколадний фондан з морозивом",
    "category_pos_id": 13,
    "category_name": "Десерти",
    "category_url": "deserti",
    "price": 140,
    "weight": "1 порція",
    "ingredients": "Теплий шоколадний кекс з рідким центром та кулькою морозива",
    "description_raw": "Теплий шоколадний кекс з рідким центром та кулькою морозива",
    "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80"
  }
];

export const REVIEWS: Review[] = [];

export const PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'CRABCLUB': { discountPercent: 10, description: 'Знижка 10% на все замовлення' },
  'VIP15': { discountPercent: 15, description: 'VIP знижка 15%' },
  'WELCOME': { discountPercent: 10, description: 'Вітальна знижка 10%' },
  'CRAB50': { discountFixed: 50, description: 'Знижка 50₴ на замовлення' }
};
