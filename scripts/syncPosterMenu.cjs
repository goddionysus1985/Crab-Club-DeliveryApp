/**
 * Build-time Poster POS Menu Synchronizer
 * Fetches real categories, subcategories, products, and modifiers from Poster API
 * and updates src/data/menuData.ts before Vite builds for GitHub Pages / Production.
 */

const fs = require('fs');
const path = require('path');

const POSTER_TOKEN = '878574:81779496978a44fd04baad6f04b15fac';
const SPOT_ID = 1;

function slugify(text) {
  const cyrMap = {
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
    'вода': 'voda',
    'сік': 'soki'
  };

  const lower = String(text || '').toLowerCase().trim();
  for (const [key, val] of Object.entries(cyrMap)) {
    if (lower.includes(key)) return val;
  }

  const ruEn = {
    'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ye','ж':'zh','з':'z',
    'и':'y','і':'i','ї':'yi','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p',
    'р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch',
    'ь':'','ю':'yu','я':'ya'
  };

  const translit = lower.split('').map(char => ruEn[char] || char).join('');
  return translit.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'menu';
}

function getCategoryIcon(name) {
  const n = String(name || '').toLowerCase();
  if (n.includes('кава') || n.includes('coffee') || n.includes('чай') || n.includes('tea')) return 'Coffee';
  if (n.includes('рол') || n.includes('суші') || n.includes('сет') || n.includes('риба') || n.includes('fish')) return 'Fish';
  if (n.includes('піц') || n.includes('pizza') || n.includes('фокач')) return 'Pizza';
  if (n.includes('бургер') || n.includes('burger') || n.includes('сендвіч')) return 'Sandwich';
  if (n.includes('випіч') || n.includes('круас') || n.includes('хліб') || n.includes('десерт') || n.includes('торт')) return 'Cake';
  if (n.includes('напо') || n.includes('вода') || n.includes('сік') || n.includes('холодні') || n.includes('лимонад')) return 'GlassWater';
  if (n.includes('суп') || n.includes('рамен') || n.includes('том ям')) return 'Soup';
  if (n.includes('салат') || n.includes('боул')) return 'Salad';
  if (n.includes('паст') || n.includes('вок') || n.includes('wok') || n.includes('локшин')) return 'Flame';
  if (n.includes('гриль') || n.includes('стейк') || n.includes('м\'яс') || n.includes('шашлик')) return 'Flame';
  if (n.includes('снідан') || n.includes('сирник') || n.includes('омлет')) return 'Utensils';
  if (n.includes('закуск') || n.includes('снек') || n.includes('соус')) return 'Sparkles';
  return 'Utensils';
}

function mapProduct(raw, categoryMap) {
  // Price resolution
  let priceUah = 0;
  if (raw.price && typeof raw.price === 'object') {
    const spotPrice = raw.price[String(SPOT_ID)] || raw.price['1'] || Object.values(raw.price)[0];
    priceUah = Number(spotPrice) / 100;
  } else if (raw.price !== undefined && raw.price !== null) {
    priceUah = Number(raw.price) / 100;
  } else if (raw.spots && Array.isArray(raw.spots)) {
    const spotInfo = raw.spots.find(s => Number(s.spot_id) === SPOT_ID) || raw.spots[0];
    if (spotInfo && spotInfo.price) {
      priceUah = Number(spotInfo.price) / 100;
    }
  }

  // Modifications parsing
  const modificationGroups = [];
  if (Array.isArray(raw.group_modifications) && raw.group_modifications.length > 0) {
    raw.group_modifications.forEach((group, gIdx) => {
      if (Array.isArray(group.modifications) && group.modifications.length > 0) {
        const options = group.modifications.map((mod, mIdx) => {
          let modPrice = 0;
          if (mod.spots && Array.isArray(mod.spots) && mod.spots.length > 0) {
            const sInfo = mod.spots.find(s => Number(s.spot_id) === SPOT_ID) || mod.spots[0];
            if (sInfo && sInfo.price) {
              const rawP = Number(sInfo.price);
              modPrice = rawP >= 100 ? rawP / 100 : rawP;
            }
          } else if (mod.price !== undefined && mod.price !== null) {
            const rawP = Number(mod.price);
            modPrice = rawP >= 100 ? rawP / 100 : rawP;
          } else if (mod.modificator_selfprice !== undefined) {
            const rawP = Number(mod.modificator_selfprice);
            modPrice = rawP >= 100 ? rawP / 100 : rawP;
          }
          const modId = Number(mod.dish_modification_id || mod.modificator_id || mod.modification_id || mod.id || (gIdx * 100 + mIdx + 1));
          return {
            id: modId,
            name: String(mod.name || mod.modificator_name || `Опція ${mIdx + 1}`).trim(),
            price: Math.round(modPrice)
          };
        }).filter(o => Boolean(o.name));

        if (options.length > 0) {
          modificationGroups.push({
            group_id: Number(group.dish_modification_group_id || group.group_id || group.id || (gIdx + 1)),
            group_name: String(group.name || group.group_name || 'Додаткові інгредієнти').trim(),
            type: Number(group.type || 2),
            min: Number(group.num_min || group.min || 0),
            max: Number(group.num_max || group.max || options.length),
            options
          });
        }
      }
    });
  }

  if (modificationGroups.length === 0 && Array.isArray(raw.modifications) && raw.modifications.length > 0) {
    const options = raw.modifications.map(mod => {
      let modPrice = 0;
      if (mod.spots && Array.isArray(mod.spots)) {
        const sInfo = mod.spots.find(s => Number(s.spot_id) === SPOT_ID) || mod.spots[0];
        if (sInfo && sInfo.price) modPrice = Number(sInfo.price) / 100;
      } else if (mod.price) {
        modPrice = Number(mod.price) / 100;
      } else if (mod.modificator_selfprice) {
        modPrice = Number(mod.modificator_selfprice) / 100;
      }
      return {
        id: Number(mod.modificator_id || mod.id),
        name: String(mod.modificator_name || mod.name || 'Опція'),
        price: Math.round(modPrice)
      };
    });

    if (options.length > 0) {
      if (priceUah === 0 && options[0].price > 0) {
        priceUah = options[0].price;
      }
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

  // Clean Ingredients Parsing
  let parsedIngredients = '';
  if (Array.isArray(raw.ingredients) && raw.ingredients.length > 0) {
    parsedIngredients = raw.ingredients
      .map(ing => ing?.ingredient_name || ing?.name || '')
      .filter(name => name && typeof name === 'string' && name.trim().length > 0)
      .join(', ');
  } else if (typeof raw.ingredients === 'string') {
    parsedIngredients = raw.ingredients.trim();
  }

  const prodDesc = typeof raw.product_production_description === 'string' ? raw.product_production_description.trim() : '';
  const finalIngredients = parsedIngredients || prodDesc || '';
  const finalDescription = prodDesc || parsedIngredients || '';

  let weightText = '1 порція';
  if (raw.out && Number(raw.out) > 0) {
    weightText = `${Number(raw.out)} г`;
  } else if (raw.weight && Number(raw.weight) > 0) {
    weightText = `${Number(raw.weight)} г`;
  }

  const catName = String(raw.category_name || '').toLowerCase();
  const prodName = String(raw.product_name || raw.name || '').toLowerCase();
  let defaultImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';

  if (catName.includes('краб') || catName.includes('морепродукт') || prodName.includes('краб') || prodName.includes('боул') || prodName.includes('креветк')) {
    defaultImage = 'https://images.unsplash.com/photo-1559742811-822873691df8?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('рол') || catName.includes('суш') || prodName.includes('рол') || prodName.includes('філадельфія') || prodName.includes('дракон') || prodName.includes('каліфорнія')) {
    defaultImage = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('піц') || prodName.includes('піц') || prodName.includes('пепероні')) {
    defaultImage = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('бургер') || prodName.includes('бургер')) {
    defaultImage = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('салат') || prodName.includes('салат') || prodName.includes('цезар') || prodName.includes('грецьк')) {
    defaultImage = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('суп') || catName.includes('рамен') || prodName.includes('том ям') || prodName.includes('рамен') || prodName.includes('суп')) {
    defaultImage = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('закуск') || catName.includes('снек') || prodName.includes('фрі') || prodName.includes('крильця') || prodName.includes('палички')) {
    defaultImage = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('десерт') || prodName.includes('чизкейк') || prodName.includes('фондан') || prodName.includes('торт') || prodName.includes('круас')) {
    defaultImage = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('соус') || prodName.includes('соус') || prodName.includes('тартар') || prodName.includes('чилі')) {
    defaultImage = 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('кава') || prodName.includes('капуч') || prodName.includes('еспресо') || prodName.includes('лате') || prodName.includes('американо')) {
    defaultImage = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  } else if (catName.includes('напо') || catName.includes('вода') || prodName.includes('боржом') || prodName.includes('кола') || prodName.includes('сік')) {
    defaultImage = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80';
  }

  const imageUrl = raw.photo_origin 
    ? `https://joinposter.com${raw.photo_origin}` 
    : (raw.photo ? `https://joinposter.com${raw.photo}` : defaultImage);

  const catInfo = categoryMap.get(String(raw.menu_category_id || raw.category_id));

  return {
    id: Number(raw.product_id || raw.id),
    name: String(raw.product_name || raw.name || 'Страва'),
    category_pos_id: catInfo ? catInfo.id : Number(raw.menu_category_id || 1),
    category_name: catInfo ? catInfo.name : (raw.category_name || 'Меню'),
    category_url: catInfo ? catInfo.slug : 'all',
    price: Math.round(priceUah),
    weight: weightText,
    ingredients: finalIngredients,
    description_raw: finalDescription,
    image: imageUrl,
    modifications: modificationGroups.length > 0 ? modificationGroups : undefined
  };
}

async function syncMenu() {
  console.log('🔄 [Poster Sync] Початок синхронізації живого меню Poster POS...');

  try {
    const [prodsRes, catsRes] = await Promise.all([
      fetch(`https://joinposter.com/api/menu.getProducts?token=${POSTER_TOKEN}`).then(r => r.json()),
      fetch(`https://joinposter.com/api/menu.getCategories?token=${POSTER_TOKEN}`).then(r => r.json())
    ]);

    if (!prodsRes.response || !Array.isArray(prodsRes.response)) {
      console.warn('⚠️ [Poster Sync] Не вдалося отримати продукти з Poster API, зберігаємо поточні дані.');
      return;
    }

    const rawCategories = (catsRes.response || []).filter(c => c.category_hidden !== '1' && c.category_hidden !== 1);
    const parentCategories = rawCategories.filter(c => !c.parent_category || c.parent_category === '0' || c.parent_category === 0);
    const childCategories = rawCategories.filter(c => c.parent_category && c.parent_category !== '0' && c.parent_category !== 0);

    const categoryMap = new Map();

    const categories = parentCategories.map(c => {
      const slug = slugify(c.category_name || `cat-${c.category_id}`);
      const icon = getCategoryIcon(c.category_name);
      categoryMap.set(String(c.category_id), { id: Number(c.category_id), name: c.category_name, slug, icon });

      const subcats = childCategories
        .filter(sub => String(sub.parent_category) === String(c.category_id))
        .map(sub => {
          const subSlug = slugify(sub.category_name || `sub-${sub.category_id}`);
          categoryMap.set(String(sub.category_id), { 
            id: Number(sub.category_id), 
            name: sub.category_name, 
            slug: subSlug, 
            icon: getCategoryIcon(sub.category_name),
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

    childCategories.forEach(sub => {
      if (!categoryMap.has(String(sub.category_id))) {
        const slug = slugify(sub.category_name || `cat-${sub.category_id}`);
        const icon = getCategoryIcon(sub.category_name);
        categoryMap.set(String(sub.category_id), { id: Number(sub.category_id), name: sub.category_name, slug, icon });
        categories.push({
          id: Number(sub.category_id),
          name: String(sub.category_name),
          slug,
          icon,
          subcategories: []
        });
      }
    });

    const products = prodsRes.response
      .filter(p => {
        if (p.hidden === '1' || p.hidden === 1) return false;
        if (p.spots && Array.isArray(p.spots) && p.spots.length > 0) {
          const currentSpot = p.spots.find(s => Number(s.spot_id) === SPOT_ID);
          if (currentSpot && (currentSpot.visible === '0' || currentSpot.visible === 0)) return false;
        }
        return true;
      })
      .map(p => mapProduct(p, categoryMap));

    console.log(`✅ [Poster Sync] Отримано: ${categories.length} категорій та ${products.length} активних страв.`);

    const menuDataPath = path.resolve(__dirname, '../src/data/menuData.ts');

    const restaurantInfoCode = `export const RESTAURANT_INFO: RestaurantInfo = {
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
};`;

    const firstCatSlug = categories[0]?.slug || 'all';
    const bannersCode = `export const BANNERS: Banner[] = [
  {
    "id": 1,
    "title": "ПРЕМІАЛЬНІ БУРГЕРИ ТА СВІЖА ВИПІЧКА",
    "subtitle": "Соковите м'ясо, авторські соуси та хрусткі булочки власного виробництва.",
    "badge": "ХІТ ПРОДАЖІВ",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85",
    "link": "#category-${firstCatSlug}",
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
];`;

    const newMenuDataTs = `// Auto-generated & Live Synchronized from Poster POS API
// Generated at: ${new Date().toISOString()}
import { Category, Product, RestaurantInfo, Banner, Review } from '../types';

${restaurantInfoCode}

${bannersCode}

export const CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const REVIEWS: Review[] = [];

export const PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'CRABCLUB': { discountPercent: 10, description: 'Знижка 10% на все замовлення' },
  'VIP15': { discountPercent: 15, description: 'VIP знижка 15%' },
  'WELCOME': { discountPercent: 10, description: 'Вітальна знижка 10%' },
  'CRAB50': { discountFixed: 50, description: 'Знижка 50₴ на замовлення' }
};
`;

    fs.writeFileSync(menuDataPath, newMenuDataTs, 'utf-8');
    console.log(`🎉 [Poster Sync] src/data/menuData.ts успішно оновлено актуальним меню Poster POS!`);
  } catch (err) {
    console.error('❌ [Poster Sync] Помилка синхронізації:', err);
  }
}

syncMenu();
