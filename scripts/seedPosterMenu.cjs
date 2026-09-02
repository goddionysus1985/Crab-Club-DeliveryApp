const TOKEN = '878574:81779496978a44fd04baad6f04b15fac';
const SPOT_ID = 1;

const categoriesToCreate = [
  {
    name: 'Краби та Морепродукти',
    dishes: [
      { name: 'Крабовий Боул Преміум', price: 380, weight: 350, desc: "М'ясо краба, авокадо, рис жасмин, боби едамаме, манго соус, кунжут" },
      { name: 'Краб-рол у бріоші', price: 290, weight: 260, desc: 'Ніжний краб у вершковому соусі на підсмаженій бріош-булочці' },
      { name: 'Креветки Панко з чилі соусом', price: 240, weight: 220, desc: 'Хрусткі тигрові креветки в сухарях панко з фірмовим соусом' }
    ]
  },
  {
    name: 'Суші та Роли',
    dishes: [
      { name: 'Філадельфія з лососем та крабом', price: 320, weight: 290, desc: 'Свіжий лосось, сніговий краб, крем-сир філадельфія, огірок' },
      { name: 'Каліфорнія з тигровою креветкою', price: 260, weight: 240, desc: 'Креветка, ікра тобіко, авокадо, японський майонез' },
      { name: 'Зелений Дракон з вугром', price: 360, weight: 280, desc: 'Копчений вугор, авокадо, крем-сир, соус унагі, кунжут' }
    ]
  },
  {
    name: 'Піца на дровах',
    dishes: [
      { name: 'Піца 4 Сири Преміум', price: 280, weight: 450, desc: 'Моцарела, дорблю, пармезан, брі, вершковий соус, горіхи' },
      { name: 'Піца Пепероні з моцарелою', price: 250, weight: 420, desc: 'Пікантна салямі пепероні, моцарела, томатний базиліковий соус' },
      { name: 'Піца з морепродуктами', price: 340, weight: 480, desc: 'Тигрові креветки, мідії, кальмари, вершковий соус, чері' }
    ]
  },
  {
    name: 'Гарячі закуски та Снеки',
    dishes: [
      { name: 'Картопля фрі з трюфельним соусом', price: 120, weight: 180, desc: 'Хрустка картопля фрі з пармезаном та трюфельним айолі' },
      { name: 'Сирні палички Моцарела з журавлиною', price: 150, weight: 200, desc: 'Тягуча моцарела у хрусткій золотистій паніровці' },
      { name: 'Курячі крильця BBQ у глазурі', price: 190, weight: 300, desc: 'Соковиті крильця у солодко-пікантному маринаді барбекю' }
    ]
  },
  {
    name: 'Свіжі салати',
    dishes: [
      { name: 'Салат Цезар з тигровими креветками', price: 240, weight: 270, desc: 'Листя ромен, тигрові креветки, чері, крутони, пармезан, соус цезар' },
      { name: 'Грецький салат з ніжним сиром фета', price: 170, weight: 250, desc: 'Томати, огірки, болгарський перець, оливки каламата, оливкова олія' }
    ]
  },
  {
    name: 'Супи та Рамени',
    dishes: [
      { name: 'Том Ям з морепродуктами', price: 270, weight: 400, desc: 'Гостро-кислий суп з креветками, мідіями, печерицями та кокосовим молоком' },
      { name: 'Рамен з куркою та яйцем адицуке', price: 210, weight: 450, desc: 'Насичений бульйон, пшенична локшина, ніжна курка, норі, зелена цибуля' }
    ]
  },
  {
    name: 'Десерти',
    dishes: [
      { name: 'Чизкейк Нью-Йорк з ягодами', price: 130, weight: 160, desc: 'Класичний ніжний сирний десерт з ягідним соусом' },
      { name: 'Шоколадний фондан з морозивом', price: 140, weight: 150, desc: 'Теплий шоколадний кекс з рідким центром та кулькою морозива' }
    ]
  },
  {
    name: 'Соуси та Діпи',
    dishes: [
      { name: 'Соус Сирний Чедер', price: 35, weight: 50, desc: 'Густий вершковий соус з витриманого сиру чедер' },
      { name: 'Соус Тартар фірмовий', price: 35, weight: 50, desc: 'Класичний соус з корнішонами, каперсами та свіжою зеленню' },
      { name: 'Соус Солодкий Чилі', price: 30, weight: 50, desc: 'Ароматний тайський соус для закусок та морепродуктів' }
    ]
  }
];

async function seed() {
  console.log('🚀 Початок створення категорій та страв у Poster POS через API...');

  const catRes = await fetch('https://joinposter.com/api/menu.getCategories?token=' + TOKEN);
  const catData = await catRes.json();
  const existingCategories = catData.response || [];

  const prodRes = await fetch('https://joinposter.com/api/menu.getProducts?token=' + TOKEN);
  const prodData = await prodRes.json();
  const existingProducts = prodData.response || [];

  for (const catSpec of categoriesToCreate) {
    let catId = undefined;
    const match = existingCategories.find(c => c.category_name.toLowerCase().trim() === catSpec.name.toLowerCase().trim());
    
    if (match) {
      catId = Number(match.category_id);
      console.log(`✓ Категорія "${catSpec.name}" вже існує (ID: ${catId})`);
    } else {
      console.log(`⏳ Створення категорії: "${catSpec.name}"...`);
      const createCatRes = await fetch('https://joinposter.com/api/menu.createCategory?token=' + TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_name: catSpec.name,
          parent_category: 0
        })
      });
      const createCatData = await createCatRes.json();
      if (createCatData.response) {
        catId = Number(createCatData.response);
        console.log(`✅ Категорію "${catSpec.name}" створено (ID: ${catId})`);
      } else {
        console.error(`⚠️ Помилка створення категорії "${catSpec.name}":`, createCatData);
        continue;
      }
    }

    for (const dish of catSpec.dishes) {
      const prodMatch = existingProducts.find(p => p.product_name.toLowerCase().trim() === dish.name.toLowerCase().trim());
      if (prodMatch) {
        console.log(`  ✓ Страва "${dish.name}" вже існує (ID: ${prodMatch.product_id})`);
      } else {
        console.log(`  ⏳ Створення страви: "${dish.name}" (${dish.price} ₴)...`);
        const createDishRes = await fetch('https://joinposter.com/api/menu.createDish?token=' + TOKEN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_name: dish.name,
            menu_category_id: catId,
            visible: 1,
            weight_flag: 0,
            workshop: 1,
            price: { [String(SPOT_ID)]: dish.price * 100 },
            weight: dish.weight,
            product_production_description: dish.desc
          })
        });
        const createDishData = await createDishRes.json();
        if (createDishData.response) {
          console.log(`  ✅ Страву "${dish.name}" створено (ID: ${createDishData.response})`);
        } else {
          console.error(`  ⚠️ Помилка створення страви "${dish.name}":`, createDishData);
        }
      }
    }
  }

  console.log('\n🎉 Всі категорії та страви успішно відправлені в Poster POS!');
}

seed();