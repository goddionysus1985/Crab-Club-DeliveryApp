// Auto-generated Crab Club Menu & Restaurant Data
import { Category, Product, RestaurantInfo, Banner, Review } from '../types';

export const RESTAURANT_INFO: RestaurantInfo = {
  "name": "CRAB CLUB",
  "badge": "PREMIUM DELIVERY & RESTAURANT",
  "tagline": "Висока кухня у вас вдома. Свіжі морепродукти, преміальні роли, неаполітанська піца та авторські страви.",
  "city": "смт. Овідіополь",
  "address": "смт. Овідіополь, Одеська область",
  "phone": "+380 (68) 692 13 78",
  "phone_raw": "+380686921378",
  "work_hours": "Щодня з 10:00 до 22:00",
  "delivery_time": "45–60 хв",
  "min_order": 300,
  "free_delivery_from": 500,
  "delivery_zones": [
    {
      "id": "center",
      "zone": "Центр",
      "price": 50,
      "freeFromAmount": 500,
      "time": "30–45 хв",
      "description": "Центральна частина смт. Овідіополь"
    },
    {
      "id": "ovidiopol",
      "zone": "Овідіополь",
      "price": 100,
      "freeFromAmount": 1000,
      "time": "35–50 хв",
      "description": "Всі райони смт. Овідіополь"
    },
    {
      "id": "rostok",
      "zone": "Росток",
      "price": 200,
      "freeFromAmount": 1700,
      "time": "40–55 хв",
      "description": "Масив Росток та прилеглі райони"
    },
    {
      "id": "neighbor_villages",
      "zone": "Сусідні села",
      "price": 300,
      "freeFromAmount": 2700,
      "time": "45–60 хв",
      "description": "Роксолани, Калаглія, Миколаївка та прилеглі села"
    },
    {
      "id": "beyond_villages",
      "zone": "За межами сусідніх сел",
      "price": 500,
      "freeFromAmount": 3700,
      "time": "50–75 хв",
      "description": "Віддалені населені пункти та дачні кооперативи"
    }
  ],
  "features": [
    {
      "icon": "Sparkles",
      "title": "Преміум якість",
      "desc": "Лише охолоджений норвезький лосось, справжній камчатський краб та добірні сири."
    },
    {
      "icon": "Flame",
      "title": "Справжня пекарня & WOK",
      "desc": "Хрустка римська та неаполітанська піца, wok-локшина та соковиті бургери."
    },
    {
      "icon": "ShieldCheck",
      "title": "Бездоганна чистота",
      "desc": "Відкрита кухня європейського рівня та стандарти HACCP."
    },
    {
      "icon": "Truck",
      "title": "Термобокси & Швидкість",
      "desc": "Доставляємо гаряче гарячим, а свіжі роли охолодженими в преміум упаковці."
    }
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
    "title": "ПРЕМІАЛЬНІ СЕТИ ДЛЯ ОСОБЛИВИХ ПОДІЙ",
    "subtitle": "Охолоджений норвезький лосось, гігантські креветки, справжній краб та найніжніший сир Філадельфія.",
    "badge": "ХІТ СЕЗОНУ",
    "image": "https://img.postershop.me/21253/3518df7a-29bd-4fda-9025-44a6526845cd_image.png",
    "link": "#category-menyu-roli",
    "ctaText": "Обрати сет"
  },
  {
    "id": 2,
    "title": "ХРУСТКА НЕАПОЛІТАНСЬКА ПІЦА",
    "subtitle": "Ферментоване тісто з 48-годинною витримкою, томати San Marzano та витяжна моцарела fior di latte.",
    "badge": "СПРАВЖНІЙ СМАК ІТАЛІЇ",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85",
    "link": "#category-pica",
    "ctaText": "Замовити піцу"
  },
  {
    "id": 3,
    "title": "ЗНИЖКА 10% НА САМОВИВІЗ",
    "subtitle": "Замовляйте улюблені страви онлайн та забирайте самостійно з ресторану з додатковою вигодою.",
    "badge": "ВИГІДНА ПРОПОЗИЦІЯ",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=85",
    "link": "#menu",
    "ctaText": "Спробувати"
  }
];

export const CATEGORIES: Category[] = [
  {
    "id": 26,
    "name": "Сніданки (10:00-13:00)",
    "slug": "snidanki",
    "subcategories": [],
    "icon": "Coffee"
  },
  {
    "id": 23,
    "name": "Холодні закуски",
    "slug": "xolodni-zakuski",
    "subcategories": [],
    "icon": "Sparkles"
  },
  {
    "id": 24,
    "name": "Салати",
    "slug": "salati",
    "subcategories": [],
    "icon": "Salad"
  },
  {
    "id": 8,
    "name": "Гарячі закуски",
    "slug": "gariachi-zakuski",
    "subcategories": [],
    "icon": "Flame"
  },
  {
    "id": 25,
    "name": "Гарячі страви",
    "slug": "garyaci-stravi",
    "subcategories": [],
    "icon": "Soup"
  },
  {
    "id": 15,
    "name": "Пасти",
    "slug": "pasti-wok",
    "subcategories": [],
    "icon": "Utensils"
  },
  {
    "id": 27,
    "name": "Меню: Роли",
    "slug": "menyu-roli",
    "subcategories": [
      {
        "id": 4,
        "name": "Холодні роли",
        "slug": "xolodni-roli"
      },
      {
        "id": 22,
        "name": "Інарі Меню",
        "slug": "inari-menyu"
      },
      {
        "id": 20,
        "name": "Поке",
        "slug": "bowl"
      },
      {
        "id": 21,
        "name": "Суші Cake Передзамовлення",
        "slug": "susi-cake-peredzamovlennya"
      },
      {
        "id": 5,
        "name": "Гарячі роли",
        "slug": "garyaci-roli"
      },
      {
        "id": 7,
        "name": "Запечені роли",
        "slug": "zapeceni-roli"
      },
      {
        "id": 6,
        "name": "Сетові пропозції",
        "slug": "seti"
      },
      {
        "id": 11,
        "name": "Суші: Fast Food",
        "slug": "susi-fast-food"
      }
    ],
    "icon": "Fish"
  },
  {
    "id": 16,
    "name": "Піца",
    "slug": "pica",
    "subcategories": [],
    "icon": "Pizza"
  },
  {
    "id": 28,
    "name": "Crab Club: Food",
    "slug": "crab-club-food",
    "subcategories": [
      {
        "id": 13,
        "name": "Бургер Меню",
        "slug": "burger-menyu"
      }
    ],
    "icon": "Sandwich"
  },
  {
    "id": 9,
    "name": "Десерти",
    "slug": "deserti",
    "subcategories": [],
    "icon": "Cake"
  },
  {
    "id": 3,
    "name": "Холодні напої",
    "slug": "xolodni-napoyi",
    "subcategories": [],
    "icon": "GlassWater"
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": 7475529,
    "name": "Круасан \"Селянський\"",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "200 г",
    "ingredients": "Мікс «Салат», Філе Куряче, Гриби Печериці, Помідори, Сир «Чедер», Соус «Цезар»",
    "description_raw": "Вага: 200 г\nІнгредієнти:\nМікс «Салат», Філе Куряче, Гриби Печериці, Помідори, Сир «Чедер», Соус «Цезар»",
    "image": "https://img.postershop.me/21253/5ae2cd5d-5c31-41b3-9a9c-64f6faff42da_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475527,
    "name": "Круасан \"Норвезький\"",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 219,
    "weight": "130 г",
    "ingredients": "Мікс «Салат», Помідори, Грав-Лакс, Яйце «Пашот», Соус «Цезар»",
    "description_raw": "Вага: 130 г\nІнгредієнти:\nМікс «Салат», Помідори, Грав-Лакс, Яйце «Пашот», Соус «Цезар»",
    "image": "https://img.postershop.me/21253/09a9c3eb-e625-424f-98f7-bbe13c6270b9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475990,
    "name": "Круасан \"Американський\"",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 219,
    "weight": "150 г",
    "ingredients": "Мікс «Салат», Бекон Американський, Шинка, Корнішони, Соус «Фірмовий»",
    "description_raw": "Вага: 150 г\nІнгредієнти:\nМікс «Салат», Бекон Американський, Шинка, Корнішони, Соус «Фірмовий»",
    "image": "https://img.postershop.me/21253/5073b9c7-4741-4b78-bfb0-975fd9909743_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475974,
    "name": "Млинці \"Сюзетт\"",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 139,
    "weight": "400 г",
    "ingredients": "Соковиті млинці із поєднанням апельсинового соусу",
    "description_raw": "Вага: 400 г\nІнгредієнти:\nСоковиті млинці із поєднанням апельсинового соусу",
    "image": "https://img.postershop.me/21253/9c804276-1fe7-4e98-b3e5-bf69cb66259e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475971,
    "name": "Сирники від Шефа",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 169,
    "weight": "180 г",
    "ingredients": "Сирники із додаванням полуничного соусу",
    "description_raw": "Вага: 180 г\nІнгредієнти:\nСирники із додаванням полуничного соусу",
    "image": "https://img.postershop.me/21253/061bbb4c-fc17-4f02-9c3b-5738795cb06e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": true
  },
  {
    "id": 7476033,
    "name": "Сніданок \"Американський\"",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "130 г",
    "ingredients": "Смажені Яйця, Мікс «Салат», Томат «Чері», Бекон Американський, Сосиски Гриль",
    "description_raw": "Вага: 130 г\nІнгредієнти:\nСмажені Яйця, Мікс «Салат», Томат «Чері», Бекон Американський, Сосиски Гриль",
    "image": "https://img.postershop.me/21253/83a6c3fb-e9cb-4322-a1d7-7faf3572f1bd_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7476045,
    "name": "Скрембл з Лососем",
    "category_pos_id": 26,
    "category_name": "Сніданки (10:00-13:00)",
    "category_url": "snidanki",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "110 г",
    "ingredients": "Скрембл, Авокадо, Грав-Лакс",
    "description_raw": "Вага: 110 г\nІнгредієнти:\nСкрембл, Авокадо, Грав-Лакс",
    "image": "https://img.postershop.me/21253/c0546f23-3df5-4a95-9545-be55746b7453_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7475952,
    "name": "Пате Куряче",
    "category_pos_id": 23,
    "category_name": "Холодні закуски",
    "category_url": "xolodni-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "200 г",
    "ingredients": "Паштет Курячий, Соус «Ягідний», Горішки",
    "description_raw": "Вага: 200 г\nІнгредієнти:\nПаштет Курячий, Соус «Ягідний», Горішки",
    "image": "https://img.postershop.me/21253/ed612367-b129-4572-83c0-3cfa4bf2871f_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7470257,
    "name": "Форшмак по-Одеські",
    "category_pos_id": 23,
    "category_name": "Холодні закуски",
    "category_url": "xolodni-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 229,
    "weight": "200 г",
    "ingredients": "",
    "description_raw": "Вага: 200 г",
    "image": "https://img.postershop.me/21253/cc96f568-2fd3-4865-ae06-ebee3f39c959_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475520,
    "name": "Ікра щуча по-Одеські",
    "category_pos_id": 23,
    "category_name": "Холодні закуски",
    "category_url": "xolodni-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 399,
    "weight": "60 г",
    "ingredients": "",
    "description_raw": "Вага: 60 г",
    "image": "https://img.postershop.me/21253/0090bb3d-3710-4e5d-add3-af92c712351b_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475396,
    "name": "Тар-тар з Лососем",
    "category_pos_id": 23,
    "category_name": "Холодні закуски",
    "category_url": "xolodni-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 399,
    "weight": "200 г",
    "ingredients": "Лосось, Авокадо, Цибуля Марс, Червона Ікра, Соус «Вустерширський», Зелена Цибуля",
    "description_raw": "Вага: 200 г\nІнгредієнти:\nЛосось, Авокадо, Цибуля Марс, Червона Ікра, Соус «Вустерширський», Зелена Цибуля",
    "image": "https://img.postershop.me/21253/7682b29d-e1a6-4b65-9cd1-4f9b59ddef61_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7543960,
    "name": "Сирна Нарізка",
    "category_pos_id": 23,
    "category_name": "Холодні закуски",
    "category_url": "xolodni-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 369,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": true,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7543963,
    "name": "Маринована Закуска",
    "category_pos_id": 23,
    "category_name": "Холодні закуски",
    "category_url": "xolodni-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 189,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475483,
    "name": "Салат \"Грецький\"",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 179,
    "weight": "210 г",
    "ingredients": "Мікс «Салат», Помідори, Огірок, Перець болгарський, Цибуля Марс, Маслини, Фета, Соус «Фірмовий»",
    "description_raw": "Вага: 210 г\nІнгредієнти:\nМікс «Салат», Помідори, Огірок, Перець болгарський, Цибуля Марс, Маслини, Фета, Соус «Фірмовий»",
    "image": "https://img.postershop.me/21253/05841c31-d45c-4c43-9dc2-dd2a57447497_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475479,
    "name": "Салат \"Чука\"",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 179,
    "weight": "170 г",
    "ingredients": "Салат «Чука», Кунжут, Соус «Горіховий»",
    "description_raw": "Вага: 170 г\nІнгредієнти:\nСалат «Чука», Кунжут, Соус «Горіховий»",
    "image": "https://img.postershop.me/21253/171b3629-3c9b-478e-83e8-964f63223d0e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7475411,
    "name": "Салат від Шефа",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "270 г",
    "ingredients": "Мікс «Салат», Огірок, Помідори, Куряча печінка, Філе куряче, Соус «Цезар»",
    "description_raw": "Вага: 270 г\nІнгредієнти:\nМікс «Салат», Огірок, Помідори, Куряча печінка, Філе куряче, Соус «Цезар»",
    "image": "https://img.postershop.me/21253/1a56847d-7e39-400e-8213-7301a1576096_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7475370,
    "name": "Салат \"Гриль з бринзою\"",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 209,
    "weight": "310 г",
    "ingredients": "Мікс «Салат», Баклажан, Кабачок, Помідори, Перець болгарський, Фета, Соус «Устричний»",
    "description_raw": "Вага: 310 г\nІнгредієнти:\nМікс «Салат», Баклажан, Кабачок, Помідори, Перець болгарський, Фета, Соус «Устричний»",
    "image": "https://img.postershop.me/21253/c15cb7b8-c8b1-4e52-852d-86c3791c587b_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475366,
    "name": "Цезар з Куркою",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 229,
    "weight": "250 г",
    "ingredients": "Мікс «Салат», Філе куряче, Томат Чері, Сир «Пармезан», Перепелині яйця, Соус «Цезар»",
    "description_raw": "Вага: 250 г\nІнгредієнти:\nМікс «Салат», Філе куряче, Томат Чері, Сир «Пармезан», Перепелині яйця, Соус «Цезар»",
    "image": "https://img.postershop.me/21253/70421775-acd2-4bba-95ee-439974e21d9f_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475365,
    "name": "Цезар з Морепродуктами",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 329,
    "weight": "250 г",
    "ingredients": "Мікс «Салат», Тигрова Креветка, Грав-Лакс, Перепелині яйця, Томат Чері, Сир «Пармезан», Соус «Цезар»",
    "description_raw": "Вага: 250 г\nІнгредієнти:\nМікс «Салат», Тигрова Креветка, Грав-Лакс, Перепелині яйця, Томат Чері, Сир «Пармезан», Соус «Цезар»",
    "image": "https://img.postershop.me/21253/6e954606-7fe0-4e15-b3d4-a88ca72b96ec_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475493,
    "name": "Салат з Лососем",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "180 г",
    "ingredients": "Мікс «Салат», Авокадо, Томат Чері, Грав-Лакс, Соус «Фірмовий»",
    "description_raw": "Вага: 180 г\nІнгредієнти:\nМікс «Салат», Авокадо, Томат Чері, Грав-Лакс, Соус «Фірмовий»",
    "image": "https://img.postershop.me/21253/d1393e26-497b-4859-b819-1ca0cb9501e0_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7475422,
    "name": "Салат з Морепродуктами",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 359,
    "weight": "250 г",
    "ingredients": "Мікс «Салат», Креветка Тигрова, Кальмари, Лосось, Мідії, Соус «Фірмовий»",
    "description_raw": "Вага: 250 г\nІнгредієнти:\nМікс «Салат», Креветка Тигрова, Кальмари, Лосось, Мідії, Соус «Фірмовий»",
    "image": "https://img.postershop.me/21253/cf264850-e068-4b3c-83a6-2df3a42e8375_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475403,
    "name": "Салат \"Буратта\"",
    "category_pos_id": 24,
    "category_name": "Салати",
    "category_url": "salati",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 549,
    "weight": "250 г",
    "ingredients": "Помідори, Цибуля Марс, Сир «Буратта»",
    "description_raw": "Вага: 250 г\nІнгредієнти:\nПомідори, Цибуля Марс, Сир «Буратта»",
    "image": "https://img.postershop.me/21253/9e36d88a-39d0-4c04-920f-14a0ab4858dd_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242339,
    "name": "Картопля Фрі",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 79,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/59500caf-3879-4dba-a8b0-366d94ee36ff_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242338,
    "name": "Картопля по Селянськи",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 79,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/6e8ff646-ee28-4955-848e-2bf5dad4ba7d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242336,
    "name": "Картопля Діпи",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 89,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/20ae58c7-9306-4441-b0e8-4ccb91b3caff_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242337,
    "name": "Картопля Діпи із сиром та беконом ",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 159,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/2dc69c95-087f-4092-b23c-e0a865389380_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242354,
    "name": "Нагетси",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 149,
    "weight": "",
    "ingredients": "8 шт",
    "description_raw": "8 шт",
    "image": "https://img.postershop.me/21253/4ced2cef-f082-42c3-8c76-ea93af7ba8eb_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242334,
    "name": "Камамбер Темпура",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 169,
    "weight": "",
    "ingredients": "6 шт",
    "description_raw": "6 шт",
    "image": "https://img.postershop.me/21253/e606796c-40fe-48c6-86a4-599a3d477e7a_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242344,
    "name": "Крильця Темпура",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "",
    "ingredients": "4 шт",
    "description_raw": "4 шт",
    "image": "https://img.postershop.me/21253/d4280e2a-4881-4d33-8fc0-a28280377d2d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242343,
    "name": "Креветка Темпура",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "",
    "ingredients": "6 шт",
    "description_raw": "6 шт",
    "image": "https://img.postershop.me/21253/856b032f-9536-46fe-85cb-527f0a4923cb_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242332,
    "name": "Кільця Кальмара",
    "category_pos_id": 8,
    "category_name": "Гарячі закуски",
    "category_url": "gariachi-zakuski",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/0e47d2e2-ca43-4a24-8fa8-c1f9d2c0a35a_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475553,
    "name": "Курка Чилі🌶️ ",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 149,
    "weight": "210 г",
    "ingredients": "Філе Куряче, Соуси: «Солодкий Чилі», «Устричний» та «Лимонний», Перець Чилі",
    "description_raw": "Вага: 210 г\nІнгредієнти:\nФіле Куряче, Соуси: «Солодкий Чилі», «Устричний» та «Лимонний», Перець Чилі",
    "image": "https://img.postershop.me/21253/747c9ec7-e0d2-4e24-8455-a79ba5c065dd_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475389,
    "name": "Пад-Тай🌶️ ",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "290 г",
    "ingredients": "Свинина, Перець болгарський, Цибулька, Соуси: «Сололкий Чилі» та «Шрі-Рача»",
    "description_raw": "Вага: 290 г\nІнгредієнти:\nСвинина, Перець болгарський, Цибулька, Соуси: «Сололкий Чилі» та «Шрі-Рача»",
    "image": "https://img.postershop.me/21253/214d90aa-6838-45a6-8568-59ef7b30114b_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475383,
    "name": "Креветки Чилі🌶️ ",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 339,
    "weight": "360 г",
    "ingredients": "Креветка Тигрова, Соуси: «Солодкий Чилі», «Устричний» та «Лимонний», Перець Чилі",
    "description_raw": "Вага: 360 г\nІнгредієнти:\nКреветка Тигрова, Соуси: «Солодкий Чилі», «Устричний» та «Лимонний», Перець Чилі",
    "image": "https://img.postershop.me/21253/2657386c-44a6-4ae6-b0e7-f8b48632d954_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475378,
    "name": "Мідії у вершковому соусі",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 399,
    "weight": "250 г",
    "ingredients": "Мідії в Мушлі, Соус «Альфредо», Сир «Пармезан»",
    "description_raw": "Вага: 250 г\nІнгредієнти:\nМідії в Мушлі, Соус «Альфредо», Сир «Пармезан»",
    "image": "https://img.postershop.me/21253/43975190-3667-452e-9ca4-0fe91877777f_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475439,
    "name": "Пательня з куркою",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 309,
    "weight": "560 г",
    "ingredients": "Філе Куряче, Картопля по-селянськи, Гриби Печериці, Перець болгарський, Баклажан, Кукурудза, Соус «Солодкий Чилі», Сир «Пармезан», Кранч",
    "description_raw": "Вага: 560 г\nІнгредієнти:\nФіле Куряче, Картопля по-селянськи, Гриби Печериці, Перець болгарський, Баклажан, Кукурудза, Соус «Солодкий Чилі», Сир «Пармезан», Кранч",
    "image": "https://img.postershop.me/21253/88c8c6df-16eb-4358-b5ac-48d45421bf65_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475450,
    "name": "Пательня зі свининою",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 329,
    "weight": "450 г",
    "ingredients": "Свинина, Картопля по-селянськи, Гриби Печериці, Перець болгарський, Баклажан, Кукурудза, Цибулька, Соуси: «Солодкий Чилі» та «Часниковий»",
    "description_raw": "Вага: 450 г\nІнгредієнти:\nСвинина, Картопля по-селянськи, Гриби Печериці, Перець болгарський, Баклажан, Кукурудза, Цибулька, Соуси: «Солодкий Чилі» та «Часниковий»",
    "image": "https://img.postershop.me/21253/e5bdcee4-5e6d-4779-b576-8453524c3faf_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475453,
    "name": "Пательня Жульєн",
    "category_pos_id": 25,
    "category_name": "Гарячі страви",
    "category_url": "garyaci-stravi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 349,
    "weight": "400 г",
    "ingredients": "Філе Куряче, Гриби: Печериці, Лисички та Білі, Сир «Моцарела» та «Пармезан»",
    "description_raw": "Вага: 400 г\nІнгредієнти:\nФіле Куряче, Гриби: Печериці, Лисички та Білі, Сир «Моцарела» та «Пармезан»",
    "image": "https://img.postershop.me/21253/e681d240-0302-4d20-965a-11fe2cd9113d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396869,
        "group_name": "Хліб (доп)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1592533,
            "name": "Бакалея: Хліб Чорний",
            "price": 20
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242397,
    "name": "Удон з куркою ",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "360 г",
    "ingredients": "• Локшина Удон\n• Куряче філе\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "description_raw": "Вага: 360 г\nІнгредієнти:\n• Локшина Удон\n• Куряче філе\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "image": "https://img.postershop.me/21253/6c1e30d1-fc37-4bdc-934c-f7b001c0d588_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242376,
    "name": "Соба з куркою ",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "350 г",
    "ingredients": "• Локшина Соба\n• Куряче філе\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "description_raw": "Вага: 350 г\nІнгредієнти:\n• Локшина Соба\n• Куряче філе\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "image": "https://img.postershop.me/21253/dfb64699-af11-4cf9-a514-5850679139b9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242396,
    "name": "Удон із свининою ",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 219,
    "weight": "360 г",
    "ingredients": "• Локшина Удон\n• Ніжна свинина\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "description_raw": "Вага: 360 г\nІнгредієнти:\n• Локшина Удон\n• Ніжна свинина\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "image": "https://img.postershop.me/21253/35f76092-0c46-4255-8d6b-d24f1eecd489_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242377,
    "name": "Соба з свининою ",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 219,
    "weight": "350 г",
    "ingredients": "• Локшина Соба\n• Ніжна свинина\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "description_raw": "Вага: 350 г\nІнгредієнти:\n• Локшина Соба\n• Ніжна свинина\n• Печериці\n• Спаржа\n• Болгарський перець\n• Морква\n• Цибуля\n• Соус Устричний, Кисло-солодкий та Соєвий",
    "image": "https://img.postershop.me/21253/3e76e954-13dd-4125-8bd5-cda4e18a9cab_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242398,
    "name": "Удон з морепродуктами ",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 329,
    "weight": "320 г",
    "ingredients": "• Локшина Удон\n• Тигрова креветка\n• Лосось\n• Мідії у мушлі\n• Печериці\n• Чері\n• Пармезан\n• Вершки",
    "description_raw": "Вага: 320 г\nІнгредієнти:\n• Локшина Удон\n• Тигрова креветка\n• Лосось\n• Мідії у мушлі\n• Печериці\n• Чері\n• Пармезан\n• Вершки",
    "image": "https://img.postershop.me/21253/2677aae7-6181-4b58-9a09-145ee40d14ad_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242410,
    "name": "Фетучіні",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 229,
    "weight": "300 г",
    "ingredients": "• Паста \"Фетучіні\"\n• Соус Альфредо\n• Курочка\n• Печериці\n• Чері\n• Сир Пармезан\n• Сіль та Перець",
    "description_raw": "Вага: 300 г\nІнгредієнти:\n• Паста \"Фетучіні\"\n• Соус Альфредо\n• Курочка\n• Печериці\n• Чері\n• Сир Пармезан\n• Сіль та Перець",
    "image": "https://img.postershop.me/21253/9163e4ba-ec51-4df2-ac74-35d508203e98_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242335,
    "name": "Карбонара",
    "category_pos_id": 15,
    "category_name": "Пасти",
    "category_url": "pasti-wok",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 239,
    "weight": "280 г",
    "ingredients": "• Паста \"Карбонара\"\n• Соус Альфредо\n• Бекончик\n• Бекон Грудинка\n• Яйце\n• Сіль та Перець",
    "description_raw": "Вага: 280 г\nІнгредієнти:\n• Паста \"Карбонара\"\n• Соус Альфредо\n• Бекончик\n• Бекон Грудинка\n• Яйце\n• Сіль та Перець",
    "image": "https://img.postershop.me/21253/27b7654d-3507-402a-899a-37d76772673d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242403,
    "name": "Філадельфія в кунжуті",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 289,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Форель, Кунжут",
    "description_raw": "8 шт | 340 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Форель, Кунжут",
    "image": "https://img.postershop.me/21253/fae3f710-d0d0-4f63-8e63-71a80a70b56e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242404,
    "name": "Філадельфія з авокадо",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 339,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Крем Сир, Форель",
    "description_raw": "8 шт | 360 грн\nІнгредієнти:\nРис, Норі, Авокадо, Крем Сир, Форель",
    "image": "https://img.postershop.me/21253/0e6c08bf-804d-4731-805e-3291458ebf7c_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": true
  },
  {
    "id": 7242408,
    "name": "Філадельфія з огірком ",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 339,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Форель",
    "description_raw": "8 шт | 360 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Форель",
    "image": "https://img.postershop.me/21253/4185f59b-0cca-4bb0-acc3-06f67fecb4ef_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242406,
    "name": "Філадельфія з креветкою ",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 279,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Креветка Тигрова",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Креветка Тигрова",
    "image": "https://img.postershop.me/21253/0bb1c0a6-4d5f-432b-8fdf-0122b4e17f11_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242405,
    "name": "Філадельфія з вугрем",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 319,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Вугор",
    "description_raw": "8 шт | 320 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Вугор",
    "image": "https://img.postershop.me/21253/baa78d46-ecc6-4ca6-bf1d-e7a9aff56a1a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242409,
    "name": "Філадельфія з тунцем",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Форель, Тунець",
    "description_raw": "8 шт | 360 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Форель, Тунець",
    "image": "https://img.postershop.me/21253/7d5837ec-fffb-477f-9a1c-ceef5a2ef727_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242407,
    "name": "Філадельфія з лососем",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Манго, Сир Дор-Блю, Форель",
    "description_raw": "8 шт | 370 г\nІнгредієнти:\nРис, Норі, Крем Сир, Манго, Сир Дор-Блю, Форель",
    "image": "https://img.postershop.me/21253/c3567438-d5b6-4bcf-ad9c-db54578c35c5_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242401,
    "name": "Філадельфія De Luxe",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 399,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Огірок, Крем Сир, Форель, Соус «Японський Майонез», Ікра Червона",
    "description_raw": "8 шт | 420 г\nІнгредієнти:\nРис, Норі, Авокадо, Огірок, Крем Сир, Форель, Соус «Японський Майонез», Ікра Червона",
    "image": "https://img.postershop.me/21253/44aea980-02f1-4487-b754-bfe6930ed8b8_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396387,
        "group_name": "З собою/Доставка (Холодний L)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590655,
            "name": "З Собою (Холодний рол L)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": true
  },
  {
    "id": 7242402,
    "name": "Філадельфія MIX",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 369,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Огірок, Крем Сир, Форель, Вугор, Соус «Унагі», Кранч, Сир «Пармезан»",
    "description_raw": "8 шт | 370 г\nІнгредієнти:\nРис, Норі, Авокадо, Огірок, Крем Сир, Форель, Вугор, Соус «Унагі», Кранч, Сир «Пармезан»",
    "image": "https://img.postershop.me/21253/9bda5f7a-ec24-4f25-8d03-a2fe71732418_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242327,
    "name": "Ебі Філадельфія",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 359,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Форель, Креветка Темпура",
    "description_raw": "8 шт | 370 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Форель, Креветка Темпура",
    "image": "https://img.postershop.me/21253/23a7dcb8-c6a4-4ad0-8618-46c5ffcfd09e_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7328583,
    "name": "Salmon Luxe",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 389,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Креветка Тигрова, Сир «Чедер», Форель, Тобіко Чорна",
    "description_raw": "8 шт | 410 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Креветка Тигрова, Сир «Чедер», Форель, Тобіко Чорна",
    "image": "https://img.postershop.me/21253/b4355320-a1b9-4308-859d-4414ec2a9d46_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7359444,
    "name": "Форель De Luxe",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 379,
    "weight": "",
    "ingredients": "Рис, Норі, Креветка Тигрова, Сніжний Краб, Форель, Соус «Спайсі», Паприка Чилі",
    "description_raw": "8 шт | 250 г\nІнгредієнти:\nРис, Норі, Креветка Тигрова, Сніжний Краб, Форель, Соус «Спайсі», Паприка Чилі",
    "image": "https://img.postershop.me/21253/7077bc48-31e1-4d0e-b32f-dbd4bedfca63_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396387,
        "group_name": "З собою/Доставка (Холодний L)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590655,
            "name": "З Собою (Холодний рол L)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242284,
    "name": "California",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 239,
    "weight": "",
    "ingredients": "Рис, Норі, Сніжний Краб, Огірок, Тобіко Червона, Соус «Японський Майонез»",
    "description_raw": "8 шт | 290 г\nІнгредієнти:\nРис, Норі, Сніжний Краб, Огірок, Тобіко Червона, Соус «Японський Майонез»",
    "image": "https://img.postershop.me/21253/837b3413-deed-4613-8e58-93c4c812e4fd_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242285,
    "name": "California De Luxe",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 259,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Форель, Сніжний Краб, Тобіко Червона та Чорна, Соус «Японський Майонез»",
    "description_raw": "8 шт | 290 г\nІнгредієнти:\nРис, Норі, Авокадо, Форель, Сніжний Краб, Тобіко Червона та Чорна, Соус «Японський Майонез»",
    "image": "https://img.postershop.me/21253/19ddd6b9-c6c1-49bf-8d5f-be8b6dc3a619_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242287,
    "name": "California Tuna",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 249,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Авокадо, Тунець, Тобіко Червона, Соус «Японський Майонез», Паприка Чилі",
    "description_raw": "8 шт | 270 г\nІнгредієнти:\nРис, Норі, Крем Сир, Авокадо, Тунець, Тобіко Червона, Соус «Японський Майонез», Паприка Чилі",
    "image": "https://img.postershop.me/21253/50120a0a-7e4b-40c1-8179-22efbbba8238_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242325,
    "name": "Ебі California",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Сніжний Краб, Креветка Темпура, Тобіко Червона, Соус «Унагі»",
    "description_raw": "8 шт | 350 г\nІнгредієнти:\nРис, Норі, Крем Сир, Сніжний Краб, Креветка Темпура, Тобіко Червона, Соус «Унагі»",
    "image": "https://img.postershop.me/21253/958abbf3-07e2-479b-9363-bcb1b9fc1e5a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242286,
    "name": "California Mix",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 339,
    "weight": "",
    "ingredients": "Рис, Норі, Форель, Сніжний Краб, Тобіко Червона, Стружка Тунця, Соус «Спайсі», Соус «Солодкий Чилі»",
    "description_raw": "8 шт | 350 г\nІнгредієнти:\nРис, Норі, Форель, Сніжний Краб, Тобіко Червона, Стружка Тунця, Соус «Спайсі», Соус «Солодкий Чилі»",
    "image": "https://img.postershop.me/21253/2f0382f7-2f70-47ed-8024-6e4d90705e51_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242288,
    "name": "California з Вугрем",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 289,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Вугор, Тобіко Чорна, Соус «Японський Майонез», Горілки Мигдальні",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Вугор, Тобіко Чорна, Соус «Японський Майонез», Горілки Мигдальні",
    "image": "https://img.postershop.me/21253/34336f5f-0c1d-48d1-a01f-9e4591b407ec_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242412,
    "name": "Футомакі Сяке ",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Форель, Тобіко Чорна, Соус «Спайсі»",
    "description_raw": "8 шт | 350 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Форель, Тобіко Чорна, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/5037c5a7-045b-4936-a1ba-e96706f862bb_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242319,
    "name": "Гурман",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 369,
    "weight": "",
    "ingredients": "Рис, Норі, Груша, Крем Сир, Вугор, Форель, Сир Дор-Блю, Соус «Спайсі»",
    "description_raw": "8 шт | 410 г\nІнгредієнти:\nРис, Норі, Груша, Крем Сир, Вугор, Форель, Сир Дор-Блю, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/8bc60a82-c78d-405c-92c9-78ac6763d896_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242413,
    "name": "Хамелеон",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Крем Сир, Креветка Тигрова, Сніжний Краб, Соус «Унагі», Соус «Спайсі»",
    "description_raw": "8 шт | 400 г\nІнгредієнти:\nРис, Норі, Авокадо, Крем Сир, Креветка Тигрова, Сніжний Краб, Соус «Унагі», Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/4d809e62-0703-45a0-a864-1afb1eb93175_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242289,
    "name": "Cheese Grill",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 269,
    "weight": "",
    "ingredients": "Рис, Норі, Груша, Крем Сир, Сир Дор-Блю, Сир «Чедер», Соус «Унагі», Кранч",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Груша, Крем Сир, Сир Дор-Блю, Сир «Чедер», Соус «Унагі», Кранч",
    "image": "https://img.postershop.me/21253/f21187c0-d124-4683-8a5d-b4ce5fd2a9b0_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242324,
    "name": "Дракон Унагі",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 419,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Вугор, Смажена Форель, Тобіко Чорна, Соус «Унагі», Кунжут",
    "description_raw": "8 шт | 390 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Вугор, Смажена Форель, Тобіко Чорна, Соус «Унагі», Кунжут",
    "image": "https://img.postershop.me/21253/9e54f263-15ef-4a9e-9bc3-ac75aed825cd_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7359451,
    "name": "Фуджі Рол",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 369,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Креветка Тигрова, Тобіко Червона, Вугор, Соус «Унагі», Кранч",
    "description_raw": "8 шт | 360 г\nІнгредієнти:\nРис, Норі, Крем Сир, Креветка Тигрова, Тобіко Червона, Вугор, Соус «Унагі», Кранч",
    "image": "https://img.postershop.me/21253/570023e4-c45e-4be4-964c-8464c91485bf_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242296,
    "name": "Fresh",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 279,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Огірок, Крем Сир, Форель, Вугор, Соус «Унагі», Кунжут",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Авокадо, Огірок, Крем Сир, Форель, Вугор, Соус «Унагі», Кунжут",
    "image": "https://img.postershop.me/21253/5f45667f-ef00-4140-8f68-b44bb6cb14d6_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242331,
    "name": "Зелений Самурай",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Крем Сир, Форель, Креветка Тигрова, Соус «Унагі», Кунжут",
    "description_raw": "8 шт | 310 г\nІнгредієнти:\nРис, Норі, Авокадо, Крем Сир, Форель, Креветка Тигрова, Соус «Унагі», Кунжут",
    "image": "https://img.postershop.me/21253/273b8978-7d7d-4ea3-93c1-58b5639c0305_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7359457,
    "name": "Green",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 279,
    "weight": "",
    "ingredients": "Рис, Норі, Форель, Тобіко Червона, Сніжний Краб, Авокадо, Соус «Унагі», Кунжут",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Форель, Тобіко Червона, Сніжний Краб, Авокадо, Соус «Унагі», Кунжут",
    "image": "https://img.postershop.me/21253/9ac6243d-68ea-41d7-b70d-16aa93772e3a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242279,
    "name": "Black Chef",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 289,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Форель, Креветка Темпура, Зелена Цибуля, Кунжут",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Крем Сир, Форель, Креветка Темпура, Зелена Цибуля, Кунжут",
    "image": "https://img.postershop.me/21253/d59fe4ef-8038-47d0-aaf8-f3b49a2af7a2_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242310,
    "name": "Авокадо MIX",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Авокадо, Огірок, Крем Сир, Сніжний Краб, Креветка Тигрова, Соуси: «Спайсі» та «Унагі», Кунжут, Кранч",
    "description_raw": "8 шт | 430 г\nІнгредієнти:\nРис, Норі, Авокадо, Огірок, Крем Сир, Сніжний Краб, Креветка Тигрова, Соуси: «Спайсі» та «Унагі», Кунжут, Кранч",
    "image": "https://img.postershop.me/21253/4f837c01-1853-4ad5-927b-a73dbf0fbe4a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242326,
    "name": "Ебі Ф`южен",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 249,
    "weight": "",
    "ingredients": "Рис, Норі, Креветка Темпура, Салат «Айсберг», Зелена Цибуля, Тобіко Чорна, Соус «Спайсі»",
    "description_raw": "8 шт | 290 г\nІнгредієнти:\nРис, Норі, Креветка Темпура, Салат «Айсберг», Зелена Цибуля, Тобіко Чорна, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/318096c6-816c-4c74-b758-e265d57edee1_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242292,
    "name": "Cold Tuna",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Авокадо, Креветка Тигрова, Тунець, Стружка Тунця, Соус «Солодкий Чилі»",
    "description_raw": "8 шт | 340 г\nІнгредієнти:\nРис, Норі, Крем Сир, Авокадо, Креветка Тигрова, Тунець, Стружка Тунця, Соус «Солодкий Чилі»",
    "image": "https://img.postershop.me/21253/be84c9f7-6571-4e2c-b752-3697e8891172_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242297,
    "name": "Garden ",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 229,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Креветка Темпура, Салат «Чука», Соус «Горіховий»",
    "description_raw": "8 шт | 360 г\nІнгредієнти:\nРис, Норі, Крем Сир, Креветка Темпура, Салат «Чука», Соус «Горіховий»",
    "image": "https://img.postershop.me/21253/03c483f5-c9c6-4763-b8e3-0080c0d9f4a0_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396302,
        "group_name": "З собою/Доставка (Холодні роли)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590328,
            "name": "З Собою (Холодний пакунок)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242308,
    "name": "Sweet Ebi",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 329,
    "weight": "",
    "ingredients": "Рис, Норі, Креветка Тигрова, Сніжний Краб, Крем Сир, Авокадо, Огірок, Соус «Солодкий Чилі», Кунжут",
    "description_raw": "8 шт | 430 г\nІнгредієнти:\nРис, Норі, Креветка Тигрова, Сніжний Краб, Крем Сир, Авокадо, Огірок, Соус «Солодкий Чилі», Кунжут",
    "image": "https://img.postershop.me/21253/bfe6f876-d5cb-4f23-b00d-c2cd11b31ddd_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396387,
        "group_name": "З собою/Доставка (Холодний L)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590655,
            "name": "З Собою (Холодний рол L)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7497718,
    "name": "Токіо",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Крем Сир, Стружка Тунця, Креветка Тигрова, Лосось, Соус \"Спайсі\"",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Огірок, Крем Сир, Стружка Тунця, Креветка Тигрова, Лосось, Соус \"Спайсі\"",
    "image": "https://img.postershop.me/21253/92e81323-28a6-4f61-9abc-7d12e5e9fd8a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396387,
        "group_name": "З собою/Доставка (Холодний L)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590655,
            "name": "З Собою (Холодний рол L)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242304,
    "name": "Salmon Roll",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 269,
    "weight": "",
    "ingredients": "Норі, Крем Сир, Форель, Огірок, Креветка Тигрова",
    "description_raw": "6 шт | 190 г\nІнгредієнти:\nНорі, Крем Сир, Форель, Огірок, Креветка Тигрова",
    "image": "https://img.postershop.me/21253/0e83da06-7fd4-40f1-bde9-f523362ac42c_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242348,
    "name": "Макі з огірком",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 99,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок",
    "description_raw": "6 шт | 130 г\nІнгредієнти:\nРис, Норі, Огірок",
    "image": "https://img.postershop.me/21253/418f4a12-9738-4988-b767-781a562f179e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242350,
    "name": "Макі Філадельфія ",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 109,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир",
    "description_raw": "6 шт | 150 г\nІнгредієнти:\nРис, Норі, Крем Сир",
    "image": "https://img.postershop.me/21253/15f680ec-fcf1-4464-b113-a4faef55a70c_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242400,
    "name": "Унагі-Макі",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 219,
    "weight": "",
    "ingredients": "Рис, Норі, Вугор, Соус \"Унагі\", Кунжут",
    "description_raw": "6 шт | 160 г\nІнгредієнти:\nРис, Норі, Вугор, Соус \"Унагі\", Кунжут",
    "image": "https://img.postershop.me/21253/8bf8e3fe-9cc8-4b72-85b8-3576749f0ac9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242394,
    "name": "Сяке-Макі",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 199,
    "weight": "",
    "ingredients": "Рис, Норі, Форель",
    "description_raw": "6 шт | 150 г\nІнгредієнти:\nРис, Норі, Форель",
    "image": "https://img.postershop.me/21253/29054be3-5d8f-4d20-a6c1-d7dc6c648268_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242349,
    "name": "Макі з сніжним крабом ",
    "category_pos_id": 4,
    "category_name": "Холодні роли",
    "category_url": "xolodni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 119,
    "weight": "",
    "ingredients": "Рис, Норі, Сніжний Краб",
    "description_raw": "6 шт | 160 г\nІнгредієнти:\nРис, Норі, Сніжний Краб",
    "image": "https://img.postershop.me/21253/7c1d1542-948c-4253-85e2-7601682ac10e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7445489,
    "name": "Інарі з Лососем",
    "category_pos_id": 22,
    "category_name": "Інарі Меню",
    "category_url": "inari-menyu",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 109,
    "weight": "",
    "ingredients": "• Сир Тофу\n• Рис\n• Форель\n• Соус Спайсі та Кранч",
    "description_raw": "1 шт | 70 г\nІнгредієнти:\n• Сир Тофу\n• Рис\n• Форель\n• Соус Спайсі та Кранч",
    "image": "https://img.postershop.me/21253/f9506f8c-3f5f-4664-ba23-857be680e373_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7445490,
    "name": "Інарі з Тунцем",
    "category_pos_id": 22,
    "category_name": "Інарі Меню",
    "category_url": "inari-menyu",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 119,
    "weight": "",
    "ingredients": "• Сир Тофу\n• Рис\n• Тунець\n• Соус Унагі та Паприка Чилі",
    "description_raw": "1 шт | 70 г\nІнгредієнти:\n• Сир Тофу\n• Рис\n• Тунець\n• Соус Унагі та Паприка Чилі",
    "image": "https://img.postershop.me/21253/92917d87-fad3-4ef5-b6b7-7a5293141df9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7445491,
    "name": "Інарі з Вугрем",
    "category_pos_id": 22,
    "category_name": "Інарі Меню",
    "category_url": "inari-menyu",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 129,
    "weight": "",
    "ingredients": "• Сир Тофу\n• Рис\n• Вугор\n• Соус Унагі та Тобіко Чорна",
    "description_raw": "1 шт | 70 г\nІнгредієнти:\n• Сир Тофу\n• Рис\n• Вугор\n• Соус Унагі та Тобіко Чорна",
    "image": "https://img.postershop.me/21253/d8c12df2-e10c-407e-9efa-d82a24812ad6_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7445492,
    "name": "Інарі із Сніжним крабом",
    "category_pos_id": 22,
    "category_name": "Інарі Меню",
    "category_url": "inari-menyu",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 99,
    "weight": "",
    "ingredients": "• Сир Тофу\n• Рис\n• Сніжний Краб\n• Креветка Тигрова\n• Соус Спайсі",
    "description_raw": "1 шт | 70 г\nІнгредієнти:\n• Сир Тофу\n• Рис\n• Сніжний Краб\n• Креветка Тигрова\n• Соус Спайсі",
    "image": "https://img.postershop.me/21253/a929d629-2a64-43b2-a631-f1bc8a9ab4a5_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7445494,
    "name": "Інарі MIX",
    "category_pos_id": 22,
    "category_name": "Інарі Меню",
    "category_url": "inari-menyu",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 109,
    "weight": "",
    "ingredients": "• Сир Тофу\n• Рис\n• Форель\n• Креветка Тигрова\n• Соус Спайсі",
    "description_raw": "1 шт | 70 г\nІнгредієнти:\n• Сир Тофу\n• Рис\n• Форель\n• Креветка Тигрова\n• Соус Спайсі",
    "image": "https://img.postershop.me/21253/ceab1a10-5911-49de-af49-2403ed95f171_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242280,
    "name": "Поке з Креветкою",
    "category_pos_id": 20,
    "category_name": "Поке",
    "category_url": "bowl",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 339,
    "weight": "330 г",
    "ingredients": "• Рис\n• Чері\n• Авокадо\n• Зелені боби\n• Креветка Тигрова\n• Крем Сир Cremette",
    "description_raw": "Вага: 330 г\nІнгредієнти:\n• Рис\n• Чері\n• Авокадо\n• Зелені боби\n• Креветка Тигрова\n• Крем Сир Cremette",
    "image": "https://img.postershop.me/21253/9bbd941f-b017-4fdc-8cee-088600f7ad8a_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242282,
    "name": "Поке з Тунцем",
    "category_pos_id": 20,
    "category_name": "Поке",
    "category_url": "bowl",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "355 г",
    "ingredients": "• Рис\n• Огірок\n• Авокадо\n• Зелені боби\n• Преміальний Тунець\n• Крем Сир Cremette",
    "description_raw": "Вага: 355 г\nІнгредієнти:\n• Рис\n• Огірок\n• Авокадо\n• Зелені боби\n• Преміальний Тунець\n• Крем Сир Cremette",
    "image": "https://img.postershop.me/21253/c2f6d29b-a3f6-467f-9969-09d78b6abd31_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242281,
    "name": "Поке з Лососем",
    "category_pos_id": 20,
    "category_name": "Поке",
    "category_url": "bowl",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 369,
    "weight": "350 г",
    "ingredients": "• Рис\n• Огірок\n• Авокадо\n• Зелені боби\n• Преміальна Форель\n• Крем Сир Cremette",
    "description_raw": "Вага: 350 г\nІнгредієнти:\n• Рис\n• Огірок\n• Авокадо\n• Зелені боби\n• Преміальна Форель\n• Крем Сир Cremette",
    "image": "https://img.postershop.me/21253/ac1763ea-ba72-4bdd-9443-6229a4b11008_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396408,
        "group_name": "З собою/Доставка (500 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590707,
            "name": "З Собою (500 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242384,
    "name": "Суші Cake з Фореллю",
    "category_pos_id": 21,
    "category_name": "Суші Cake Передзамовлення",
    "category_url": "susi-cake-peredzamovlennya",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1599,
    "weight": "1600 г",
    "ingredients": "",
    "description_raw": "Увага! Суші Cake із Фореллю можна замовити тільки по перед-замовленні.\nВага: 1600 г\nІнгредіенти:\n• Рис\n• Норі\n• Крем Сир Cremette\n• Преміальна Форель\n• Огірок та Авокадо\n• Тигрова Креветка\n• Ікра Червона",
    "image": "https://img.postershop.me/21253/71c1b5ba-a7ee-49ce-acc9-655e9a4569b9_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242383,
    "name": "Суші Cake з Креветкою",
    "category_pos_id": 21,
    "category_name": "Суші Cake Передзамовлення",
    "category_url": "susi-cake-peredzamovlennya",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1599,
    "weight": "1600 г",
    "ingredients": "",
    "description_raw": "Увага! Суші Cake із Креветкою можна замовити тільки по перед-замовленні.\nВага: 1600 г\nІнгредіенти:\n• Рис\n• Норі\n• Крем Сир Cremette\n• Преміальна Форель\n• Сніжний Краб\n• Огірок та Авокадо\n• Тобіка Червона та Чорна\n• Тигрова Креветка",
    "image": "https://img.postershop.me/21253/1f6c1073-acb3-480e-8a3a-caaa8aada79a_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242345,
    "name": "Лотос",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 249,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Авокадо, Огірок, Форель, Соус «Унагі», Кунжут",
    "description_raw": "8 шт | 370 г\nІнгредієнти:\nРис, Норі, Крем Сир, Авокадо, Огірок, Форель, Соус «Унагі», Кунжут",
    "image": "https://img.postershop.me/21253/2e342924-cc71-4e86-ab2d-bcaba7f4861a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242303,
    "name": "Sakura",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 259,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Авокадо, Огірок, Сніжний Краб, Тобіко Червона, Соус «Спайсі»",
    "description_raw": "8 шт | 410 г\nІнгредієнти:\nРис, Норі, Крем Сир, Авокадо, Огірок, Сніжний Краб, Тобіко Червона, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/10de9039-6cd2-4b28-9671-307fb44bb330_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242399,
    "name": "Унагі Темпура ",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 289,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Вугор, Соус «Унагі», Кранч",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Вугор, Соус «Унагі», Кранч",
    "image": "https://img.postershop.me/21253/6a6d0473-06b1-47b5-a984-01e54477dee9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242305,
    "name": "Smile Roll",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 289,
    "weight": "",
    "ingredients": "Рис, Норі, Огірок, Форель, Сніжний Краб, Соус «Унагі»",
    "description_raw": "8 шт | 270 г\nІнгредієнти:\nРис, Норі, Огірок, Форель, Сніжний Краб, Соус «Унагі»",
    "image": "https://img.postershop.me/21253/765ccb73-e553-42a8-b842-fbd9aff5b1c1_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242312,
    "name": "Банзай",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Форель, Вугор, Огірок, Соус «Унагі», Соус «Спайсі»",
    "description_raw": "8 шт | 350 г\nІнгредієнти:\nРис, Норі, Крем Сир, Форель, Вугор, Огірок, Соус «Унагі», Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/32c49c45-b3bd-48ba-8d74-d11000dd949f_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242375,
    "name": "Смажений Хаус ",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 319,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Смажена Форель, Помідори, Зелена Цибуля, Соус «Унагі»",
    "description_raw": "8 шт | 340 г\nІнгредієнти:\nРис, Норі, Крем Сир, Смажена Форель, Помідори, Зелена Цибуля, Соус «Унагі»",
    "image": "https://img.postershop.me/21253/93b9560d-13bd-43a5-92ba-25457d2dbf56_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242328,
    "name": "Ебі-Темпура",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 329,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Зелена Цибуля, Креветка Тигрова, Соус «Солодкий Чилі»",
    "description_raw": "8 шт | 310 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Зелена Цибуля, Креветка Тигрова, Соус «Солодкий Чилі»",
    "image": "https://img.postershop.me/21253/4c9b74b0-5e0b-47a1-b69a-01ee7945c00a_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242395,
    "name": "Сяке-Спайсі",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Форель, Соус «Спайсі»",
    "description_raw": "8 шт | 400 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Форель, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/5f3b9439-6dd6-4fd6-9a07-a33e6c3a5eba_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242301,
    "name": "Rainbow Mix",
    "category_pos_id": 5,
    "category_name": "Гарячі роли",
    "category_url": "garyaci-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 379,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Тунець, Форель, Соус «Солодкий Чилі», Соус «Спайсі»",
    "description_raw": "8 шт | 400 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Тунець, Форель, Соус «Солодкий Чилі», Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/c95222b3-8568-4ade-bf9c-444c676207fe_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242307,
    "name": "Surimi Roll",
    "category_pos_id": 7,
    "category_name": "Запечені роли",
    "category_url": "zapeceni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 279,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Сніжний Краб, Сир «Пармезан», Соуси: «Спайсі», «Японський Майонез», «Унагі»",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Крем Сир, Сніжний Краб, Сир «Пармезан», Соуси: «Спайсі», «Японський Майонез», «Унагі»",
    "image": "https://img.postershop.me/21253/3709c9cb-7035-42e3-96fe-dfb932cb65d5_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242290,
    "name": "Cheese Roll",
    "category_pos_id": 7,
    "category_name": "Запечені роли",
    "category_url": "zapeceni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 289,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Сир «Пармезан», Сир «Чедер», Сир Дор-Блю, Соус «Спайсі»",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Сир «Пармезан», Сир «Чедер», Сир Дор-Блю, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/d9f79d43-c963-4402-aa62-31dd60760c4b_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242309,
    "name": "Volcano Roll",
    "category_pos_id": 7,
    "category_name": "Запечені роли",
    "category_url": "zapeceni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Креветка Тигрова, Сир «Пармезан», Соуси: «Спайсі» та «Японський Майонез»",
    "description_raw": "8 шт | 360 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Креветка Тигрова, Сир «Пармезан», Соуси: «Спайсі» та «Японський Майонез»",
    "image": "https://img.postershop.me/21253/abbdd248-903a-4002-bd20-af36a7146bb6_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242306,
    "name": "Sunny Roll",
    "category_pos_id": 7,
    "category_name": "Запечені роли",
    "category_url": "zapeceni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Вугор, Сир «Пармезан», Соуси: «Спайсі», «Японський Майонез» та «Унагі»",
    "description_raw": "8 шт | 340 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Вугор, Сир «Пармезан», Соуси: «Спайсі», «Японський Майонез» та «Унагі»",
    "image": "https://img.postershop.me/21253/87dcfe92-3e87-4d98-ab5c-fd5fc96bb222_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242302,
    "name": "Red Roll",
    "category_pos_id": 7,
    "category_name": "Запечені роли",
    "category_url": "zapeceni-roli",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Форель, Сир «Пармезан», Соуси: «Спайсі» та «Японський Майонез»",
    "description_raw": "8 шт | 330 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Форель, Сир «Пармезан», Соуси: «Спайсі» та «Японський Майонез»",
    "image": "https://img.postershop.me/21253/8a5e8f59-414a-4e7b-83c0-92e439ac1f6f_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7502002,
    "name": "Сет \"Гункан MIX\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "4 шт | 250 г\n• Гункан Сяке\n• Гункан Унагі\n• Гункан Ніжний Лосось\n• Гункан Тунець",
    "description_raw": "4 шт | 250 г\n• Гункан Сяке\n• Гункан Унагі\n• Гункан Ніжний Лосось\n• Гункан Тунець",
    "image": "https://img.postershop.me/21253/38b1bbc4-416c-4804-9f63-5f640528e72a_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396386,
        "group_name": "З собою/Доставка (Холодний М)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590654,
            "name": "З Собою (Холодний рол М)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242370,
    "name": "Сет \"Макі\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 549,
    "weight": "",
    "ingredients": "24 шт | 600 г\n• Макі з огірком\n• Макі Філадельфія\n• Унагі-Макі\n• Сяке-Макі",
    "description_raw": "24 шт | 600 г\n• Макі з огірком\n• Макі Філадельфія\n• Унагі-Макі\n• Сяке-Макі",
    "image": "https://img.postershop.me/21253/ad00ed5b-a09d-4ed4-aa67-1b5e04c7e6e1_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396443,
        "group_name": "З собою/Доставка (Сет Макі)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590790,
            "name": "З собою (Сет Макі)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242363,
    "name": "Сет \"Duo Банзай - Унагі Темпура\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 549,
    "weight": "",
    "ingredients": "16 шт | 670 г\n• Банзай\n• Унагі - Темпура",
    "description_raw": "16 шт | 670 г\n• Банзай\n• Унагі - Темпура",
    "image": "https://img.postershop.me/21253/704b4d1c-68a7-4371-943e-58f8ab7e4656_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396413,
        "group_name": "З собою/Доставка (Duo Гарячі)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590712,
            "name": "З Собою (DUO Гарячі)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242365,
    "name": "Сет \"Duo Філадельфія-California\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 569,
    "weight": "",
    "ingredients": "16 шт | 675 г\n• Філадельфія з огірком\n• California",
    "description_raw": "16 шт | 675 г\n• Філадельфія з огірком\n• California",
    "image": "https://img.postershop.me/21253/1991296d-5026-4a91-b048-ef8918420503_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396412,
        "group_name": "З собою/Доставка (Duo Холодні)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590711,
            "name": "З Собою (DUO Холодні)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242362,
    "name": "Сет \"Duo California\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 589,
    "weight": "",
    "ingredients": "16 шт | 685 г\n• California MIX\n• California з Вугрем",
    "description_raw": "16 шт | 685 г\n• California MIX\n• California з Вугрем",
    "image": "https://img.postershop.me/21253/cc05a65d-b760-4f19-ae27-3eaa8cfc3314_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396412,
        "group_name": "З собою/Доставка (Duo Холодні)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590711,
            "name": "З Собою (DUO Холодні)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242364,
    "name": "Сет \"Duo Ебі-Філадельфія MIX\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 659,
    "weight": "",
    "ingredients": "16 шт | 765 г\n• Філадельфія MIX\n• Ебі-Темпура",
    "description_raw": "16 шт | 765 г\n• Філадельфія MIX\n• Ебі-Темпура",
    "image": "https://img.postershop.me/21253/d1874248-dcc8-4f35-8eb7-002f7c14dc27_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396414,
        "group_name": "З собою/Доставка (Duo)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590713,
            "name": "З Собою (DUO)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242371,
    "name": "Сет \"На Двох\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 799,
    "weight": "",
    "ingredients": "24 шт | 1000 г\n• Cheese Roll\n• Філадельфія в кунжуті\n• Fresh",
    "description_raw": "24 шт | 1000 г\n• Cheese Roll\n• Філадельфія в кунжуті\n• Fresh",
    "image": "https://img.postershop.me/21253/4b7befdc-698f-4967-a860-bcb94c36f387_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396444,
        "group_name": "З собою/Доставка (Сет На Двох)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590791,
            "name": "З собою (Сет На Двох)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242372,
    "name": "Сет \"Філадельфія\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 899,
    "weight": "",
    "ingredients": "24 шт | 1060 г\n• Філадельфія з огірком\n• Філадельфія з авокадо\n• Філадельфія в кунжуті",
    "description_raw": "24 шт | 1060 г\n• Філадельфія з огірком\n• Філадельфія з авокадо\n• Філадельфія в кунжуті",
    "image": "https://img.postershop.me/21253/f86395bb-be61-4d8b-9bef-97771385111b_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396445,
        "group_name": "З собою/Доставка (Сет Філадельфія)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590792,
            "name": "З собою (Сет Філадельфія)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": true
  },
  {
    "id": 7242369,
    "name": "Сет \"Запечений\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 989,
    "weight": "",
    "ingredients": "24 шт | 1055 г\n• Sunny Roll\n• Volcano Roll\n• Red Roll",
    "description_raw": "24 шт | 1055 г\n• Sunny Roll\n• Volcano Roll\n• Red Roll",
    "image": "https://img.postershop.me/21253/ccbafa42-fad6-4161-a74e-7c6145fe9ee2_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396442,
        "group_name": "З собою/Доставка (Сет Запечений)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590785,
            "name": "З собою (Сет Запечений)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242360,
    "name": "Сет \"California\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 999,
    "weight": "",
    "ingredients": "32 шт | 1265 г\n• California\n• California Tuna\n• California з Вугрем\n• Ебі-California",
    "description_raw": "32 шт | 1265 г\n• California\n• California Tuna\n• California з Вугрем\n• Ебі-California",
    "image": "https://img.postershop.me/21253/3bec50f3-c661-456b-97db-4bfb7e30878e_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396410,
        "group_name": "З собою/Доставка (Сетовий набір)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590709,
            "name": "З Собою (Сет)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475961,
    "name": "Сет \"Дуєт\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1129,
    "weight": "",
    "ingredients": "32 шт | 1400 г\n• Філадельфія з авокадо\n• Black Chef\n• Лотос\n• Ебі-Темпура",
    "description_raw": "32 шт | 1400 г\n• Філадельфія з авокадо\n• Black Chef\n• Лотос\n• Ебі-Темпура",
    "image": "https://img.postershop.me/21253/190d7d3b-ead3-4493-843e-e72a3c107f00_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396416,
        "group_name": "З собою/Доставка (Сет Холодні та Гарячі)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590716,
            "name": "З Собою (Холодні та гарячі)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242368,
    "name": "Сет \"Гарячий\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1199,
    "weight": "",
    "ingredients": "32 шт | 1460 г\n• Смажений Хаос\n• Sakura\n• Volcano Roll\n• Sunny Roll",
    "description_raw": "32 шт | 1460 г\n• Смажений Хаос\n• Sakura\n• Volcano Roll\n• Sunny Roll",
    "image": "https://img.postershop.me/21253/5647d0bb-d835-41cc-a2a2-79be367edf70_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396417,
        "group_name": "З собою/Доставка (Сет Гарячий)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590720,
            "name": "З собою (Сет Гарячий)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242367,
    "name": "Сет \"VIP\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1229,
    "weight": "",
    "ingredients": "32 шт | 1400 г\n• California De Luxe\n• Філадельфія MIX\n• Ебі-Темпура\n• Red Roll",
    "description_raw": "32 шт | 1400 г\n• California De Luxe\n• Філадельфія MIX\n• Ебі-Темпура\n• Red Roll",
    "image": "https://img.postershop.me/21253/68e8bc7c-c12b-4464-89ee-dc7c7455c7b0_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396416,
        "group_name": "З собою/Доставка (Сет Холодні та Гарячі)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590716,
            "name": "З Собою (Холодні та гарячі)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7262793,
    "name": "Сет \"Святковий\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1399,
    "weight": "",
    "ingredients": "38 шт | 1700 гр\n• Red Tuna\n• Rich Roll\n• Soft Tuna\n• Snow Roll\n• Unagi Roll",
    "description_raw": "38 шт | 1700 гр\n• Red Tuna\n• Rich Roll\n• Soft Tuna\n• Snow Roll\n• Unagi Roll",
    "image": "https://img.postershop.me/21253/9398fc76-6ad7-462a-83a6-2fb499d60938_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396410,
        "group_name": "З собою/Доставка (Сетовий набір)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590709,
            "name": "З Собою (Сет)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242366,
    "name": "Сет \"Luxe Філадельфія\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1469,
    "weight": "",
    "ingredients": "40 шт | 1750 г\n﻿• Філадельфія з креветкою\n• Філадельфія з вугрем\n• Філадельфія з лососем\n• Філадельфія з тунцем\n• Ебі Філадельфія",
    "description_raw": "40 шт | 1750 г\n﻿• Філадельфія з креветкою\n• Філадельфія з вугрем\n• Філадельфія з лососем\n• Філадельфія з тунцем\n• Ебі Філадельфія",
    "image": "https://img.postershop.me/21253/db096507-f0aa-4e68-b214-f7d96478e9c5_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396410,
        "group_name": "З собою/Доставка (Сетовий набір)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590709,
            "name": "З Собою (Сет)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242361,
    "name": "Сет \"Crab Club\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1899,
    "weight": "",
    "ingredients": "56 шт | 2450 г\nХолодні:\n• California\n• Cheese Grill\n• Футомакі Сяке\n• Хамелеон\n• Філадельфія з огірком\nГарячі:\n• Volcano Roll\n• Sakura",
    "description_raw": "56 шт | 2450 г\nХолодні:\n• California\n• Cheese Grill\n• Футомакі Сяке\n• Хамелеон\n• Філадельфія з огірком\nГарячі:\n• Volcano Roll\n• Sakura",
    "image": "https://img.postershop.me/21253/7472b410-3465-4239-9f04-4c7922c8b0f3_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396411,
        "group_name": "З собою/Доставка (Crab Club)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590710,
            "name": "З Собою ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242359,
    "name": "Сет \"Big Boss\"",
    "category_pos_id": 6,
    "category_name": "Сетові пропозції",
    "category_url": "seti",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 2299,
    "weight": "",
    "ingredients": "70 шт | 2900 г\n﻿Запечені:\n• Sunny Roll\n• Surimi Roll\nГарячі:\n• Sakura\n• Лотос\nХолодні:\n•Ебі Ф'южен\n•Сяке-Макі\n•Філадельфія з огірком\n•Cheese Grill\n•Black Chef",
    "description_raw": "70 шт | 2900 г\n﻿Запечені:\n• Sunny Roll\n• Surimi Roll\nГарячі:\n• Sakura\n• Лотос\nХолодні:\n•Ебі Ф'южен\n•Сяке-Макі\n•Філадельфія з огірком\n•Cheese Grill\n•Black Chef",
    "image": "https://img.postershop.me/21253/a9034845-3006-4b5d-b64c-11a9c696c0be_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396409,
        "group_name": "З собою/Доставка (Big Boss)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590708,
            "name": "З Собою (Сет Big Boss)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242392,
    "name": "Суші Піца з креветкою",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 259,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Сніжний Краб, Креветка Тигрова, Соуси: «Спайсі» та «Унагі», Кранч",
    "description_raw": "1 шт | 320 г\nІнгредієнти:\nРис, Норі, Крем Сир, Сніжний Краб, Креветка Тигрова, Соуси: «Спайсі» та «Унагі», Кранч",
    "image": "https://img.postershop.me/21253/bf66f06e-329a-4bda-9b31-6d7559c0be57_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242393,
    "name": "Суші Піца з Фореллю",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 269,
    "weight": "",
    "ingredients": "1 шт | 260 г\nІнгредієнти.\nРис, Норі, Крем Сир, Форель, Тобіко Чорна, Соуси: «Спайсі» та «Унагі», Парика Чилі",
    "description_raw": "1 шт | 260 г\nІнгредієнти.\nРис, Норі, Крем Сир, Форель, Тобіко Чорна, Соуси: «Спайсі» та «Унагі», Парика Чилі",
    "image": "https://img.postershop.me/21253/66720f6f-1b9e-42f0-85aa-8ed888b58d86_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396407,
        "group_name": "З собою/Доставка (Гарячий пакунок)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590706,
            "name": "З Собою (Гарячий пакунок) ",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242391,
    "name": "Суші Піца Mix",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 1199,
    "weight": "",
    "ingredients": "Суші Піца з креветкою - 3 порції\nСуші Піца з фореллю - 3 порції",
    "description_raw": "6 шт | 1900 г\nІнгредієнти:\nСуші Піца з креветкою - 3 порції\nСуші Піца з фореллю - 3 порції",
    "image": "https://img.postershop.me/21253/a0e7bafe-7d9c-42cf-b85c-13896df84b68_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242357,
    "name": "Рол-Дог з креветкою ",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 299,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Креветка Темпура, Сніжний Краб, Зелена Цибуля, Соуси: «Спайсі» та «Унагі»",
    "description_raw": "1 шт | 410 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Креветка Темпура, Сніжний Краб, Зелена Цибуля, Соуси: «Спайсі» та «Унагі»",
    "image": "https://img.postershop.me/21253/2750ffe5-6551-419a-9182-224c08880cea_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242358,
    "name": "Рол-Дог з лососем ",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 329,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Форель, Тобіко Чорна, Соуси: «Спайсі» та «Унагі», Кранч",
    "description_raw": "1 шт | 380 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Форель, Тобіко Чорна, Соуси: «Спайсі» та «Унагі», Кранч",
    "image": "https://img.postershop.me/21253/1b987a8e-1d0d-46e3-9867-060650aad9f8_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7379863,
    "name": "Рол-Дог з тунцем",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 339,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Авокадо, Манго, Тунець, Тобіко Чорна, Соуси: «Спайсі» та «Унагі»",
    "description_raw": "1 шт | 320 г\nІнгредієнти:\nРис, Норі, Крем Сир, Авокадо, Манго, Тунець, Тобіко Чорна, Соуси: «Спайсі» та «Унагі»",
    "image": "https://img.postershop.me/21253/151c6992-f643-49b4-ad62-2460c9297ba5_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396446,
        "group_name": "З собою/Доставка (Фол. 100)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590793,
            "name": "З собою (Фольга 100 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242388,
    "name": "Суші Бургер з Креветкою ",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 349,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Креветка Темпура, Сніжний Краб, Зелена Цибуля, Соус «Спайсі»",
    "description_raw": "1 шт | 490 г\nІнгредієнти:\nРис, Норі, Крем Сир, Креветка Темпура, Сніжний Краб, Зелена Цибуля, Соус «Спайсі»",
    "image": "https://img.postershop.me/21253/d1acef19-6a1e-4b4a-ba40-b698195fb8b5_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242390,
    "name": "Суші Бургер з Тунцем",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 369,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Тобіко Чорна, Тунець, Соуси: «Спайсі» та «Унагі»",
    "description_raw": "1 шт | 500 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Тобіко Чорна, Тунець, Соуси: «Спайсі» та «Унагі»",
    "image": "https://img.postershop.me/21253/a4d79fb5-b760-4b7a-8093-c44a70b5c139_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242389,
    "name": "Суші Бургер з Лососем",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 369,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Авокадо, Форель, Тобіко Чорна, Соуси: «Спайсі» та «Унагі»",
    "description_raw": "1 шт | 510 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Авокадо, Форель, Тобіко Чорна, Соуси: «Спайсі» та «Унагі»",
    "image": "https://img.postershop.me/21253/c2ea3c45-a0f5-4623-a7ef-7997be7976c9_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": true,
    "chef_choice": false
  },
  {
    "id": 7242387,
    "name": "Суші Бургер з Вугрем",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 419,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Авокадо, Салат «Чука», Сир «Чедер», Вугор, Соус «Унагі», Кунжут",
    "description_raw": "1 шт | 530 г\nІнгредієнти:\nРис, Норі, Крем Сир, Авокадо, Салат «Чука», Сир «Чедер», Вугор, Соус «Унагі», Кунжут",
    "image": "https://img.postershop.me/21253/327d1926-4eee-408e-b3c1-f1104d2bb376_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242386,
    "name": "Суші Бургер MIX",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 419,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Форель, Креветка Тигрова, Тобіко Червона, Соус «Спайсі», Кранч",
    "description_raw": "1 шт | 550 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Форель, Креветка Тигрова, Тобіко Червона, Соус «Спайсі», Кранч",
    "image": "https://img.postershop.me/21253/12bf3c63-4874-49ee-a635-e3c0596bfa41_image.png",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242385,
    "name": "Суші Бургер Double Mix",
    "category_pos_id": 11,
    "category_name": "Суші: Fast Food",
    "category_url": "susi-fast-food",
    "parent_category_id": 27,
    "parent_category_name": "Меню: Роли",
    "parent_category_url": "menyu-roli",
    "price": 429,
    "weight": "",
    "ingredients": "Рис, Норі, Крем Сир, Огірок, Авокадо, Креветка Темпура, Форель, Тобіко Червона, Соус «Спайсі», Кранч",
    "description_raw": "1 шт | 540 г\nІнгредієнти:\nРис, Норі, Крем Сир, Огірок, Авокадо, Креветка Темпура, Форель, Тобіко Червона, Соус «Спайсі», Кранч",
    "image": "https://img.postershop.me/21253/9013f558-ac0d-4fa5-a5f4-4b6e096f680b_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377671,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521617,
            "name": "Соус \"Горіховий\"",
            "price": 15
          },
          {
            "id": 1521618,
            "name": "Соус \"Спайсі\"",
            "price": 15
          },
          {
            "id": 1521619,
            "name": "Соус \"Унагі\"",
            "price": 15
          },
          {
            "id": 1521620,
            "name": "Прибор до Ролу",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396447,
        "group_name": "З собою/Доставка (750 мл)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590794,
            "name": "З Собою (750 мл)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242293,
    "name": "Crab Club",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 469,
    "weight": "820 г",
    "ingredients": "• Соус Цезар\n• Моцарелла\n• Сирний борт\n• Лосось\n• Кальмари\n• Тигрова креветка\n• Чері\n• Пармезан",
    "description_raw": "Вага: 820 г\nІнгредієнти:\n• Соус Цезар\n• Моцарелла\n• Сирний борт\n• Лосось\n• Кальмари\n• Тигрова креветка\n• Чері\n• Пармезан",
    "image": "https://img.postershop.me/21253/de82d03d-cbe4-4a3d-904b-3e319df689cc_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": true
  },
  {
    "id": 7242278,
    "name": "4 Сира",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "490 г",
    "ingredients": "Ніжне поєднання 4 видів сирів:\n• Соус Альфредо\n• Моцарелла\n• Сир Дор-Блю\n• Пармезан\n• Фета",
    "description_raw": "Вага: 490 г\nІнгредієнти:\nНіжне поєднання 4 видів сирів:\n• Соус Альфредо\n• Моцарелла\n• Сир Дор-Блю\n• Пармезан\n• Фета",
    "image": "https://img.postershop.me/21253/339287b6-2292-42b0-957c-11ec5411dc1b_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242276,
    "name": "4 м'яса",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 259,
    "weight": "575 г",
    "ingredients": "Обери свій улюблений шматочок серед:\n• Шинки\n• Мисливских ковбасок\n• Салямі\n• Ніжної курочки\n• Соус Пілаті",
    "description_raw": "Вага: 575 г\nІнгредієнти:\nОбери свій улюблений шматочок серед:\n• Шинки\n• Мисливских ковбасок\n• Салямі\n• Ніжної курочки\n• Соус Пілаті",
    "image": "https://img.postershop.me/21253/3df0e024-89df-492d-b8e1-78d5b487cd54_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242277,
    "name": "4 сезона",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 269,
    "weight": "650 г",
    "ingredients": "Чотири смаки в одній піці - ідеальне рішення для гурманів:\n• Соус Альфредо та Пілаті\n• Моцарелла\n• Чері\n• Baby моцарела\n• Салямі\n• Бекончик\n• Мисливські ковбаски\n• Сир Дор Блю\n• Фета\n• Печериці\n• Запечена курочка",
    "description_raw": "Вага: 650 г\nІнгредієнти:\nЧотири смаки в одній піці - ідеальне рішення для гурманів:\n• Соус Альфредо та Пілаті\n• Моцарелла\n• Чері\n• Baby моцарела\n• Салямі\n• Бекончик\n• Мисливські ковбаски\n• Сир Дор Блю\n• Фета\n• Печериці\n• Запечена курочка",
    "image": "https://img.postershop.me/21253/cd794840-9e0a-4e93-9644-63a144c90bd5_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242295,
    "name": "DUO Пепероні на Гаваях",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "630 г",
    "ingredients": "Що може бути краще ніж поєднання двух половинок, які містять у собі:\n• Соус Пілаті та Соус Альфредо\n• Моцарелла\n• Салямі\n• Запечена Курка\n• Ананаси",
    "description_raw": "Вага: 630 г\nІнгредієнти:\nЩо може бути краще ніж поєднання двух половинок, які містять у собі:\n• Соус Пілаті та Соус Альфредо\n• Моцарелла\n• Салямі\n• Запечена Курка\n• Ананаси",
    "image": "https://img.postershop.me/21253/86ad8892-4359-4ac6-bffe-c7cf26103b8d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242294,
    "name": "DUO 4 Сира та М'ясний MIX",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 269,
    "weight": "650 г",
    "ingredients": "Обери дві половинки, які містять у собі:\n• Соус Альфредо\n• Соус Пілаті\n• Фета\n• Сир Дор-Блю\n• Пармезан\n• Мисливські ковбаски\n• Шинка\n• Ніжна курочка\n• Салямі\n• Печериці\n• Зелень",
    "description_raw": "Вага: 650 г\nІнгредієнти:\nОбери дві половинки, які містять у собі:\n• Соус Альфредо\n• Соус Пілаті\n• Фета\n• Сир Дор-Блю\n• Пармезан\n• Мисливські ковбаски\n• Шинка\n• Ніжна курочка\n• Салямі\n• Печериці\n• Зелень",
    "image": "https://img.postershop.me/21253/38c60374-5de7-40bd-9ad3-8220113947ac_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242299,
    "name": "Hard Chile",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 239,
    "weight": "710 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Бекон\n• Салямі\n• М'ясо по-домашньому\n• Цибуля Марс\n• Перчик Чилі\n• Соус Солодкий-Чилі",
    "description_raw": "Вага: 710 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Бекон\n• Салямі\n• М'ясо по-домашньому\n• Цибуля Марс\n• Перчик Чилі\n• Соус Солодкий-Чилі",
    "image": "https://img.postershop.me/21253/dc1f6d02-7162-496a-8ef1-065f65f66ccd_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7392966,
    "name": "Meat Line",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 239,
    "weight": "640 г",
    "ingredients": "• Соус Пілаті\n• Моцарела\n• Салямі\n• Бекон\n• Бекон Американський\n• Філе Мариноване\n• Помідори\n• Печериці",
    "description_raw": "Вага: 640 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарела\n• Салямі\n• Бекон\n• Бекон Американський\n• Філе Мариноване\n• Помідори\n• Печериці",
    "image": "https://img.postershop.me/21253/9a3ac27e-ef69-4ba1-9950-bf950722da34_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242316,
    "name": "Гавайська",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 229,
    "weight": "530 г",
    "ingredients": "• Соус Альфредо\n• Моцарелла\n• Запечена Курка\n• Ананаси",
    "description_raw": "Вага: 530 г\nІнгредієнти:\n• Соус Альфредо\n• Моцарелла\n• Запечена Курка\n• Ананаси",
    "image": "https://img.postershop.me/21253/0f6ab1eb-4dec-468b-89d0-543d4e13a496_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242318,
    "name": "Груша Дор Блю ",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 259,
    "weight": "670 г",
    "ingredients": "• Соус Альфредо\n• Моцарелла\n• Груша\n• Сир Дор-Блю\n• Мед\n• Горішки",
    "description_raw": "Вага: 670 г\nІнгредієнти:\n• Соус Альфредо\n• Моцарелла\n• Груша\n• Сир Дор-Блю\n• Мед\n• Горішки",
    "image": "https://img.postershop.me/21253/6e223629-59e7-4ca7-a28d-1c79b16026a7_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242329,
    "name": "Жульєн",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 259,
    "weight": "690 г",
    "ingredients": "• Соус Альфредо\n• Моцарелла\n• Запечена Курка\n• Філе Куряче\n• Печериці\n• Сир Дор-Блю\n• Сир Пармезан",
    "description_raw": "Вага: 690 г\nІнгредієнти:\n• Соус Альфредо\n• Моцарелла\n• Запечена Курка\n• Філе Куряче\n• Печериці\n• Сир Дор-Блю\n• Сир Пармезан",
    "image": "https://img.postershop.me/21253/5fc71f50-c4fd-4a4a-8602-ebdba81524c5_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7352205,
    "name": "Курка Гриби",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 269,
    "weight": "650 г",
    "ingredients": "• Соус Альфредо\n• Моцарела\n• Запечена Курка\n• Гриби Печериці\n• Помідор\n• Соус Шрі-Рача\n• Сир Пармезан",
    "description_raw": "Вага: 650 г\nІнгредієнти:\n• Соус Альфредо\n• Моцарела\n• Запечена Курка\n• Гриби Печериці\n• Помідор\n• Соус Шрі-Рача\n• Сир Пармезан",
    "image": "https://img.postershop.me/21253/416ed6d5-986f-46e4-809f-ae81c6a1034e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7308236,
    "name": "Делікатна Карбонара",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 299,
    "weight": "600 г",
    "ingredients": "• Соус Цезар\n• Моцарелла\n• Бекон\n• Бекон Американський\n• Томат Чері\n• Салат Айсберг\n• Яйце\n• Сир Пармезан",
    "description_raw": "Вага: 600 г\nІнгредієнти:\n• Соус Цезар\n• Моцарелла\n• Бекон\n• Бекон Американський\n• Томат Чері\n• Салат Айсберг\n• Яйце\n• Сир Пармезан",
    "image": "https://img.postershop.me/21253/59032de3-6221-42b3-9876-140f28f82449_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242415,
    "name": "Цезар",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 299,
    "weight": "740 г",
    "ingredients": "• Соус Цезар\n• Моцарелла\n• Томати Чері\n• Салат Айсберг\n• Запечена Курка\n• Смажений Бекон\n• Бекон\n• Скрембл\n• Сир Пармезан",
    "description_raw": "Вага: 740 г\nІнгредієнти:\n• Соус Цезар\n• Моцарелла\n• Томати Чері\n• Салат Айсберг\n• Запечена Курка\n• Смажений Бекон\n• Бекон\n• Скрембл\n• Сир Пармезан",
    "image": "https://img.postershop.me/21253/1bf63c0d-7ae1-44f2-88ad-9115c932d527_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7353965,
    "name": "Унагі-Cheese",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 299,
    "weight": "640 г",
    "ingredients": "• Соус Альфредо\n• Моцарела\n• Сир Фета\n• Сир Дор-Блю\n• Запечена Курка\n• Соус Унагі та Горішки",
    "description_raw": "Вага: 640 г\nІнгредієнти:\n• Соус Альфредо\n• Моцарела\n• Сир Фета\n• Сир Дор-Блю\n• Запечена Курка\n• Соус Унагі та Горішки",
    "image": "https://img.postershop.me/21253/7c7953cb-e8f0-44da-81d2-4cd946ad2505_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7308224,
    "name": "Тропікано",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 329,
    "weight": "640 г",
    "ingredients": "• Альфредо\n• Моцарелла\n• Ананас\n• Манго\n• Тигрова Креветка\n• Сир Пармезан",
    "description_raw": "Вага: 640 г\nІнгредієнти:\n• Альфредо\n• Моцарелла\n• Ананас\n• Манго\n• Тигрова Креветка\n• Сир Пармезан",
    "image": "https://img.postershop.me/21253/dced973c-30c5-4448-b71f-c28ddeeba2c2_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242317,
    "name": "Грибний Boom",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 349,
    "weight": "800 г",
    "ingredients": "• Соус Альфредо\n• Моцарелла\n• Цибулька\n• Печериці\n• Лисички\n• Білі гриби",
    "description_raw": "Вага: 800 г\nІнгредієнти:\n• Соус Альфредо\n• Моцарелла\n• Цибулька\n• Печериці\n• Лисички\n• Білі гриби",
    "image": "https://img.postershop.me/21253/851d79ac-d553-46e3-ac49-610428441d8d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7308228,
    "name": "Океанія",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 399,
    "weight": "600 г",
    "ingredients": "• Альфредо\n• Моцарелла\n• Форель\n• Кальмар\n• Крем Сир\n• Червона Ікра",
    "description_raw": "Вага: 600 г\nІнгредієнти:\n• Альфредо\n• Моцарелла\n• Форель\n• Кальмар\n• Крем Сир\n• Червона Ікра",
    "image": "https://img.postershop.me/21253/5f446bb8-8488-48eb-8f28-fa466bc786d2_image.jpeg",
    "popular": true,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242351,
    "name": "Маргарита",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 179,
    "weight": "570 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Чері",
    "description_raw": "Вага: 570 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Чері",
    "image": "https://img.postershop.me/21253/07d861b1-2bd4-469e-a3fa-58cac2f373bc_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242313,
    "name": "Венеція ",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "660 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Шинка\n• Болгарський Перець\n• Фета\n• Цибуля Марс\n• Зелень",
    "description_raw": "Вага: 660 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Шинка\n• Болгарський Перець\n• Фета\n• Цибуля Марс\n• Зелень",
    "image": "https://img.postershop.me/21253/20649774-e1e1-4213-9537-511924098422_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242352,
    "name": "Мисливська",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "630 г",
    "ingredients": "• Соус Барбекю\n• Моцарелла\n• Мисливські Ковбаси\n• Салямі\n• Помідори\n• Корнішони\n• Перець Чилі",
    "description_raw": "Вага: 630 г\nІнгредієнти:\n• Соус Барбекю\n• Моцарелла\n• Мисливські Ковбаси\n• Салямі\n• Помідори\n• Корнішони\n• Перець Чилі",
    "image": "https://img.postershop.me/21253/722fffc2-a439-491d-8b6a-4ebbd479f065_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242416,
    "name": "Шаурма",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 199,
    "weight": "730 г",
    "ingredients": "• Соус Вершково-Часниковий\n• Моцарелла\n• Помідора\n• Печериці\n• Картопля Фрі\n• Огірки солені\n• Соковита курка\n• Салат та соус Шрі-Рача",
    "description_raw": "Вага: 730 г\nІнгредієнти:\n• Соус Вершково-Часниковий\n• Моцарелла\n• Помідора\n• Печериці\n• Картопля Фрі\n• Огірки солені\n• Соковита курка\n• Салат та соус Шрі-Рача",
    "image": "https://img.postershop.me/21253/3b5aa7bb-29ad-4fc9-9f72-666be31fd82a_image.png",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242320,
    "name": "Домашня",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 229,
    "weight": "680 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Шинка\n• М'ясо по-домашньому\n• Печериці\n• Зелень",
    "description_raw": "Вага: 680 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Шинка\n• М'ясо по-домашньому\n• Печериці\n• Зелень",
    "image": "https://img.postershop.me/21253/30607177-6d06-43be-8fe6-c48d3a562618_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242355,
    "name": "Папероні",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 239,
    "weight": "520 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Папероні",
    "description_raw": "Вага: 520 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Папероні",
    "image": "https://img.postershop.me/21253/40d5a3c2-fd60-434a-a985-40607983623e_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242311,
    "name": "Баварія ",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "660 г",
    "ingredients": "• Соус Барбекю\n• Моцарелла\n• Мисливські Ковбаси\n• Бекон\n• М'ясо по-домашньому\n• Цибуля Марс\n• Зелена Цибуля",
    "description_raw": "Вага: 660 г\nІнгредієнти:\n• Соус Барбекю\n• Моцарелла\n• Мисливські Ковбаси\n• Бекон\n• М'ясо по-домашньому\n• Цибуля Марс\n• Зелена Цибуля",
    "image": "https://img.postershop.me/21253/1ec6c71d-ccab-4547-b560-647589a6546f_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7365960,
    "name": "Грецька",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 249,
    "weight": "630 г",
    "ingredients": "• Соус Пілаті\n• Моцарела\n• Помідор\n• Томати В'ялені\n• Бекон\n• Сир Фета\n• Марс\n• Орегано",
    "description_raw": "Вага: 630 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарела\n• Помідор\n• Томати В'ялені\n• Бекон\n• Сир Фета\n• Марс\n• Орегано",
    "image": "https://img.postershop.me/21253/8264328c-ee3b-4dfa-89c2-1081bbf5c920_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7308213,
    "name": "Чизбургер ",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 259,
    "weight": "740 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Корнішони\n• Фарш Мікс\n• Помідор\n• Бекон\n• Соус Бургерний та Кранч",
    "description_raw": "Вага: 740 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Корнішони\n• Фарш Мікс\n• Помідор\n• Бекон\n• Соус Бургерний та Кранч",
    "image": "https://img.postershop.me/21253/8f81d1c8-3337-44e5-8379-130dc16d9034_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7352096,
    "name": "Італьяно",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 279,
    "weight": "620 г",
    "ingredients": "• Соус Пілаті\n• Моцарела\n• Салямі\n• Папероні\n• Перець Болгарський\n• Соус Солодкий Чилі\n• Сир Пармезан",
    "description_raw": "Вага: 620 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарела\n• Салямі\n• Папероні\n• Перець Болгарський\n• Соус Солодкий Чилі\n• Сир Пармезан",
    "image": "https://img.postershop.me/21253/1afecfa0-458f-4cac-a6de-1c1e5dcd1a9f_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": true,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7263315,
    "name": "Супер М'ясна",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 319,
    "weight": "650 г",
    "ingredients": "• Соус Пілаті\n• Салямі\n• Бекон\n• Мисливські Ковбаси\n• Шинка",
    "description_raw": "Вага: 650 г\nІнгредієнти:\n• Соус Пілаті\n• Салямі\n• Бекон\n• Мисливські Ковбаси\n• Шинка",
    "image": "https://img.postershop.me/21253/aa69117f-7316-4704-9e34-0818345fc5ff_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242346,
    "name": "М'ясний MIX",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 339,
    "weight": "860 г",
    "ingredients": "• Соус Пілаті\n• Моцарелла\n• Хот-Дог Борт\n• Мисливські Ковбаси\n• Салямі\n• Печериці\n• Шинка\n• Запечена Курка\n• Зелень",
    "description_raw": "Вага: 860 г\nІнгредієнти:\n• Соус Пілаті\n• Моцарелла\n• Хот-Дог Борт\n• Мисливські Ковбаси\n• Салямі\n• Печериці\n• Шинка\n• Запечена Курка\n• Зелень",
    "image": "https://img.postershop.me/21253/6077a241-2bd7-4ee1-8682-86ffbdc08de3_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242330,
    "name": "Збери Сам ",
    "category_pos_id": 16,
    "category_name": "Піца",
    "category_url": "pica",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 100,
    "weight": "",
    "ingredients": "Збери свою піцу\nСтвори свою улюблену піцу сам, обирай інгрідієни та насолоджуйся смаком ♥",
    "description_raw": "Збери свою піцу\nСтвори свою улюблену піцу сам, обирай інгрідієни та насолоджуйся смаком ♥",
    "image": "https://img.postershop.me/21253/a0ab8425-5d79-4a18-8647-1d559b27f84a_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377675,
        "group_name": "Інгрідієнти на піцу",
        "type": 2,
        "min": 1,
        "max": 20,
        "options": [
          {
            "id": 1521636,
            "name": "Соус Альфредо ",
            "price": 40
          },
          {
            "id": 1521637,
            "name": "Соус Пілаті",
            "price": 40
          },
          {
            "id": 1521638,
            "name": "Помідор ",
            "price": 25
          },
          {
            "id": 1521639,
            "name": "Шинка ",
            "price": 50
          },
          {
            "id": 1521640,
            "name": "Салямі ",
            "price": 35
          },
          {
            "id": 1521641,
            "name": "Мисливські ковбаски ",
            "price": 35
          },
          {
            "id": 1521642,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521643,
            "name": "Куряче Філе",
            "price": 35
          },
          {
            "id": 1521644,
            "name": "Корнішони ",
            "price": 25
          },
          {
            "id": 1521645,
            "name": "Цибуля ",
            "price": 10
          },
          {
            "id": 1521646,
            "name": "Перець болгарський ",
            "price": 20
          },
          {
            "id": 1521647,
            "name": "Фета",
            "price": 15
          },
          {
            "id": 1521648,
            "name": "Сир Дор Блю",
            "price": 35
          },
          {
            "id": 1521649,
            "name": "Сир Пармезан ",
            "price": 25
          },
          {
            "id": 1521650,
            "name": "Перець чиллі ",
            "price": 10
          },
          {
            "id": 1521651,
            "name": "Гриби ",
            "price": 25
          },
          {
            "id": 1521652,
            "name": "Тигрова креветка ",
            "price": 70
          },
          {
            "id": 1521653,
            "name": "Зелень ",
            "price": 15
          },
          {
            "id": 1521654,
            "name": "Чері",
            "price": 25
          },
          {
            "id": 1521655,
            "name": "Фарш готовий",
            "price": 50
          },
          {
            "id": 1521656,
            "name": "М`ясо по-домашньому ",
            "price": 30
          },
          {
            "id": 1521657,
            "name": "Сир Чедер ",
            "price": 35
          },
          {
            "id": 1521660,
            "name": "Курка запеченна",
            "price": 30
          },
          {
            "id": 1521661,
            "name": "Ананас",
            "price": 35
          },
          {
            "id": 1521662,
            "name": "Baby моцарелла",
            "price": 45
          },
          {
            "id": 1521663,
            "name": "Томати в`ялені ",
            "price": 30
          },
          {
            "id": 1521664,
            "name": "Лосось ",
            "price": 70
          },
          {
            "id": 1521665,
            "name": "Папероні ",
            "price": 35
          }
        ]
      },
      {
        "group_id": 377669,
        "group_name": "Соус до вашої піци:",
        "type": 2,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521611,
            "name": "Соус Барбекю ",
            "price": 0
          },
          {
            "id": 1521612,
            "name": "Соус Часниковий ",
            "price": 0
          },
          {
            "id": 1521613,
            "name": "Соус Шрі-Рача",
            "price": 0
          },
          {
            "id": 1521614,
            "name": "Вершковий Соус",
            "price": 0
          }
        ]
      },
      {
        "group_id": 377670,
        "group_name": "Оберіть свій борт:",
        "type": 2,
        "min": 0,
        "max": 1,
        "options": [
          {
            "id": 1521615,
            "name": "Сирний Борт",
            "price": 65
          },
          {
            "id": 1521616,
            "name": "Хот-Дог Борт ",
            "price": 65
          }
        ]
      },
      {
        "group_id": 396297,
        "group_name": "З собою/Доставка",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590313,
            "name": "З Собою (Піца)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242291,
    "name": "Chiken Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 159,
    "weight": "",
    "ingredients": "• Куряча Котлета\n• Помідор\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Соус Бургерний\n• Гірчиця",
    "description_raw": "1 шт | 270 г\nІнгредієнти:\n• Куряча Котлета\n• Помідор\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Соус Бургерний\n• Гірчиця",
    "image": "https://img.postershop.me/21253/84558fb8-946c-4fc3-abb8-d85c45e4d605_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      },
      {
        "group_id": 377674,
        "group_name": "Доповнювання до Бургера",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521630,
            "name": "Котлета Яловича",
            "price": 50
          },
          {
            "id": 1521631,
            "name": "Котлета Куряча",
            "price": 40
          },
          {
            "id": 1521632,
            "name": "Сир \"Чедер\"",
            "price": 15
          },
          {
            "id": 1521633,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521634,
            "name": "Яєшня ",
            "price": 15
          },
          {
            "id": 1521635,
            "name": "Цибуля \"Кріспі\"",
            "price": 10
          }
        ]
      },
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242341,
    "name": "Комбо Chiken Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 219,
    "weight": "",
    "ingredients": "1 шт\nChiken Бургер\nна вибір:\n• Картопля фрі\n• Картопля по-селянські\n• Картопля діпи\n• Нагетси\n\"Coca-Cola\"ж/б 0,250 мл у подарунок",
    "description_raw": "1 шт\nChiken Бургер\nна вибір:\n• Картопля фрі\n• Картопля по-селянські\n• Картопля діпи\n• Нагетси\n\"Coca-Cola\"ж/б 0,250 мл у подарунок",
    "image": "https://img.postershop.me/21253/40b25ed5-f337-4f1d-b4d6-47364a154eaa_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377673,
        "group_name": "Картопля за вибором ",
        "type": 1,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521626,
            "name": "Картопля Фрі ",
            "price": 0
          },
          {
            "id": 1521627,
            "name": "Картопля по-селянські ",
            "price": 0
          },
          {
            "id": 1521628,
            "name": "Картопля Діпи",
            "price": 10
          },
          {
            "id": 1525209,
            "name": "Нагетси",
            "price": 20
          }
        ]
      },
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      },
      {
        "group_id": 377674,
        "group_name": "Доповнювання до Бургера",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521630,
            "name": "Котлета Яловича",
            "price": 50
          },
          {
            "id": 1521631,
            "name": "Котлета Куряча",
            "price": 40
          },
          {
            "id": 1521632,
            "name": "Сир \"Чедер\"",
            "price": 15
          },
          {
            "id": 1521633,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521634,
            "name": "Яєшня ",
            "price": 15
          },
          {
            "id": 1521635,
            "name": "Цибуля \"Кріспі\"",
            "price": 10
          }
        ]
      },
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242298,
    "name": "Grill Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 159,
    "weight": "",
    "ingredients": "• Яловича Котлета\n• Помідор\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Соус Бургерний\n• Гірчиця",
    "description_raw": "1 шт | 270 г\nІнгредієнти:\n• Яловича Котлета\n• Помідор\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Соус Бургерний\n• Гірчиця",
    "image": "https://img.postershop.me/21253/bb80a4de-6936-4d26-b148-6e8c2e94f707_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      },
      {
        "group_id": 377674,
        "group_name": "Доповнювання до Бургера",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521630,
            "name": "Котлета Яловича",
            "price": 50
          },
          {
            "id": 1521631,
            "name": "Котлета Куряча",
            "price": 40
          },
          {
            "id": 1521632,
            "name": "Сир \"Чедер\"",
            "price": 15
          },
          {
            "id": 1521633,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521634,
            "name": "Яєшня ",
            "price": 15
          },
          {
            "id": 1521635,
            "name": "Цибуля \"Кріспі\"",
            "price": 10
          }
        ]
      },
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242342,
    "name": "Комбо Grill Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 229,
    "weight": "",
    "ingredients": "1 шт\nGrill Бургер\nна вибір:\n• Картопля фрі\n• Картопля по-селянські\n• Картопля діпи\n• Нагетси\n\"Coca-Cola\"ж/б 0,250 мл у подарунок",
    "description_raw": "1 шт\nGrill Бургер\nна вибір:\n• Картопля фрі\n• Картопля по-селянські\n• Картопля діпи\n• Нагетси\n\"Coca-Cola\"ж/б 0,250 мл у подарунок",
    "image": "https://img.postershop.me/21253/5258e419-7e10-417d-9bda-dc7454ea4aa6_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377673,
        "group_name": "Картопля за вибором ",
        "type": 1,
        "min": 1,
        "max": 1,
        "options": [
          {
            "id": 1521626,
            "name": "Картопля Фрі ",
            "price": 0
          },
          {
            "id": 1521627,
            "name": "Картопля по-селянські ",
            "price": 0
          },
          {
            "id": 1521628,
            "name": "Картопля Діпи",
            "price": 10
          },
          {
            "id": 1525209,
            "name": "Нагетси",
            "price": 20
          }
        ]
      },
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      },
      {
        "group_id": 377674,
        "group_name": "Доповнювання до Бургера",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521630,
            "name": "Котлета Яловича",
            "price": 50
          },
          {
            "id": 1521631,
            "name": "Котлета Куряча",
            "price": 40
          },
          {
            "id": 1521632,
            "name": "Сир \"Чедер\"",
            "price": 15
          },
          {
            "id": 1521633,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521634,
            "name": "Яєшня ",
            "price": 15
          },
          {
            "id": 1521635,
            "name": "Цибуля \"Кріспі\"",
            "price": 10
          }
        ]
      },
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242283,
    "name": "Brooklyn Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 209,
    "weight": "",
    "ingredients": "• Куряча Котлета\n• Яєшня\n• Печериці\n• Помідор\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Фірмовий Соус",
    "description_raw": "1 шт | 320 г\nІнгредієнти:\n• Куряча Котлета\n• Яєшня\n• Печериці\n• Помідор\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Фірмовий Соус",
    "image": "https://img.postershop.me/21253/a948863a-4bd5-438e-81a4-2034e3264cfb_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377674,
        "group_name": "Доповнювання до Бургера",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521630,
            "name": "Котлета Яловича",
            "price": 50
          },
          {
            "id": 1521631,
            "name": "Котлета Куряча",
            "price": 40
          },
          {
            "id": 1521632,
            "name": "Сир \"Чедер\"",
            "price": 15
          },
          {
            "id": 1521633,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521634,
            "name": "Яєшня ",
            "price": 15
          },
          {
            "id": 1521635,
            "name": "Цибуля \"Кріспі\"",
            "price": 10
          }
        ]
      },
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      },
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7475978,
    "name": "Шніцель Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 219,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/aa4167a3-73fe-4e7a-9f77-8632dcd24638_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242300,
    "name": "King Бургер",
    "category_pos_id": 13,
    "category_name": "Бургер Меню",
    "category_url": "burger-menyu",
    "parent_category_id": 28,
    "parent_category_name": "Crab Club: Food",
    "parent_category_url": "crab-club-food",
    "price": 229,
    "weight": "",
    "ingredients": "• Яловича Котлета\n• Бекон\n• Помідор\n• Печериці\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Фірмовий Соус",
    "description_raw": "1 шт | 340 г\nІнгредієнти:\n• Яловича Котлета\n• Бекон\n• Помідор\n• Печериці\n• Огірок\n• Салат Айсберг\n• Сир Чедер\n• Цибуля Марс\n• Фірмовий Соус",
    "image": "https://img.postershop.me/21253/5fb2cdb6-924c-41f1-b376-f8c0f1e925da_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [
      {
        "group_id": 377674,
        "group_name": "Доповнювання до Бургера",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521630,
            "name": "Котлета Яловича",
            "price": 50
          },
          {
            "id": 1521631,
            "name": "Котлета Куряча",
            "price": 40
          },
          {
            "id": 1521632,
            "name": "Сир \"Чедер\"",
            "price": 15
          },
          {
            "id": 1521633,
            "name": "Бекон ",
            "price": 35
          },
          {
            "id": 1521634,
            "name": "Яєшня ",
            "price": 15
          },
          {
            "id": 1521635,
            "name": "Цибуля \"Кріспі\"",
            "price": 10
          }
        ]
      },
      {
        "group_id": 377672,
        "group_name": "Додаткові соуси",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1521621,
            "name": "Соус Кетчуп",
            "price": 15
          },
          {
            "id": 1521622,
            "name": "Соус Солодкий чиллі",
            "price": 15
          },
          {
            "id": 1521623,
            "name": "Соус Майонез ",
            "price": 15
          },
          {
            "id": 1521624,
            "name": "Соус Сирний",
            "price": 15
          },
          {
            "id": 1521625,
            "name": "Гірчиця ",
            "price": 15
          }
        ]
      },
      {
        "group_id": 396449,
        "group_name": "З собою/Доставка (Бургер)",
        "type": 2,
        "min": 0,
        "max": 999,
        "options": [
          {
            "id": 1590797,
            "name": "З собою (Бургер)",
            "price": 0
          }
        ]
      }
    ],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242264,
    "name": "Японське тістечко \"Моті\"",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 0,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/5023a754-47bc-4273-9953-ff4b8fdc51bc_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242261,
    "name": "Ice Cake (Шоколадні)",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 0,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/28a21b53-1754-4a8c-a401-ea552a7dd3b2_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7319371,
    "name": "Ice Cream (Морозиво)",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 0,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/61553e7c-7eea-4b58-8029-c97e0ca3afea_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7319381,
    "name": "Ice Cake (Ягідні)",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 0,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/8b2b68b2-8da8-4ea4-817a-ede97a3b26c9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7536165,
    "name": "Картопля \"Дубайський шоколад\"",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 110,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7522797,
    "name": "Cheesecake",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 0,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/c4d557e2-85b2-4cb3-8c1b-ef33c5aa23b3_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7527748,
    "name": "Рулети",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 0,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/d584ba78-c366-4fbd-86c5-f50368af9da9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7528450,
    "name": "Еклери",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 85,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/f6bd89c2-1390-44a8-8b27-b87c297993fa_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7542536,
    "name": "Майнкрафт",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 80,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7546038,
    "name": "Тирамісу Cake",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 100,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7550952,
    "name": "Наполеон Cake",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 80,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7551919,
    "name": "Меренговий Рулет з вішнею",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 80,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7554106,
    "name": "Корпусний Десерт Кавовий",
    "category_pos_id": 9,
    "category_name": "Десерти",
    "category_url": "deserti",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 130,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242269,
    "name": "Напій \"Coca-Cola\" ж/б 0,33мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 30,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/cd9875dd-7669-4dd5-b979-188fda70d11f_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7531845,
    "name": "Напій \"Coca-Cola Zero\" ж/б 0,33мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 35,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/3708f2a3-12cf-4b10-927f-fe0df69253dd_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242268,
    "name": "Напій \"Coca-Cola\" газований 0,5мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 35,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/061c9c10-66a3-4bd7-87a7-d4a2529c0165_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242274,
    "name": "Напій \"Sprite\" ж/б 0,33мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 30,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/46430794-2599-4766-878b-dba8fdbd3f87_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242273,
    "name": "Напій \"Sprite\" газований 0,5 мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 35,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/26fdac34-f403-461b-96e0-e01601187a15_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242270,
    "name": "Напій \"Fanta\" ж/б 0,33мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 30,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/3b2ab0e3-554e-449b-99e9-3a92c3182d0c_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242271,
    "name": "Напій \"Schweppes\" Гранат ж/б 0,330мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 35,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/1bfe38d0-9ecf-4c05-a7da-c6936f2e9c58_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7242272,
    "name": "Напій \"Schweppes\" Мохіто ж/б 0,330мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 35,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/2c9c17d0-9233-4075-81c6-12fb4db1e238_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7543148,
    "name": "Напій \"Schweppes\" Лохина ж/б 0,330мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 35,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/0060ff68-58e4-4f40-af84-4cab6b8e719d_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7529961,
    "name": "Ф'юззі Лісові Ягоди 0,5",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 45,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/1fc508c2-2e05-4f2e-bc09-c790b110ace9_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7529962,
    "name": "Ф'юззі Полинця-Диня 0,5",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 45,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/2cf8b8cb-8a3e-44b0-a3bd-d063fa94d790_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7531850,
    "name": "Ф'юззі Лимон Лемонграс 0,5",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 45,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/79b313e9-19b5-429e-8ea0-a1b8cc5c64b2_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7531847,
    "name": "Дитячий сік 0,200 мл",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 30,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/8658f05b-dceb-46d7-abe8-53b7defc7138_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7529965,
    "name": "Cappy Ягідний 0,5",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 50,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/1e88ca2e-ddcb-45a7-8d99-c1d04567c1b5_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7529964,
    "name": "Cappy Апельсиновий 0,5",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 50,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/f8c09a23-ec5d-4077-a8ca-9195db0ea654_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7543150,
    "name": "Сік Cappy Яблуко 1л",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 110,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/e4f6a8d3-5055-4cee-9d64-d2f421d6efdc_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7522795,
    "name": "Вода Газована",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 30,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/aebd5320-4e30-429f-9927-94c0c3f3b70a_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7522796,
    "name": "Вода Не газована",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 30,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/407d7fcf-6c05-498f-bf5d-7a7dd6be6e6b_image.jpeg",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  },
  {
    "id": 7546083,
    "name": "Сік Cappy Гранат 1л",
    "category_pos_id": 3,
    "category_name": "Холодні напої",
    "category_url": "xolodni-napoyi",
    "parent_category_id": null,
    "parent_category_name": null,
    "parent_category_url": null,
    "price": 120,
    "weight": "",
    "ingredients": "",
    "description_raw": "",
    "image": "https://img.postershop.me/21253/a2ad5789-181c-46f0-a85a-c6b265a3eb9e_image.png",
    "popular": false,
    "tags": [],
    "modifications": [],
    "is_spicy": false,
    "is_vegetarian": false,
    "chef_choice": false
  }
];

export const REVIEWS: Review[] = [
  {
    "id": 1,
    "author": "Олександр Мельник",
    "rating": 5,
    "date": "Вчора",
    "dish": "Сет «Філадельфія Gold»",
    "comment": "Найкращі суші в Овідіополі без перебільшення! Риби дуже багато, рис ідеальної консистенції, упаковка виглядає на 10 з 10. Доставили рівно за 40 хвилин гарячими та свіжими!",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    "id": 2,
    "author": "Катерина Дмитренко",
    "rating": 5,
    "date": "3 дні тому",
    "dish": "Піца «4 Сири з грушею та горгонзолою»",
    "comment": "Тісто просто божественне, з повітряними бортиками. Доставка приїхала швидше, ніж очікували. Дуже зручний сайт і приємне обслуговування!",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    "id": 3,
    "author": "Максим Ковальчук",
    "rating": 5,
    "date": "5 днів тому",
    "dish": "Суші Бургер з креветкою & WOK",
    "comment": "Суші-бургер — це новий рівень насолоди. Порція величезна, хрустка темпура і свіжі соуси. Рекомендую всім спробувати!",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    "id": 4,
    "author": "Анна Бондар",
    "rating": 5,
    "date": "Тиждень тому",
    "dish": "Сирники від Шефа & Круасан",
    "comment": "Замовляли сніданки на ранок вихідного дня — все приїхало ідеально тепле і дуже красиве. Crab Club тримає найвищу планку якості!",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  }
];

export const PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'CRABCLUB': { discountPercent: 10, description: 'Знижка 10% на все замовлення' },
  'VIP15': { discountPercent: 15, description: 'VIP знижка 15%' },
  'WELCOME': { discountPercent: 10, description: 'Вітальна знижка 10%' },
  'CRAB50': { discountFixed: 50, description: 'Знижка 50₴ на замовлення' }
};
