function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const themeIconContainer = document.getElementById('theme-icon-container');

    // SVG иконка солнца
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    // SVG иконка луны
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    if (isDark) {
        themeIconContainer.innerHTML = moonIcon;
    } else {
        themeIconContainer.innerHTML = sunIcon;
    }
}

// Инициализируем тему при загрузке
initTheme();

let myMap;

// Локальные изображения для категорий
const categoryImages = {
    "сибирская": "./images/siberian.jpg",
    "русская": "./images/russian.jpg",
    "европейская": "./images/europian.jpg",
    "средиземноморская": "./images/srzem.jpg",
    "азиатская": "./images/asian.jpg",
    "кавказская": "./images/caucasion.jpg",
    "среднеазиатская": "./images/srasian.jpg",
    "американская": "./images/american.jpg",
    "авторская": "./images/authorian.jpg",
    "кофейни": "./images/coffee.jpg",
    "бары": "./images/bars.jpg"
};

// Картинка-заглушка на случай, если категория не найдена
const DEFAULT_IMAGE = "./images/europian.jpg";

const restaurants = [
    {
        id: "15-86",
        name: "Кафе «15/86»",
        category: "европейская",
        address: "ул. Володарского, 3",
        cuisine: "Европейская, Сибирская",
        price: "1 700 ₽",
        priceRange: "medium",
        tags: ["view", "modern", "romantic"],
        coordinates: [57.160580, 65.530214],
        dishes: "Стейк из стерляди, пельмени с косулей, запеченный камамбер с брусничным соусом",
        style: "Панорамная терраса у набережной реки Туры",
        description: "Видовой ресторан на набережной. Сочетает локальные сибирские продукты с европейскими технологиями приготовления.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/caf-15-86/"
    },
    {
        id: "poseydon",
        name: "Ресторан «Посейдон»",
        category: "европейская",
        address: "ул. Ленина, 2а",
        cuisine: "Рыбная, Морская, Европейская",
        price: "3 000 ₽",
        priceRange: "high",
        tags: ["classic", "luxury", "fish"],
        coordinates: [57.162460, 65.519998 ],
        dishes: "Плато морепродуктов, уха из северных рыб, запеченный лобстер",
        style: "Классический премиальный интерьер",
        description: "Один из старейших рыбных ресторанов города со строгим премиальным обслуживанием.",
        image: "detail_photo/seafood.jpg",
        link: "https://visittyumen.ru/places/restoran-poseydon/"
    },
    {
        id: "chum",
        name: "Ресторан-музей «Чум»",
        category: "сибирская",
        address: "ул. Малыгина, 59",
        cuisine: "Сибирская, Северная",
        price: "2 500 ₽",
        priceRange: "high",
        tags: ["authentic", "history", "exotic"],
        coordinates: [57.140873, 65.554444],
        dishes: "Строганина на ледяной глыбе, стейк из оленины, морошка с кедровыми орехами",
        style: "Музейный интерьер с элементами быта народов Севера",
        description: "Уникальный ресторан-музей, где можно попробовать настоящую кухню северных народов в аутентичной обстановке.",
        image: "detail_photo/spaghetti_with_yolk.avif",
        link: "https://visittyumen.ru/places/restoran-muzey-chum/"
    },
    {
        id: "vostok",
        name: "Ресторация «Восток»",
        category: "русская",
        address: "ул. Республики, 159",
        cuisine: "Русская, Советская",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["classic", "family"],
        coordinates: [57.136269, 65.574438],
        dishes: "Борщ с пампушками, пожарские котлеты, блины с красной рыбой",
        style: "Элегантный классический интерьер",
        description: "Ресторан традиционной русской и советской кухни в современном кулинарном прочтении.",
        image: "detail_photo/salad.avif",
        link: "https://visittyumen.ru/places/restoratsiya-vostok/"
    },
    {
        id: "polyanka",
        name: "Рестохолл «Полянка»",
        category: "авторская",
        address: "Червишевское муниципальное образование",
        cuisine: "Европейская, Локальная",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["nature", "family", "cozy"],
        coordinates: [56.936423, 65.528180],
        dishes: "Блюда на гриле, запеченная местная рыба, лесные десерты",
        style: "Загородный эко-стиль с панорамными окнами",
        description: "Уютный ресторан на территории экопарка. Отличное место для семейного обеда на лоне сибирской природы.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/restokholl-polyanka-caf-v-ekoparke-tayga/"
    },
    {
        id: "myata",
        name: "Ресторан «Мята»",
        category: "европейская",
        address: "ул. Советская, 20",
        cuisine: "Европейская, Современная",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["modern", "romantic", "lounge"],
        coordinates: [57.158618, 65.538173],
        dishes: "Салат с хрустящими баклажанами, утиная грудка с ягодным соусом",
        style: "Современный лофт с обилием живой зелени",
        description: "Стильное городское заведение с понятной и вкусной европейской кухней и авторскими коктейлями.",
        image: "detail_photo/salmon.avif",
        link: "https://visittyumen.ru/places/restoran-myata/"
    },
    {
        id: "potaskuy",
        name: "Ресторан «Потаскуй»",
        category: "русская",
        address: "ул. Хохрякова, 53а",
        cuisine: "Старорусская, Купеческая",
        price: "2 200 ₽",
        priceRange: "high",
        tags: ["history", "authentic"],
        coordinates: [57.154547, 65.544380],
        dishes: "Купеческие разносолы, запеченный поросенок, домашние настойки",
        style: "Атмосфера купеческого дома XIX века",
        description: "Ресторан расположен в историческом особняке и специализируется на воссоздании рецептов купеческой Тюмени.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/restoran-potaskuy/"
    },
    {
        id: "katso",
        name: "Ресторан «Кацо»",
        category: "кавказская",
        address: "ул. Республики, 143/2",
        cuisine: "Грузинская, Кавказская",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["cozy", "family", "meat"],
        coordinates: [57.140753, 65.565616],
        dishes: "Хинкали с телятиной, хачапури по-аджарски, шашлык на углях",
        style: "Колоритный грузинский интерьер с домашним уютом",
        description: "Традиционное кавказское гостеприимство, открытая кухня и обилие мясных национальных блюд.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/restoran-gruzinskoy-kukhni-katso/"
    },
    {
        id: "sibirsibir",
        name: "Ресторан «#СибирьСибирь»",
        category: "сибирская",
        address: "ул. Первомайская, 1а",
        cuisine: "Современная Сибирская",
        price: "2 600 ₽",
        priceRange: "high",
        tags: ["modern", "authentic", "luxury"],
        coordinates: [57.157510, 65.542044],
        dishes: "Тартар из косули, голубцы с гусем, запеченный муксун",
        style: "Высокий дизайн с сибирским характером",
        description: "Премиальный ресторан традиционной и новой северной кухни от известного ресторатора Дениса Иванова.",
        image: "detail_photo/pizza.avif",
        link: "https://visittyumen.ru/places/restoran-sibirsibir/"
    },
    {
        id: "sedlo",
        name: "Гриль-бар «Седло»",
        category: "бары",
        address: "ул. Ленина, 68/102",
        cuisine: "Американская, Мясная",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["meat", "beer", "friends"],
        coordinates: [57.151281, 65.538936],
        dishes: "Брискет из коптильни, свиные ребра BBQ, сочные бургеры",
        style: "Брутальный крафтовый интерьер",
        description: "Мясное заведение с упором на правильное копчение и приготовление стейков на открытом огне.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/gril-bar-sedlo/"
    },
    {
        id: "chito-grito",
        name: "Кафе «Чито-Грито»",
        category: "кавказская",
        address: "ул. Холодильная, 132",
        cuisine: "Грузинская",
        price: "1 000 ₽",
        priceRange: "low",
        tags: ["cozy", "family"],
        coordinates: [57.140616, 65.559570],
        dishes: "Пхали, сациви с курицей, люля-кебаб из баранины",
        style: "Простой, душевный кавказский интерьер",
        description: "Небольшое, но очень популярное семейное кафе с доступными ценами на классические кавказские специалитеты.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/kafe-chito-grito/"
    },
    {
        id: "remezov",
        name: "Ресторан «Ремезов»",
        category: "русская",
        address: "ул. Грибоедова, 6к1/7",
        cuisine: "Русская Дворянская",
        price: "2 000 ₽",
        priceRange: "high",
        tags: ["classic", "view"],
        coordinates: [57.149274, 65.532935],
        dishes: "Стерлядь по-царски, запеченная утка с яблоками, блины с икрой",
        style: "Аристократичный интерьер в стиле русского барокко",
        description: "Панорамный ресторан русской кухни на верхнем этаже отеля, воссоздающий атмосферу и вкусы дворянских застолий.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/restoran-remezov/"
    },
    {
        id: "razgovory",
        name: "Семейное кафе «Разговоры»",
        category: "европейская",
        address: "ул. Барнаульская, 60б",
        cuisine: "Европейская, Домашняя",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["family", "cozy", "breakfast"],
        coordinates: [57.167208, 65.458636],
        dishes: "Завтраки весь день, нежные сырники, паста с цыпленком",
        style: "Светлый, эстетичный скандинавский дизайн",
        description: "Уютное городское пространство для душевных разговоров, семейных обедов и эстетичных завтраков.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/semeynoe-kafe-razgovory/"
    },
    {
        id: "legkiy-chek",
        name: "Гастробар «Легкий чек»",
        category: "бары",
        address: "ул. Республики, 81",
        cuisine: "Европейская, Фьюжн",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["trendy", "friends"],
        coordinates: [57.146799, 65.553308],
        dishes: "Салат с креветками и манго, стейк из свиной шеи, авторские роллы",
        style: "Современный неоновый лофт",
        description: "Ресторан, работающий по системе True Cost — вход платный, а все блюда и напитки по себестоимости.",
        image: "detail_photo/salmon.avif",
        link: "https://visittyumen.ru/places/gastrobar-legkiy-chek/"
    },
    {
        id: "top-hop",
        name: "Крафтовый паб «Top Hop»",
        category: "бары",
        address: "ул. Республики, 39",
        cuisine: "Американская, Пивные закуски",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["beer", "friends", "night"],
        coordinates: [57.155111, 65.536862],
        dishes: "Бургер с рваной говядиной, крылышки Баффало, картофель фри с трюфельным соусом",
        style: "Современный паб с огромной пивной колонной",
        description: "Культовое барное место с колоссальным выбором крафтового пива со всего мира и отличным стритфудом.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/kraftovyy-pab-top-hop/"
    },
    {
        id: "chito-didi",
        name: "Грузинский ресторан «Чито-Диди»",
        category: "кавказская",
        address: "ул. Ленина, 78",
        cuisine: "Грузинская, Кавказская",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["family", "meat"],
        coordinates: [57.147085, 65.545861],
        dishes: "Хачапури по-имеретински, шашлык из баранины, оджахури",
        style: "Традиционный кавказский интерьер с обилием глиняной посуды",
        description: "Большой и просторный ресторан грузинской кухни, известный своими щедрыми порциями и сочным мясом.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/gruzinskiy-restoran-chito-didi/"
    },
    {
        id: "ayva",
        name: "Ресторан «Айва»",
        category: "среднеазиатская",
        address: "ул. Ю.-Р. Г. Эрвье, 32, стр. 1",
        cuisine: "Узбекская, Азербайджанская",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["cozy", "family"],
        coordinates: [57.169700, 65.565452],
        dishes: "Плов из баранины, казан-кебаб, долма, восточные сладости",
        style: "Роскошный восточный интерьер с узорами и шелком",
        description: "Ресторан аутентичной восточной кухни с глубоким уважением к среднеазиатским традициям гостеприимства.",
        image: "detail_photo/gyoza.avif",
        link: "https://visittyumen.ru/places/restoran-ayva/"
    },
    {
        id: "gornitsa",
        name: "Ресторан «Горница»",
        category: "русская",
        address: "ул. Тимофея Чаркова, 81к2",
        cuisine: "Русская традиционная",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["authentic", "family"],
        coordinates: [57.181447, 65.658487],
        dishes: "Суточные щи из печи, грузди со сметаной, пироги со стерлядью",
        style: "Стилизованная деревянная русская изба",
        description: "Классический русский ресторан, специализирующийся на старославянских рецептах кулинарии.",
        image: "detail_photo/salad.avif",
        link: "https://visittyumen.ru/places/restoran-gornitsa/"
    },
    {
        id: "sorrento",
        name: "Итальянский ресторан «Sorrento»",
        category: "средиземноморская",
        address: "ул. Республики, 142",
        cuisine: "Итальянская, Средиземноморская",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["romantic", "family"],
        coordinates: [57.137608, 65.566961],
        dishes: "Ризотто с морепродуктами, домашняя паста, тирамису",
        style: "Светлый классический средиземноморский интерьер",
        description: "Уютный ресторан с уклоном в итальянские гастрономические традиции и средиземноморские морепродукты.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/italyanskiy-restoran-sorrento/"
    },
    {
        id: "inkognito",
        name: "Бар «Инкогнито»",
        category: "бары",
        address: "ул. Орджоникидзе, 63а",
        cuisine: "Авторские коктейли, Снеки",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["night", "friends", "secret"],
        coordinates: [57.148865, 65.541572],
        dishes: "Сет мини-бургеров, тартар на чипсах, крафтовые настойки",
        style: "Приглушенный свет, концептуальный спикизи-бар",
        description: "Камерный скрытый бар с сильной коктейльной картой и атмосферой приватности.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-inkognito/"
    },
    {
        id: "a-point-live",
        name: "Ресторан «A Point Live»",
        category: "авторская",
        address: "ул. Комсомольская, 22",
        cuisine: "Европейская, Авторская",
        price: "2 200 ₽",
        priceRange: "high",
        tags: ["modern", "romantic", "view"],
        coordinates: [57.158499, 65.545388],
        dishes: "Осьминог с картофельным муссом, утиное филе с инжиром",
        style: "Элегантный премиум-дизайн с панорамными стеклами",
        description: "Концептуальный авторский ресторан высокой кухни с живой музыкой и утонченной атмосферой.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/restoran-a-point-live/"
    },
    {
        id: "vaffel",
        name: "Кафе «Vaffel»",
        category: "американская",
        address: "ул. Дзержинского, 31",
        cuisine: "Норвежские вафли, Стритфуд",
        price: "700 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast", "fastfood"],
        coordinates: [57.156106, 65.536284],
        dishes: "Сытные вафли со скремблом и лососем, сладкие вафли с ягодами",
        style: "Яркий молодежный скандинавский интерьер",
        description: "Специализированное стритфуд-кафе, где основой каждого сытного или сладкого блюда выступает шпинатная, томатная или классическая вафля.",
        image: "detail_photo/taco.avif",
        link: "https://visittyumen.ru/places/kafe-vaffel/"
    },
    {
        id: "yamal",
        name: "Кафе «Ямал»",
        category: "сибирская",
        address: "ул. Олимпийская, 9/1",
        cuisine: "Северная, Сибирская",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["authentic", "family"],
        coordinates: [57.113191, 65.584693],
        dishes: "Суп из оленины, уха из нельмы, пироги с таежными ягодами",
        style: "Сдержанный этно-интерьер северного края",
        description: "Семейное кафе традиционной локальной кухни, специализирующееся на продуктах Ямало-Ненецкого автономного округа.",
        image: "detail_photo/spaghetti_with_yolk.avif",
        link: "https://visittyumen.ru/places/kafe-yamal/"
    },
    {
        id: "china",
        name: "Ресторан «China»",
        category: "азиатская",
        address: "ул. Комсомольская, 8",
        cuisine: "Китайская, Паназиатская",
        price: "1 800 ₽",
        priceRange: "medium",
        tags: ["modern", "exotic"],
        coordinates: [57.158697, 65.542871],
        dishes: "Утка по-пекински, свинина в кисло-сладком соусе, димсамы",
        style: "Аутентичный азиатский неон и темные тона",
        description: "Ресторан паназиатской и классической китайской кухни со строгим соблюдением восточных рецептур.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/restoran-panaziatskoy-kukhni-china/"
    },
    {
        id: "uzbechka",
        name: "Ресторан «Узбечка»",
        category: "среднеазиатская",
        address: "ул. Перекопская, 4а",
        cuisine: "Узбекская, Среднеазиатская",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.160789, 65.523852],
        dishes: "Плов праздничный, манты с бараниной, шурпа, лагман",
        style: "Восточные ковры, орнаменты и мягкие топчаны",
        description: "Ресторан сытной и душевной узбекской кухни для больших семейных застолий.",
        image: "detail_photo/gyoza.avif",
        link: "https://visittyumen.ru/places/restoran-domashney-kukhni-uzbechka/"
    },
    {
        id: "tehnikum",
        name: "Гастробистро «Техникум»",
        category: "авторская",
        address: "ул. Ленина, 10",
        cuisine: "Авторская, Фьюжн",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["modern", "trendy"],
        coordinates: [57.159816, 65.522817],
        dishes: "Хрустящие тако с лососем, авторские эклеры с несладкими начинками",
        style: "Модный функциональный минимализм",
        description: "Трендовое гастрономическое пространство с необычными сочетаниями вкусов и яркой подачей.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/gastrobistro-tehnikum/"
    },
    {
        id: "koffein",
        name: "Кофейня-пекарня «Кофеин»",
        category: "кофейни",
        address: "ул. Республики, 46",
        cuisine: "Выпечка, Десерты",
        price: "500 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast"],
        coordinates: [57.154254, 65.537548],
        dishes: "Круассаны на сливочном масле, ремесленный хлеб, спешелти кофе",
        style: "Светлый скандинавский интерьер с запахом свежего хлеба",
        description: "Уютная городская кондитерская-пекарня, идеальная для утреннего завтрака и чашки кофе.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/kofeynya-pekarnya-koffein/"
    },
    {
        id: "palermo",
        name: "Кофейня «Palermo Caffe»",
        category: "кофейни",
        address: "ул. Пожарных и Спасателей, 5к1",
        cuisine: "Итальянский кофе, Выпечка",
        price: "450 ₽",
        priceRange: "low",
        tags: ["cozy", "work"],
        coordinates: [57.165607, 65.596943],
        dishes: "Капучино по-итальянски, панини с моцареллой, римская мини-пицца",
        style: "Элегантный средиземноморский кофейный уголок",
        description: "Спокойная городская кофейня с акцентом на классическую итальянскую обжарку зерен и свежие закуски.",
        image: "detail_photo/coffee_1.avif",
        link: "https://visittyumen.ru/places/kofeynya-palermo-caffe-casa/"
    },
    {
        id: "karty-govoryat",
        name: "Кофейня «Карты говорят»",
        category: "кофейни",
        address: "ул. Семакова, 2",
        cuisine: "Спешелти кофе, Авторские десерты",
        price: "600 ₽",
        priceRange: "low",
        tags: ["trendy", "cozy", "exotic"],
        coordinates: [57.160356, 65.533149],
        dishes: "Раф «Таро», латте с лавандой, муссовые пирожные",
        style: "Мистический интерьер с элементами астрологии и карт",
        description: "Концептуальное кофейное заведение с загадочной эстетикой, где к каждому напитку можно вытянуть метафорическую карту.",
        image: "detail_photo/coffee_2.avif",
        link: "https://visittyumen.ru/places/kofeynya-karty-govoryat/"
    },
    {
        id: "talk",
        name: "Гастробар «Talk»",
        category: "бары",
        address: "ул. Максима Горького, 74",
        cuisine: "Европейская, Авторская",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["trendy", "friends", "lounge"],
        coordinates: [57.146479, 65.557418],
        dishes: "Тартар из лосося с авокадо, утиная ножка конфи, коктейльная карта",
        style: "Минималистичный урбанистический дизайн",
        description: "Стильный гастробар, ориентированный на живое общение, изысканные мясные блюда и авторское барное меню.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/gastrobar-talk/"
    },
    {
        id: "nasledie",
        name: "Ресторан «Наследие»",
        category: "русская",
        address: "ул. Комсомольская, 19",
        cuisine: "Купеческая, Сибирская",
        price: "2 100 ₽",
        priceRange: "high",
        tags: ["history", "authentic", "classic"],
        coordinates: [57.158888, 65.544462],
        dishes: "Строганина из муксуна, жаркое в горшочке из кабана, настойки кустарного производства",
        style: "Дворянский особняк с резной мебелью",
        description: "Ресторан исторической русской кухни, воссоздающий атмосферу купеческих трапез старой Сибири.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/restoran-nasledie/"
    },
    {
        id: "barkhan",
        name: "Ресторан «Бархан»",
        category: "среднеазиатская",
        address: "ул. Орджоникидзе, 60/1",
        cuisine: "Восточная, Узбекская",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["family", "meat"],
        coordinates: [57.150771, 65.539396],
        dishes: "Шашлык из вырезки ягненка, чучвара шурпа, самса из тандыра",
        style: "Теплый колоритный оазис с мягкими диванами",
        description: "Просторное заведение с традиционной среднеазиатской кухней, каноничным пловом и открытым мангалом.",
        image: "detail_photo/gyoza.avif",
        link: "https://visittyumen.ru/places/restoran-barkhan/"
    },
    {
        id: "omar-khayyam",
        name: "Ресторан «Омар Хайям»",
        category: "среднеазиатская",
        address: "ул. 8 Марта, 2/8",
        cuisine: "Персидская, Восточная",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["lounge", "exotic"],
        coordinates: [57.155363, 65.544413],
        dishes: "Люля-кебаб птицы, садж с говядиной, пахлава ручной работы",
        style: "Атмосфера сказок «Тысячи и одной ночи»",
        description: "Сет-ресторан восточной кулинарии, названный в честь великого поэта, с широким ассортиментом мясных шедевров.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/set-restoranov-omar-khayyam/"
    },
    {
        id: "marina-koroleva",
        name: "Шоколадное ателье Марины Королевой",
        category: "кофейни",
        address: "ул. Комсомольская, 24",
        cuisine: "Шоколад премиум, Десерты",
        price: "800 ₽",
        priceRange: "medium",
        tags: ["cozy", "luxury", "romantic"],
        coordinates: [57.158463, 65.546122],
        dishes: "Трюфели ручной работы, горячий шоколад, фигурные плитки",
        style: "Изящный французский бутик-дизайн",
        description: "Авторское кондитерское ателье шоколада, специализирующееся на элитных сладостях и кофе ручной работы.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/shokoladnoe-atele-marina-koroleva/"
    },
    {
        id: "pasta-femili",
        name: "Ресторан «Паста Фэмили»",
        category: "средиземноморская",
        address: "ул. Тимофея Чаркова, 60",
        cuisine: "Итальянская",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["family", "romantic"],
        coordinates: [57.174750, 65.657790],
        dishes: "Феттуччини с грибами, лазанья классическая, пицца Четыре сыра",
        style: "Домашний семейный итальянский трактир",
        description: "Классический итальянский уголок с упором на традиционные макаронные изделия ручной лепки.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/restoran-italyanskoy-kukhni-pasta-femili/"
    },
    {
        id: "istorii-khleba",
        name: "Пекарня «Истории хлеба»",
        category: "кофейни",
        address: "ул. Свердлова, 2",
        cuisine: "Ремесленный хлеб, Выпечка",
        price: "400 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast"],
        coordinates: [57.159841, 65.551833],
        dishes: "Тартин на закваске, круассан миндальный, фильтр-кофе",
        style: "Уютный крафтовый эко-стиль пекарни",
        description: "Ремесленная кондитерская-пекарня полного цикла, известная выпечкой хлеба старинными методами.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/remeslennaya-pekarnya-istorii-khleba/"
    },
    {
        id: "principle",
        name: "Ресторан «Principle»",
        category: "европейская",
        address: "ул. Сакко, 24",
        cuisine: "Высокая Европейская",
        price: "2 500 ₽",
        priceRange: "high",
        tags: ["luxury", "modern", "romantic"],
        coordinates: [57.157467, 65.546049],
        dishes: "Тартар из телятины с трюфелем, филе-миньон, винная коллекция",
        style: "Строгий аристократический неоклассицизм",
        description: "Элитный гастрономический проект с авторской концепцией европейских кулинарных канонов.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/restoran-principle/"
    },
    {
        id: "mayrik",
        name: "Ресторан «Майрик»",
        category: "кавказская",
        address: "ул. Заводоуковская 11",
        cuisine: "Армянская, Кавказская",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["family", "authentic"],
        coordinates: [57.218234, 65.534011],
        dishes: "Хоровац на углях, долма в виноградных листьях, национальный хлеб матнакаш",
        style: "Каменный кавказский интерьер с элементами армянского быта",
        description: "Семейное заведение кавказской кухни, воспевающее традиционные рецепты армянских матерей.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/restoran-armyanskoy-kukhni-mayrik/"
    },
    {
        id: "pasta-salsa",
        name: "Ресторан «Pasta Salsa Osteria»",
        category: "средиземноморская",
        address: "ул. Сакко, 24",
        cuisine: "Итальянская, Средиземноморская",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["romantic", "modern"],
        coordinates: [57.157456, 65.545933],
        dishes: "Паста карбонара с гуанчале, равиоли с рикоттой, брускетты с томатами",
        style: "Современная городская итальянская остерия",
        description: "Итальянский ресторан с легкой средиземноморской концепцией, свежей зеленью и домашней пастой.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/restoran-pasta-salsa-osteria/"
    },
    {
        id: "brew-s-lee",
        name: "Бироварня «Brew's Lee»",
        category: "азиатская",
        address: "ул. Первомайская, 1а",
        cuisine: "Паназиатская, Крафт",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["friends", "beer", "exotic"],
        coordinates: [57.157300, 65.541815],
        dishes: "Том ям, лапша вок с говядиной, острые азиатские крылья",
        style: "Гонконгский уличный неон, стиль лофт-азия",
        description: "Уникальное сочетание азиатской бистро-кухни и крафтовой пивоварни с яркими восточными мотивами.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/aziatskaya-birovarnya-brew-s-lee/"
    },
    {
        id: "radis",
        name: "Ресторан «Радис»",
        category: "европейская",
        address: "ул. 25 Октября, 34",
        cuisine: "Европейская классическая",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["classic", "family"],
        coordinates: [57.159705, 65.546134],
        dishes: "Крем-суп из шампиньонов, медальоны из свинины, венский шницель",
        style: "Сдержанный деловой европейский стиль",
        description: "Ресторан классического формата со спокойной музыкой и проверенными временем европейскими блюдами.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/restoran-radis/"
    },
    {
        id: "d-ivanovich",
        name: "Сибирский бар «Д. Иванович»",
        category: "бары",
        address: "ул. Кузнецова, 4/2",
        cuisine: "Русские напитки, Настойки, Локальные закуски",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["bar", "authentic", "night"],
        coordinates: [57.151242, 65.533358],
        dishes: "Бутерброды с салом и селедкой, таежные настойки на ягодах",
        style: "Атмосфера сибирской интеллигентной рюмочной",
        description: "Концептуальный бар русских напитков и настоек, вдохновленный наследием великого ученого Менделеева.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/sibirskiy-bar-russkikh-napitkov-d-ivanovich-v-tyumeni/"
    },
    {
        id: "ale-garazh",
        name: "Бар «Алё, гараж!»",
        category: "бары",
        address: "ул. Герцена, 88",
        cuisine: "Стритфуд, Пивные сеты",
        price: "900 ₽",
        priceRange: "low",
        tags: ["friends", "beer", "night"],
        coordinates: [57.147116, 65.542309],
        dishes: "Гренки чесночные, фирменный бургер «Гараж», картофельные дольки",
        style: "Гаражный ретро-дизайн, автомобильная атрибутика",
        description: "Драйвовый тематический бар для неформального отдыха с друзьями, спортивных трансляций и пенного.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-ale-garazh/"
    },
    {
        id: "sinor-dzhovanni",
        name: "Мастерская «Синьор Джованни»",
        category: "средиземноморская",
        address: "ул. Федюнинского, 55",
        cuisine: "Итальянская, Пицца",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.106934, 65.559351],
        dishes: "Пицца на тонком тесте, домашние равиоли, брускетта с прошутто",
        style: "Небольшая уютная семейная траттория",
        description: "Гастрономическая мастерская, воссоздающая атмосферу уютных пиццерий на юге Италии.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/gastronomicheskaya-masterskaya-sinor-dzhovanni/"
    },
    {
        id: "strachatelli",
        name: "Мастерская сыра «Страчателли»",
        category: "средиземноморская",
        address: "ул. Федюнинского, 55",
        cuisine: "Сыры, Итальянская",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["cheese", "romantic"],
        coordinates: [57.106989, 65.559613],
        dishes: "Салат со страчателлой и томатами, паста в сырной голове, буррата",
        style: "Светлый лофт с элементами сыроваренного ремесла",
        description: "Локальный гастрономический проект с собственной мастерской по изготовлению мягких итальянских сыров.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/masterskaya-syra-strachatelli/"
    },
    {
        id: "pravda",
        name: "Сибирская рюмочная «Правда»",
        category: "бары",
        address: "ул. Осипенко, 81",
        cuisine: "Русские закуски, Домашние настойки",
        price: "800 ₽",
        priceRange: "low",
        tags: ["bar", "night", "friends"],
        coordinates: [57.156091, 65.561615],
        dishes: "Форшмак, бутерброды со шпротами, сет крафтовых настоек",
        style: "Советский ретро-минимализм рюмочной",
        description: "Концептуальное барное пространство с ностальгической советской эстетикой и качественными настойками.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/sibirskaya-ryumochnaya-pravda/"
    },
    {
        id: "pyshechnaya",
        name: "Городская «Пышечная»",
        category: "кофейни",
        address: "ул. Герцена, 97",
        cuisine: "Пышки, Выпечка",
        price: "350 ₽",
        priceRange: "low",
        tags: ["fastfood", "breakfast"],
        coordinates: [57.147341, 65.543158],
        dishes: "Горячие пышки в сахарной пудре, какао со сгущенкой",
        style: "Советский винтажный интерьер кондитерской",
        description: "Ностальгическое городское мини-кафе, где выпекают классические пышки по традиционным рецептам.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/pyshechnaya/"
    },
    {
        id: "tonko",
        name: "Кофейня-бистро «Тонко»",
        category: "кофейни",
        address: "ул. Советская, 55/1а",
        cuisine: "Десерты, Современная европейская",
        price: "800 ₽",
        priceRange: "medium",
        tags: ["cozy", "breakfast", "trendy"],
        coordinates: [57.155043, 65.546498],
        dishes: "Круассан Бенедикт, Блинный торт с матчей, кофейная классика",
        style: "Ультрасовременный пастельный минимализм",
        description: "Стильное городское бистро с упором на изящную подачу авторских десертов и бранчи.",
        image: "detail_photo/coffee_1.avif",
        link: "https://visittyumen.ru/places/set-kofeen-bistro-tonko/"
    },
    {
        id: "opera",
        name: "Ресторан «Opera»",
        category: "европейская",
        address: "ул. Центральная, 1",
        cuisine: "Европейская, Средиземноморская",
        price: "2 000 ₽",
        priceRange: "high",
        tags: ["classic", "romantic"],
        coordinates: [57.079206, 65.539547],
        dishes: "Стейк из лосося, утиная грудка су-вид, премиальные вина",
        style: "Классический театральный интерьер",
        description: "Премиум-ресторан при отеле с торжественной атмосферой, идеальный для банкетов и ужинов.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/opera-restaurant/"
    },
    {
        id: "selsovet",
        name: "Бар «Сельсовет» (Ермолаев)",
        category: "бары",
        address: "ул. Красных Зорь, 31",
        cuisine: "Пивные закуски, Мясо на гриле",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["beer", "friends", "night"],
        coordinates: [57.141745, 65.549099],
        dishes: "Фирменное пиво Ермолаев, колбаски собственного производства, чесночные гренки",
        style: "Стилизованный советский деревенский бар",
        description: "Народный пивной бар с демократичной атмосферой и линейкой локального крафтового пива.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-selsovet-ermolaev/"
    },
    {
        id: "traktir-ermolaev",
        name: "Трактир «Ермолаевъ»",
        category: "русская",
        address: "ул. Республики, 25",
        cuisine: "Русская купеческая, Пивная",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["authentic", "meat", "beer"],
        coordinates: [57.156447, 65.534146],
        dishes: "Свиное колено, сибирские пельмени, домашнее сало, живое пиво",
        style: "Традиционный купеческий трактир из дерева",
        description: "Сытная русская и сибирская кухня в сочетании с собственной пивоваренной картой бренда Ермолаев.",
        image: "detail_photo/salad.avif",
        link: "https://visittyumen.ru/places/traktir-ermolaev/"
    },
    {
        id: "avgust",
        name: "Ресторация «Август»",
        category: "авторская",
        address: "ул. Щербакова, 87к1",
        cuisine: "Русская, Европейская, Локальная",
        price: "1 700 ₽",
        priceRange: "medium",
        tags: ["classic", "romantic"],
        coordinates: [57.181113, 65.548981],
        dishes: "Запеченный муксун, филе говядины со сморчками, десерты",
        style: "Светлый элегантный классический стиль",
        description: "Изысканный ресторан авторской кухни с видом на историческую часть города у реки.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/restoratsiya-avgust/"
    },
    {
        id: "sportkomitet",
        name: "Бар «Ермолаев Спорткомитет»",
        category: "бары",
        address: "ул. Ямская, 86а",
        cuisine: "Закуски, Гриль, Бургеры",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["beer", "friends", "night"],
        coordinates: [57.161126, 65.493199],
        dishes: "Крылья BBQ, пивные сеты на компанию, бургеры",
        style: "Спортивный бар со стадионной атрибутикой",
        description: "Главная точка притяжения для любителей спортивных трансляций с отличным разливным пивом.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-ermolaev-sportkomitet/"
    },
    {
        id: "genshtab",
        name: "Гриль-паб «Генштаб» (Ермолаев)",
        category: "бары",
        address: "ул. Тульская, 7",
        cuisine: "Мясная, Пивная",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["beer", "meat", "friends"],
        coordinates: [57.131262, 65.577581],
        dishes: "Стейк рибай, свиные ребра в глазури, фирменное фильтрованное",
        style: "Милитари-стилистика, массивные столы",
        description: "Брутальный гриль-паб для ценителей хорошего мяса на углях и классических сортов пива.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/gril-pab-genshtab-ermolaev/"
    },
    {
        id: "pyatstsa",
        name: "Ресторан «Пьяцца»",
        category: "средиземноморская",
        address: "ул. Пожарных и Спасателей, 3к1",
        cuisine: "Итальянская",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["family", "romantic"],
        coordinates: [57.164215, 65.596240],
        dishes: "Пицца Маргарита, спагетти с морепродуктами, панна котта",
        style: "Классическая залитая светом пиццерия",
        description: "Традиционный ресторан итальянской кухни с семейной атмосферой в центре Тюмени.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/restoran-italyanskoy-kukhni-pyatstsa/"
    },
    {
        id: "krasnodarskiy-paren",
        name: "Бургерная «Краснодарский парень»",
        category: "американская",
        address: "ул. Ленина, 57а",
        cuisine: "Бургеры, Американский стритфуд",
        price: "800 ₽",
        priceRange: "low",
        tags: ["fastfood", "friends"],
        coordinates: [57.154256, 65.535619],
        dishes: "Бургер «Кубанский пижон», бургер «Федор», сырные палочки",
        style: "Стильный южный уличный лофт",
        description: "Крафтовая бургерная лавка с огромными многоэтажными бургерами и уникальными авторскими соусами.",
        image: "detail_photo/taco.avif",
        link: "https://visittyumen.ru/places/burgernaya-krasnodarskiy-paren/"
    },
    {
        id: "goryachiy-tsekh",
        name: "Ресторан «Горячий цех»",
        category: "американская",
        address: "ул. Республики, 42",
        cuisine: "Мясная, Гриль, Копчение",
        price: "1 800 ₽",
        priceRange: "medium",
        tags: ["meat", "trendy", "modern"],
        coordinates: [57.155368, 65.535122],
        dishes: "Копченый брискет, брискет-бургер, стейки сухого вызревания",
        style: "Индустриальный лофт с огромным открытым огненным цехом",
        description: "Уникальный мясной ресторан, специализирующийся на технологии открытого огня и длительного копчения мяса.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/restoran-goryachiy-tsekh/"
    },
    {
        id: "kofe-bryut",
        name: "Кофейня «Кофе Брют»",
        category: "кофейни",
        address: "ул. Советская, 55",
        cuisine: "Спешелти кофе, Завтраки",
        price: "600 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast"],
        coordinates: [57.154886, 65.546731],
        dishes: "Фильтр-кофе, бенедикт с лососем, панкейки с черникой",
        style: "Эстетичный лаконичный минимализм",
        description: "Стильное городское пространство для истинных ценителей качественной кофейной альтернативы и поздних завтраков.",
        image: "detail_photo/coffee_1.avif",
        link: "https://visittyumen.ru/places/gorodskaya-kofeynya-kofe-bryut/"
    },
    {
        id: "midiynoe-mesto",
        name: "Ресторан «Мидийное место»",
        category: "средиземноморская",
        address: "ул. Дзержинского, 31",
        cuisine: "Морская, Черноморская",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["fish", "trendy", "fastfood"],
        coordinates: [57.156256, 65.536590],
        dishes: "Мидии в сырном соусе в кастрюльке, хрустящий багет, устрицы",
        style: "Уличный морской прибрежный концепт",
        description: "Популярный ресторан стрит-фуд формата морепродуктов, визитной карточкой которого являются кастрюльки свежих мидий в соусах.",
        image: "detail_photo/seafood.jpg",
        link: "https://visittyumen.ru/places/restoran-moreproduktov-midiynoe-mesto/"
    },
    {
        id: "cremant",
        name: "Ресторан «Cremant»",
        category: "европейская",
        address: "ул. Николая Машарова, 2/1",
        cuisine: "Французская, Европейская",
        price: "2 300 ₽",
        priceRange: "high",
        tags: ["romantic", "luxury"],
        coordinates: [57.148022, 65.553011],
        dishes: "Луковый суп, улитки эскарго, крем-брюле, игристые вина",
        style: "Утонченный парижский шик",
        description: "Элегантный ресторан французской гастрономической эстетики и классических европейских традиций.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/restoran-frantsuzskoy-kukhni-cremant/"
    },
    {
        id: "tortobelka",
        name: "Кофейня «Тортобелка»",
        category: "кофейни",
        address: "ул. Дзержинского, 40",
        cuisine: "Кондитерские изделия, Авторские торты",
        price: "500 ₽",
        priceRange: "low",
        tags: ["family", "cozy"],
        coordinates: [57.156328, 65.535897],
        dishes: "Пирожное Павлова, фисташковый рулет, раф карамель",
        style: "Милый десертный кукольный интерьер",
        description: "Семейная уютная кондитерская, славящаяся своими натуральными праздничными тортами и пирожными.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/kofeynya-tortobelka/"
    },
    {
        id: "khochu-puri",
        name: "Ресторанчик «Хочу Пури»",
        category: "кавказская",
        address: "ул. Республики, 42",
        cuisine: "Грузинская, Кавказская",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.154798, 65.536101],
        dishes: "Хачапури по-аджарски лодочка, хинкали сочные, люля из цыпленка",
        style: "Современный теплый кавказский интерьер с глиняными печами",
        description: "Атмосферное и всегда оживленное заведение с акцентом на выпечку каноничных грузинских хачапури.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/gruzinskiy-restoranchik-khochu-puri/"
    },
    {
        id: "taprum-ermolaev",
        name: "Тапрум «Ермолаев»",
        category: "бары",
        address: "пр-д Воронинские горки, 178",
        cuisine: "Крафтовое пиво, Стритфуд закуски",
        price: "900 ₽",
        priceRange: "low",
        tags: ["beer", "friends", "night"],
        coordinates: [57.178976, 65.476864],
        dishes: "Свиные уши к пиву, бургер острый, картофельные вафли",
        style: "Минималистичный барный тап-рум с кранами пива",
        description: "Фирменный дегустационный зал пивоварни Ермолаев с самым свежим розливом экспериментальных сортов.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/taprum-ermolaev/"
    },
    {
        id: "sami-susami",
        name: "Дом грузинской кухни «Сами Сусами»",
        category: "кавказская",
        address: "ул. Володарского, 20",
        cuisine: "Грузинская традиционная",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["family", "cozy", "meat"],
        coordinates: [57.157119, 65.535948],
        dishes: "Хинкали с сыром, чахохбили, шашлык из свиной шеи, чача",
        style: "Грузинский колоритный дом, много ковров и зелени",
        description: "Ресторан душевного кавказского гостеприимства с классическими многовековыми рецептами.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/dom-gruzinskoy-kukhni-sami-susami/"
    },
    {
        id: "ruki-vverkh",
        name: "Бар «Руки Вверх!»",
        category: "бары",
        address: "ул. Челюскинцев, 40",
        cuisine: "Европейская, Русская барная",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["night", "friends", "dance"],
        coordinates: [57.156378, 65.532908],
        dishes: "Сковородка от мамы, коктейли «Алешка» и «Досвидос»",
        style: "Ностальгический интерьер эпохи 90-х и нулевых",
        description: "Легендарный танцевальный караоке-бар Сергея Жукова с атмосферой дискотек нашей молодости.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-ruki-vverkh/"
    },
    {
        id: "granny-s-bar",
        name: "Бар «Granny's Bar»",
        category: "бары",
        address: "ул. Мельникайте, 98",
        cuisine: "Миксология, Авторские бургеры",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["bar", "night", "trendy"],
        coordinates: [57.140862, 65.570284],
        dishes: "Коктейли в необычной посуде, стейк-салат, ребра барбекю",
        style: "Уютный винтажный барный концепт с английским характером",
        description: "Один из лучших коктейльных баров города с сильной командой барменов и уникальной миксологией.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/granny-s-bar/"
    },
    {
        id: "mesto-gusto",
        name: "Семейный ресторан «Mesto Gusto»",
        category: "средиземноморская",
        address: "ул. Мельникайте, 137",
        cuisine: "Итальянская, Европейская",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.121314, 65.549674],
        dishes: "Ризотто с грибами, равиоли с лососем, пицца на пышном тесте",
        style: "Теплый семейный итальянский дом",
        description: "Уютный ресторан европейско-итальянской кухни с большой детской игровой комнатой.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/semeynyy-restoran-mesto-gusto/"
    },
    {
        id: "zdorove",
        name: "Рюмочная «Здоровье»",
        category: "бары",
        address: "ул. Дзержинского, 38",
        cuisine: "Настойки, Закуски",
        price: "700 ₽",
        priceRange: "low",
        tags: ["bar", "night", "friends"],
        coordinates: [57.156579, 65.536638],
        dishes: "Бутерброд с килькой, настойка облепиха, домашние пельмени",
        style: "Винтажный медицинский аптечный ретро-стиль рюмочной",
        description: "Ироничный бар-рюмочная с концептуальными настойками «для поправки здоровья» и советскими закусками.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-zdorove/"
    },
    {
        id: "optimist",
        name: "Кофейня «Optimist Coffee»",
        category: "кофейни",
        address: "ул. Челюскинцев, 36",
        cuisine: "Спешелти кофе, Современные десерты",
        price: "500 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast", "work"],
        coordinates: [57.156904, 65.533247],
        dishes: "Эспрессо-тоник, сырники из фермерского творога, овсяная каша с манго",
        style: "Яркий урбанистический минимализм",
        description: "Современная городская спешелти-кофейня, популярная среди фрилансеров и любителей минимализма.",
        image: "detail_photo/coffee_1.avif",
        link: "https://visittyumen.ru/places/kofeynya-optimist-coffee-/"
    },
    {
        id: "gastro-maksim",
        name: "Историческая гастрокофейня «Максим»",
        category: "кофейни",
        address: "ул. Семакова, 19",
        cuisine: "Кондитерские изделия, Европейские бранчи",
        price: "900 ₽",
        priceRange: "medium",
        tags: ["cozy", "history", "breakfast"],
        coordinates: [57.158041, 65.529709],
        dishes: "Фирменный торт «Максим», круассан со скремблом, раф сибирский",
        style: "Классический кофейный интерьер в историческом особняке",
        description: "Флагманская историческая кофейня старейшей ресторанной сети города с авторскими тортами.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/istoricheskaya-gastrokofeynya-maksim/"
    },
    {
        id: "dvoryanskoe-gnezdo",
        name: "Банкетный ресторан «Дворянское гнездо»",
        category: "русская",
        address: "ул. Советская, 20",
        cuisine: "Русская аристократическая",
        price: "2 500 ₽",
        priceRange: "high",
        tags: ["classic", "luxury"],
        coordinates: [57.158755, 65.538157],
        dishes: "Стерлядь запеченная целиком, заливное, мясные купеческие нарезки",
        style: "Пышное русское барокко, хрусталь и позолота",
        description: "Торжественный банкетный ресторан премиум-класса для пышных исторических свадеб и юбилеев.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/banketnyy-restoran-dvoryanskoe-gnezdo/"
    },
    {
        id: "budu-pozdno",
        name: "Бар «Буду поздно»",
        category: "бары",
        address: "ул. ​Герцена, 63",
        cuisine: "Коктейли, Европейские закуски",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["bar", "night", "friends"],
        coordinates: [57.150961, 65.535902],
        dishes: "Картофель фри с сырным муссом, авторские коктейли на джине",
        style: "Приглушенный неоновый свет, современная музыка",
        description: "Популярный молодежный ночной бар с танцевальной зоной и концептуальной картой лонг-дринков.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-budu-pozdno/"
    },
    {
        id: "blizhe-k-delu",
        name: "Ресторан «Ближе к делу»",
        category: "европейская",
        address: "ул. Холодильная, 77",
        cuisine: "Европейская современная",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["classic", "modern"],
        coordinates: [57.139793, 65.559132],
        dishes: "Салат с хрустящей уткой, стейк мясной, крем-суп тыквенный",
        style: "Деловой современный ресторанный интерьер",
        description: "Городской ресторан в центре Тюмени, ориентированный на бизнес-ланчи и комфортные ужины.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/restoran-blizhe-k-delu/"
    },
    {
        id: "green",
        name: "Кафе «Green»",
        category: "авторская",
        address: "ул. Водопроводная, 30",
        cuisine: "Вегетарианская, Полезное питание, Фьюжн",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["cozy", "trendy"],
        coordinates: [57.155688, 65.543318],
        dishes: "Боул с авокадо и тофу, веган-бургер, смузи детокс",
        style: "Эко-минимализм, обилие растений и светлого дерева",
        description: "Концептуальное зеленое кафе здорового и сбалансированного питания с авторскими позициями.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/kafe-green/"
    },
    {
        id: "garden",
        name: "Кофейня «Garden»",
        category: "кофейни",
        address: "ул. Республики, 42",
        cuisine: "Спешелти кофе, Кондитерские изделия",
        price: "450 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast", "work"],
        coordinates: [57.155142, 65.535966],
        dishes: "Раф сибирский с кедровым орехом, банановый кекс, флэт уайт",
        style: "Светлый лофт с зелеными растениями",
        description: "Популярная сеть городских спешелти-кофеен с высоким стандартом обжарки и заваривания кофе.",
        image: "detail_photo/coffee_1.avif",
        link: "https://visittyumen.ru/places/kofeynya-garden/"
    },
    {
        id: "harats",
        name: "Паб «Harat's Pub»",
        category: "бары",
        address: "ул. 50 лет Октября, 10",
        cuisine: "Ирландская, Пивные сеты, Гриль",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["beer", "friends", "night"],
        coordinates: [57.153068, 65.566011],
        dishes: "Ирландское рагу, фиш энд чипс, бургер с беконом",
        style: "Классический аутентичный ирландский паб из темного дуба",
        description: "Шумный сетевой ирландский паб со спортивными трансляциями и рок-н-ролльным духом.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/harat-s-pub/"
    },
    {
        id: "tvorchestvo",
        name: "Бар с кухней «Творчество»",
        category: "бары",
        address: "ул. Молодежная, 74с4",
        cuisine: "Европейская барная, Коктейли",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["bar", "trendy", "friends"],
        coordinates: [57.130279, 65.545202],
        dishes: "Тартар на поджаренном бриоше, авторские коктейли на травах",
        style: "Арт-интерьер с картинами местных художников",
        description: "Концептуальный бар-кухня, объединяющий современное искусство, гастрономию и коктейли.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-s-kukhney-tvorchestvo/"
    },
    {
        id: "mestia",
        name: "Гастробар «Mestia»",
        category: "бары",
        address: "ул. Дзержинского, 38",
        cuisine: "Авторская северная, Скандинавская",
        price: "1 900 ₽",
        priceRange: "high",
        tags: ["trendy", "modern"],
        coordinates: [57.156478, 65.536488],
        dishes: "Грудка утки со свеклой, паштет из печени косули с брусникой",
        style: "Темный суровый скандинавский минимализм",
        description: "Стильный нордический гастробар с локальными продуктами в сложной авторской интерпретации.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/gastrobar-mestia/"
    },
    {
        id: "kontora",
        name: "Рестобар «Контора»",
        category: "бары",
        address: "ул. 25 Октября, 23ас1",
        cuisine: "Европейская авторская, Фьюжн",
        price: "1 600 ₽",
        priceRange: "medium",
        tags: ["modern", "view", "trendy"],
        coordinates: [57.161210, 65.547352],
        dishes: "Стейк мясной на гриле, креветки васаби, коктейли",
        style: "Индустриальный кирпичный исторический лофт",
        description: "Стильный ресторан на набережной Туры, объединяющий авторское меню и ночную барную карту.",
        image: "detail_photo/salmon.avif",
        link: "https://visittyumen.ru/places/restobar-kontora/"
    },
    {
        id: "hobbit-hall",
        name: "Паб «Hobbit Hall»",
        category: "бары",
        address: "ул. Николая Фёдорова, 9",
        cuisine: "Европейская, Пивные сеты",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["friends", "beer", "authentic"],
        coordinates: [57.119013, 65.565023],
        dishes: "Мясная тарелка Средиземья, бургер Хоббита, крафтовое пиво",
        style: "Фэнтезийный сказочный стиль по мотивам Толкина",
        description: "Атмосферный паб, полностью воссоздающий внутреннее убранство домика хоббита из Шира.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/pab-hobbit-hall/"
    },
    {
        id: "big-apple",
        name: "Паб «Big Apple Pub»",
        category: "бары",
        address: "ул. Осипенко, 73",
        cuisine: "Американская барная, Гриль",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["beer", "friends", "night"],
        coordinates: [57.157166, 65.558425],
        dishes: "Нью-Йоркский стейк, крылья в остром соусе, бургер с беконом",
        style: "Нью-Йоркский традиционный кирпичный паб",
        description: "Классическое американское барное пространство в Тюмени с упором на стейки и импортное пенное.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/big-apple-pub/"
    },
    {
        id: "salinger",
        name: "Бар «J.D. Salinger»",
        category: "бары",
        address: "ул. Фабричная, 1",
        cuisine: "Миксология, Авторские закуски",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["night", "trendy", "secret"],
        coordinates: [57.147158, 65.559664],
        dishes: "Коктейли «Над пропастью во ржи», тартар мясной, паштеты",
        style: "Литературный интеллектуальный лофт, приглушенный свет",
        description: "Атмосферный концептуальный бар с упором на интеллектуальную миксологию и культуру спикизи.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-j-d-salinger/"
    },
    {
        id: "fresca",
        name: "Мексиканский бар «Fresca»",
        category: "бары",
        address: "ул. Республики, 42",
        cuisine: "Мексиканская, Латиноамериканская",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["bar", "exotic", "night"],
        coordinates: [57.155444, 65.535161],
        dishes: "Тако со свининой пастор, кесадилья, классическая маргарита",
        style: "Яркий мексиканский колорит со скрытым баром",
        description: "Камерный концептуальный бар с латиноамериканской атмосферой, мексиканским стритфудом и текилой.",
        image: "detail_photo/taco.avif",
        link: "https://visittyumen.ru/places/meksikanskiy-bar-fresca-/"
    },
    {
        id: "pavlin",
        name: "Чайхана «Павлин»",
        category: "среднеазиатская",
        address: "ул. Николая Зелинского, 17",
        cuisine: "Узбекская, Восточная",
        price: "1 250 ₽",
        priceRange: "medium",
        tags: ["family", "meat"],
        coordinates: [57.113594, 65.560523],
        dishes: "Плов свадебный, самса с рубленой говядиной, лагман уйгурский",
        style: "Восточные ткани, пестрые узоры и уютные кабинки",
        description: "Большая традиционная чайхана для сытного кавказского и среднеазиатского обеда всей семьей.",
        image: "detail_photo/gyoza.avif",
        link: "https://visittyumen.ru/places/chaykhana-pavlin/"
    },
    {
        id: "kishmish",
        name: "Ресторан «Кишмиш»",
        category: "среднеазиатская",
        address: "ул. Малыгина, 6",
        cuisine: "Азербайджанская, Восточная",
        price: "1 350 ₽",
        priceRange: "medium",
        tags: ["family", "meat"],
        coordinates: [57.144421, 65.546207],
        dishes: "Люля-кебаб из телятины, кутабы с зеленью, садж мясной",
        style: "Классический кавказско-восточный узорчатый ресторан",
        description: "Ресторан домашней кавказской и среднеазиатской кулинарии с каноничным казан-кебабом на углях.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/restoran-kishmish/"
    },
    {
        id: "bake-up",
        name: "Кофейня-пекарня «Bake Up»",
        category: "кофейни",
        address: "ул. Первомайская, 1а",
        cuisine: "Выпечка, Кондитерские изделия",
        price: "600 ₽",
        priceRange: "low",
        tags: ["breakfast", "cozy"],
        coordinates: [57.157809, 65.541738],
        dishes: "Сендвич в круассане, краффин с кремом, латте соленая карамель",
        style: "Европейский современный минималистичный интерьер пекарни",
        description: "Стильная ремесленная кондитерская с широким ассортиментом слоеного теста и утреннего фильтр-кофе.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/kofeynya-pekarnya-bake-up/"
    },
    {
        id: "dragons-ramen",
        name: "Бистро «Dragon's Ramen»",
        category: "азиатская",
        address: "ул. Водопроводная, 14/1",
        cuisine: "Японская, Рамен-бистро",
        price: "900 ₽",
        priceRange: "low",
        tags: ["exotic", "fastfood"],
        coordinates: [57.158093, 65.544413],
        dishes: "Тонкоцу рамен с бужениной, сякэ дон, онигири с лососем",
        style: "Японский стрит-киоск, аниме-атрибутика",
        description: "Уютное тематическое азиатское бистро, специализирующееся на варке наваристых традиционных японских раменов.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/bistro-dragon-s-ramen/"
    },
    {
        id: "tomyumbar",
        name: "Ресторан «TomYamBar»",
        category: "азиатская",
        address: "ул. Первомайская, 14а",
        cuisine: "Паназиатская",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["exotic", "trendy"],
        coordinates: [57.154559, 65.535635],
        dishes: "Том ям с креветками разной остроты, фо бо, вок с морепродуктами",
        style: "Современный паназиатский неон-лофт",
        description: "Специализированный ресторан паназиатской кухни, знаменитый культовым супом том ям.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/restoran-tomyumbar/"
    },
    {
        id: "tortsher",
        name: "Кофейня-кондитерская «ТортШер»",
        category: "кофейни",
        address: "ул. Максима Горького, 70",
        cuisine: "Авторские кондитерские изделия",
        price: "550 ₽",
        priceRange: "low",
        tags: ["cozy", "family"],
        coordinates: [57.149276, 65.559585],
        dishes: "Торт «Эстерхази», эклеры ванильные, авторский латте",
        style: "Пастельный французский кофейный салон",
        description: "Камерная городская кондитерская лавка с богатой картой десертов ручной работы на натуральных сливках.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/kofeynya-konditerskaya-tortsher/"
    },
    {
        id: "gruzinka-nani",
        name: "Ресторан «Грузинка Нани»",
        category: "кавказская",
        address: "ул. Первомайская, 48",
        cuisine: "Грузинская домашняя",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["family", "cozy", "meat"],
        coordinates: [57.150167, 65.527963],
        dishes: "Хинкали с говядиной и свининой, сациви, хачапури по-менгрельски",
        style: "Теплый грузинский ресторан с глиняными кувшинами",
        description: "Ресторан высокой грузинской гастрономии, славящийся радушным приемом и обильными порциями.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/restoran-gruzinka-nani/"
    },
    {
        id: "lodka",
        name: "Ресторан «Лодка»",
        category: "азиатская",
        address: "ул. Урицкого, 5",
        cuisine: "Паназиатская, Морепродукты",
        price: "1 900 ₽",
        priceRange: "high",
        tags: ["modern", "fish", "exotic"],
        coordinates: [57.157096, 65.526463],
        dishes: "Том ям с крабом, роллы премиум класса, димсамы со специями",
        style: "Концептуальный дизайн, дерево и канаты в интерьере",
        description: "Премиальный ресторан восточной и паназиатской кухни, предлагающий гостям обилие экзотических морепродуктов.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/restoran-lodka/"
    },
    {
        id: "turgenev",
        name: "Ресторация «Тургенев»",
        category: "русская",
        address: "ул. Семакова, 8",
        cuisine: "Русская дворянская",
        price: "2 400 ₽",
        priceRange: "high",
        tags: ["history", "classic", "luxury"],
        coordinates: [57.159569, 65.531811],
        dishes: "Строганина из стерляди, запеченная дичь, старинные наливки",
        style: "Аристократический дворянский особняк XIX века",
        description: "Роскошный классический ресторан в исторической усадьбе, воспроизводящий гастрономию царской эпохи.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/restoratsiya-turgenev/"
    },
    {
        id: "syrovarnya",
        name: "Ресторан «Сыроварня»",
        category: "средиземноморская",
        address: "ул. Советская, 54",
        cuisine: "Итальянская, Деревенская",
        price: "2 200 ₽",
        priceRange: "high",
        tags: ["family", "cheese"],
        coordinates: [57.156417, 65.543028],
        dishes: "Свежая буррата, пицца из дровяной печи, домашний сырники",
        style: "Деревенский шик с открытой сыроварней",
        description: "Знаменитый семейный ресторан Аркадия Новикова, где мягкие сыры производят прямо на месте.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/restoran-syrovarnya-/"
    },
    {
        id: "van-gogi",
        name: "Кафе «Ван Гоги»",
        category: "кавказская",
        address: "ул. Республики, 34",
        cuisine: "Грузинская городская",
        price: "1 250 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.156090, 65.534099],
        dishes: "Хинкали мини в сливочном соусе, хачапури пеновани, шашлыки",
        style: "Современный кавказский интерьер с репродукциями картин",
        description: "Концептуальное ироничное кафе, объединяющее грузинское хлебосольство и европейскую культуру.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/kafe-van-gogi/"
    },
    {
        id: "green-house",
        name: "Ресторан «Green House»",
        category: "европейская",
        address: "ул. Николая Федорова, 9",
        cuisine: "Европейская классическая",
        price: "2 500 ₽",
        priceRange: "high",
        tags: ["luxury", "classic", "romantic"],
        coordinates: [57.119317, 65.564111],
        dishes: "Филе миньон с трюфельным соусом, салат с утиной грудкой, изысканные десерты",
        style: "Замковый аристократический интерьер",
        description: "Роскошный ресторан при бутик-отеле в виде средневекового замка, идеальное место для торжественных приемов.",
        image: "detail_photo/black_rest.avif",
        link: "https://visittyumen.ru/places/restoran-green-hous/"
    },
    {
        id: "solovinaya-roshcha",
        name: "Ресторан «Соловьиная роща»",
        category: "русская",
        address: "ул. Сибирская, 74",
        cuisine: "Русская загородная, Сибирская",
        price: "1 800 ₽",
        priceRange: "medium",
        tags: ["family", "classic", "nature"],
        coordinates: [57.089133, 65.552244],
        dishes: "Запеченный поросенок, купеческий борщ, сибирская дичь под ягодным соусом",
        style: "Классический усадебный русский стиль",
        description: "Традиционный русский ресторан у лесопарковой зоны, славящийся проведением широких торжеств и купеческой кухней.",
        image: "detail_photo/salad.avif",
        link: "https://visittyumen.ru/places/restoran-solovinaya-roshcha/"
    },
    {
        id: "brooklyn-bowl",
        name: "Боулинг-ресторан «Brooklyn Bowl»",
        category: "американская",
        address: "ул. Тимофея Чаркова, 60",
        cuisine: "Американская, Гриль, Бургеры",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["friends", "meat", "fastfood"],
        coordinates: [57.175191, 65.656328],
        dishes: "Свиные ребра барбекю, крафтовые бургеры, стейки, пивные сеты",
        style: "Яркий бруклинский лофт, совмещенный с дорожками боулинга",
        description: "Уникальный масштабный формат, совмещающий ресторанную гриль-кухню высокого уровня и спортивный боулинг.",
        image: "detail_photo/taco.avif",
        link: "https://visittyumen.ru/places/bouling-restoran-brooklyn-bowl/"
    },
    {
        id: "kak-my-lyubim",
        name: "Бургерная «Как Мы Любим»",
        category: "американская",
        address: "ул. 8 Марта, 2/9а",
        cuisine: "Крафт-бургеры, Картофель фри",
        price: "750 ₽",
        priceRange: "low",
        tags: ["fastfood", "friends"],
        coordinates: [57.155584, 65.544640],
        dishes: "Бургер со смородиновым вареньем и камамбером, черные бургеры",
        style: "Уличный андеграундный молодежный лофт",
        description: "Культовая локальная бургерная лаборатория с оригинальными смелыми гастрономическими сочетаниями.",
        image: "detail_photo/taco.avif",
        link: "https://visittyumen.ru/places/burgernaya-kak-my-lyubim/"
    },
    {
        id: "beograd",
        name: "Ресторан «Beograd Кафана»",
        category: "европейская",
        address: "ул. Малыгина, 52",
        cuisine: "Сербская, Балканская",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["meat", "family"],
        coordinates: [57.141423, 65.552409],
        dishes: "Плескавица с сыром, чевапчичи, сербский салат, балканский суп",
        style: "Традиционная сербская городская кафана",
        description: "Аутентичный ресторан балканской кухни, славящийся огромными мясными позициями по традиционным рецептам Белграда.",
        image: "detail_photo/steak_with_tomato.avif",
        link: "https://visittyumen.ru/places/restoran-beograd-kafana/"
    },
    {
        id: "maksimych",
        name: "Русский ресторан «МаксиМыч»",
        category: "русская",
        address: "ул. 50 лет Октября, 52",
        cuisine: "Старорусская купеческая",
        price: "2 200 ₽",
        priceRange: "high",
        tags: ["authentic", "family", "history"],
        coordinates: [57.143612, 65.584257],
        dishes: "Уха из стерляди и налима, царские блины с икрой, кулебяка мясная",
        style: "Деревянный терем в стиле купеческих палат",
        description: "Тематический ресторан старорусской кухни премиум-класса с воссозданными старинными ритуалами трапезы.",
        image: "detail_photo/salad.avif",
        link: "https://visittyumen.ru/places/russkiy-restoran-maksimych/"
    },
    {
        id: "tesla-burger",
        name: "Бургерная «Tesla Burger»",
        category: "американская",
        address: "ул. Федюнинского, 67",
        cuisine: "Бургеры, Стритфуд",
        price: "650 ₽",
        priceRange: "low",
        tags: ["fastfood", "friends"],
        coordinates: [57.103180, 65.570507],
        dishes: "Tesla бургер, бургер с брусничным соусом, сырные подушечки",
        style: "Современное технологичное экспресс-кафе",
        description: "Крупная локальная сеть качественного бургерного фастфуда со знаменитыми ягодными и сырными соусами.",
        image: "detail_photo/taco.avif",
        link: "https://visittyumen.ru/places/burgernaya-tesla-burger/"
    },
    {
        id: "malina",
        name: "Кафе-бар «Малина»",
        category: "бары",
        address: "ул. Первомайская, 18",
        cuisine: "Европейская, Коктейли",
        price: "1 200 ₽",
        priceRange: "medium",
        tags: ["lounge", "friends", "night"],
        coordinates: [57.153502, 65.534892],
        dishes: "Паста с морепродуктами, салат Цезарь с цыпленком, легкие барные сеты",
        style: "Современный уютный городской лаунж",
        description: "Универсальное городское заведение с понятной европейской кухней, кальянами и коктейльной картой.",
        image: "detail_photo/salmon.avif",
        link: "https://visittyumen.ru/places/kafe-bar-malina/"
    },
    {
        id: "bashi",
        name: "Грузинское бистро «Баши»",
        category: "кавказская",
        address: "ул. Володарского, 43",
        cuisine: "Грузинский стритфуд",
        price: "950 ₽",
        priceRange: "low",
        tags: ["fastfood", "cozy"],
        coordinates: [57.154820, 65.541053],
        dishes: "Хинкали классические, хачапури по-аджарски, суп харчо",
        style: "Минималистичное светлое кавказское бистро",
        description: "Современный быстрый формат грузинской кухни, ориентированный на скорость подачи и высокое качество выпечки.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/gruzinskoe-bistro-bashi/"
    },
    {
        id: "svoya-kompaniya",
        name: "Ресторан «Своя Компания»",
        category: "европейская",
        address: "ул. Республики, 163",
        cuisine: "Европейская, Японская, Семейная",
        price: "1 100 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.134944, 65.575963],
        dishes: "Роллы Филадельфия, паста карбонара, сырный суп, пицца",
        style: "Мягкий домашний интерьер с книжными полками",
        description: "Популярная сеть мягких семейных ресторанов с огромным универсальным меню на любой гастрономический вкус.",
        image: "detail_photo/cafe.avif",
        link: "https://visittyumen.ru/places/uyutnyy-restoran-svoya-kompaniya/"
    },
    {
        id: "anderson",
        name: "Семейное кафе «АндерСон»",
        category: "европейская",
        address: "ул. Осипенко, 73",
        cuisine: "Европейская детская и взрослая",
        price: "1 400 ₽",
        priceRange: "medium",
        tags: ["family", "cozy"],
        coordinates: [57.157008, 65.558907],
        dishes: "Детские стилизованные котлетки, паста, авторские пирожные",
        style: "Сказка, огромная игровая зона, мягкие кресла",
        description: "Семейное уютное кондитерское кафе с уникальной детской анимацией, игровыми комнатами и семейным меню.",
        image: "detail_photo/coffee.avif",
        link: "https://visittyumen.ru/places/semeynoe-kafe-anderson/"
    },
    {
        id: "plov-lounge",
        name: "Ресторан «Plov Lounge»",
        category: "среднеазиатская",
        address: "ул. Ленина, 68/102",
        cuisine: "Узбекская, Чайхана фьюжн",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["lounge", "family", "meat"],
        coordinates: [57.151306, 65.538978],
        dishes: "Чайханский плов, казан-кебаб из телятины, восточные лепешки",
        style: "Лаунж-бар, ковры в современном прочтении, мягкий свет",
        description: "Ресторан современной узбекской кухни в формате стильного городского лаунжа с кальянами и открытым грилем.",
        image: "detail_photo/gyoza.avif",
        link: "https://visittyumen.ru/places/plov-lounge/"
    },
    {
        id: "prokofev",
        name: "Кофейня «Прокофьев»",
        category: "кофейни",
        address: "ул. Республики, 26",
        cuisine: "Кофейная классика, Торты",
        price: "450 ₽",
        priceRange: "low",
        tags: ["cozy", "breakfast"],
        coordinates: [57.157717, 65.530955],
        dishes: "Классический раф, эклеры, круассаны с шоколадом",
        style: "Классический музыкально-литературный кофейный салон",
        description: "Тихая академическая городская кофейня рядом с филармонией, идеальная для встреч за чашкой чая.",
        image: "detail_photo/coffee_1.avif",
        link: "https://visittyumen.ru/places/kofeynya-prokofev/"
    },
    {
        id: "sameba",
        name: "Ресторан «Самеба»",
        category: "кавказская",
        address: "ул. Ленина, 38/1",
        cuisine: "Грузинская классическая",
        price: "1 500 ₽",
        priceRange: "medium",
        tags: ["family", "meat"],
        coordinates: [57.154679, 65.532558],
        dishes: "Хинкали сочные, хачапури по-аджарски лодочка, шашлык мясной",
        style: "Традиционный кавказский интерьер с винными бочками",
        description: "Большой семейный ресторан кавказской кухни, специализирующийся на классических рецептах Тбилиси.",
        image: "detail_photo/salad_1.avif",
        link: "https://visittyumen.ru/places/restoran-sameba/"
    },
    {
        id: "dacha",
        name: "Загородный ресторан «Дача»",
        category: "авторская",
        address: "д. Дударева, ул. Тюменская, 9",
        cuisine: "Русская усадебная, Локальная",
        price: "2 200 ₽",
        priceRange: "high",
        tags: ["nature", "family", "authentic"],
        coordinates: [57.116897, 65.471545],
        dishes: "Барбекю на веранде, запеченная стерлядь, домашние пироги со смородиной",
        style: "Дворянская дачная усадьба, светлые террасы",
        description: "Элегантный загородный ресторан, воспроизводящий дореволюционную дачную гастрономию интеллигенции.",
        image: "detail_photo/red_rest.avif",
        link: "https://visittyumen.ru/places/zagorodnyy-restoran-dacha/"
    },
    {
        id: "chikho",
        name: "Китайская закусочная «Чихо»",
        category: "азиатская",
        address: "ул. Дзержинского, 31",
        cuisine: "Китайский стритфуд",
        price: "850 ₽",
        priceRange: "low",
        tags: ["exotic", "fastfood", "trendy"],
        coordinates: [57.156093, 65.536290],
        dishes: "Лапша Чихо, говядина в устричном соусе, битые огурцы",
        style: "Аутентичный сумасшедший стрит-дизайн Пекина с иероглифами",
        description: "Шумная концептуальная китайская закусочная с атмосферой неоновых переулков азиатских мегаполисов.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/kitayskaya-zakusochnaya-chikho/"
    },
    {
        id: "rzhavyy-ded",
        name: "Бар «Ржавый дед»",
        category: "бары",
        address: "ул. Хохрякова, 47",
        cuisine: "Европейская барная, Гриль, Коктейли",
        price: "1 300 ₽",
        priceRange: "medium",
        tags: ["friends", "night", "beer"],
        coordinates: [57.155642, 65.542102],
        dishes: "Фирменный бургер «Дед», мясная сковорода, крафтовое пиво, настойки",
        style: "Концептуальный стимпанк интерьер, обилие шестеренок",
        description: "Один из известнейших концепт-баров города с уникальным дизайном в стиле стимпанк и сильной барной кухней.",
        image: "detail_photo/bar.avif",
        link: "https://visittyumen.ru/places/bar-rzhavyy-ded/"
    },
    {
        id: "96-aziatok",
        name: "Бистро «96 азиаток»",
        category: "азиатская",
        address: "ул. Герцена, 96",
        cuisine: "Вьетнамская, Паназиатская",
        price: "950 ₽",
        priceRange: "low",
        tags: ["exotic", "fastfood"],
        coordinates: [57.146935, 65.542813],
        dishes: "Суп фо бо, немы с крабом, том ям с креветками, жареный рис",
        style: "Современный минималистичный азиатский стрит-дизайн",
        description: "Уютное городское паназиатское бистро, славящееся каноничным вьетнамским супом фо бо на говяжьем бульоне.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/bistro-96-aziatok/"
    },
    {
        id: "chiko",
        name: "Корейский стритфуд «CHIKO»",
        category: "азиатская",
        address: "ул. Республики, 65",
        cuisine: "Корейская, K-Pop стритфуд",
        price: "900 ₽",
        priceRange: "low",
        tags: ["exotic", "trendy", "fastfood"],
        coordinates: [57.148320, 65.550752],
        dishes: "Корн-доги, токпокки в остром соусе, корейский жареный цыпленок, бабл ти",
        style: "Яркий розово-неоновый интерьер, K-Pop культура и постеры",
        description: "Трендовое молодежное корейское кафе, полностью посвященное современной корейской поп-культуре и стритфуду.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/chiko/"
    },
    {
        id: "umi",
        name: "Ресторан «Umi»",
        category: "азиатская",
        address: "ул. Ленина, 57а",
        cuisine: "Японская премиум, Суши",
        price: "2 100 ₽",
        priceRange: "high",
        tags: ["modern", "fish", "exotic"],
        coordinates: [57.154438, 65.534182],
        dishes: "Сашими из тунца блюфин, премиальные роллы без риса, гунканы",
        style: "Изысканный японский премиальный минимализм",
        description: "Элитный японский гастрономический ресторан, специализирующийся на поставках редкой дикой рыбы напрямую из Токио.",
        image: "detail_photo/baozi.avif",
        link: "https://visittyumen.ru/places/restoran-umi/"
    }
];

// Глобальные сущности приложения
let map = null;
let isQuizFinished = false;
let geoCollection;
let userMarkersCollection = null; // Отдельная коллекция для маркера пользователя
let currentCategory = 'all';
let currentTab = 'catalog';
let previousTab = 'catalog'; // Для отслеживания, из какой вкладки мы открыли детали
let coordsCache = {};
let activeMultiRoute = null; // Для хранения построенной линии пути
let placemarksByRestaurant = {}; // Словарь: restaurantId -> placemark для фильтрации маркеров
let targetMarkersCollection = null; // Коллекция для целевых маркеров найденных ресторанов
let quizResultsData = [];
let nearestGeoRestaurant = null; // ИСПРАВЛЕНО: Хранилище для найденного ближайшего заведения
// Очередь геокодирования
let geoQueue = [];
let isGeocoding = false;

// Данные гастрономического теста
const quizQuestions = [
    {
        id: 1,
        question: "Какова основная цель вашего визита?",
        answers: [
            { text: "Попробовать уникальные локальные специалитеты", tag: "authentic" },
            { text: "Провести романтический вечер или насладиться видом", tag: "view" },
            { text: "Отдохнуть большой компанией / встретиться с друзьями", tag: "company" },
            { text: "Поужинать в тихой, спокойной обстановке", tag: "quiet" }
        ]
    },
    {
        id: 2,
        question: "Какому меню отдаете предпочтение?",
        answers: [
            { text: "Оленина, дичь, таежные ягоды и северная рыба", tag: "authentic" },
            { text: "Изысканные европейские блюда и морепродукты", tag: "modern" },
            { text: "Сочное мясо на углях, хачапури и хинкали", tag: "meat" },
            { text: "Легкие закуски, кофе и десерты", tag: "quiet" }
        ]
    },
    {
        id: 3,
        question: "Какая атмосфера вам ближе?",
        answers: [
            { text: "Историческая реконструкция / купеческий особняк", tag: "history" },
            { text: "Современный стильный интерьер / панорамные окна", tag: "view" },
            { text: "Шумное кавказское гостеприимство", tag: "company" },
            { text: "Уютный скандинавский минимализм", tag: "family" }
        ]
    },
    {
        id: 4,
        question: "На какой бюджет ужина вы рассчитываете?",
        answers: [
            { text: "Демократичный (до 1200 ₽)", budget: "low" },
            { text: "Средний чек (1200 ₽ - 2000 ₽)", budget: "medium" },
            { text: "Премиальный уровень (от 2000 ₽)", budget: "high" }
        ]
    }
];

let quizCurrentIndex = 0;
let quizUserTags = [];
let quizUserBudget = "";

// Инициализация карт Яндекса
ymaps.ready(initMap);

function initMap() {
    map = new ymaps.Map("map", {
        center: [57.1522, 65.5414],
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl']
    });

    geoCollection = new ymaps.GeoObjectCollection();
    map.geoObjects.add(geoCollection);

    userMarkersCollection = new ymaps.GeoObjectCollection();
    map.geoObjects.add(userMarkersCollection);

    targetMarkersCollection = new ymaps.GeoObjectCollection();
    map.geoObjects.add(targetMarkersCollection);

    // Первичный рендеринг заведений и списков
    renderRestaurants();
    buildRouteSelectorList();

    const countSpan = document.getElementById('restaurants-count');
    if (countSpan && typeof restaurants !== 'undefined') {
        countSpan.innerText = `Заведений в базе: ${restaurants.length}`;
    }

    // Запуск конвейера геокодирования
    if (typeof restaurants !== 'undefined') {
        restaurants.forEach(r => {
            geoQueue.push(r);
        });
        processGeoQueue();
    }
}

// Конвейер последовательного геокодирования
function processGeoQueue() {
    if (geoQueue.length === 0) {
        console.log("Все адреса превращены в метки. Перерисовываю карту...");
        renderRestaurants();
        return;
    }

    const r = geoQueue.shift();

    if (r.coordinates) {
        coordsCache[r.id] = r.coordinates;
        createPlacemark(r.coordinates, r);
        isGeocoding = false;
        setTimeout(processGeoQueue, 50);
    } else {
        const fullAddress = r.address.toLowerCase().includes('тюмень')
            ? r.address
            : `Тюмень, ${r.address}`;

        ymaps.geocode(fullAddress, { results: 1 }).then(function (res) {
            const firstObj = res.geoObjects.get(0);
            if (firstObj) {
                const meta = firstObj.properties.get('metaDataProperty').GeocoderMetaData;
                console.log(`Адрес "${r.name}" найден как: ${meta.text} (точность: ${meta.precision})`);

                if (meta.precision !== 'exact' && meta.precision !== 'near') {
                    console.warn("⚠️ Неточный адрес для:", r.name);
                }

                const coords = firstObj.geometry.getCoordinates();
                coordsCache[r.id] = coords;
                createPlacemark(coords, r);
            }
            isGeocoding = false;
            setTimeout(processGeoQueue, 200);
        }).catch(err => {
            console.error("Ошибка геокодирования:", err);
            isGeocoding = false;
            setTimeout(processGeoQueue, 200);
        });
    }
}

function createPlacemark(coords, restaurant) {
    const placemark = new ymaps.Placemark(coords, {
        balloonContentHeader: `<b style="color:#d47b52;">${restaurant.name}</b>`,
        balloonContentBody: `
            <div style="font-family:sans-serif;font-size:12px;color:#333;">
                <p><b>Кухня:</b> ${restaurant.cuisine}</p>
                <p><b>Адрес:</b> ${restaurant.address}</p>
                <p><b>Средний чек:</b> ${restaurant.price}</p>
            </div>
        `,
        hintContent: restaurant.name
    }, {
        preset: 'islands#orangeFoodIcon',
        hideIconOnBalloonOpen: false
    });

    placemark.events.add('click', function () {
        showRestaurantDetails(restaurant.id, true);
    });

    placemarksByRestaurant[restaurant.id] = placemark;

    const cat = (restaurant.category || '').toLowerCase().trim();
    const target = (currentCategory || 'all').toLowerCase().trim();

    if (target === 'all' || cat === target) {
        geoCollection.add(placemark);
    }
}

// Переключение вкладки сайдбара
// Автоматическая и безопасная инициализация переменной для ближайшего пути, чтобы JS не падал
if (typeof window.activeNearestRoute === 'undefined') {
    window.activeNearestRoute = null;
}

function switchTab(tabId) {
    currentTab = tabId;
    const tabs = ['catalog', 'quiz', 'services'];

    tabs.forEach(t => {
        document.getElementById(`tab-${t}`).classList.add('hidden');
        document.getElementById(`tab-btn-${t}`).classList.remove('text-[#d47b52]', 'border-[#d47b52]');
        document.getElementById(`tab-btn-${t}`).classList.add('text-gray-500', 'dark:text-zinc-400', 'border-transparent');
    });

    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    document.getElementById(`tab-btn-${tabId}`).classList.add('text-[#d47b52]', 'border-[#d47b52]');
    document.getElementById(`tab-btn-${tabId}`).classList.remove('text-gray-500', 'dark:text-zinc-400', 'border-transparent');

    const filterContainer = document.getElementById('category-filters');

    // Если уходим с навигации - прячем линию маршрута с карты (но не удаляем из памяти!)
    if (tabId !== 'services' && activeMultiRoute && map) {
        map.geoObjects.remove(activeMultiRoute);
    }

    if (tabId === 'quiz') {
        if (filterContainer) filterContainer.classList.add('hidden');

        if (!isQuizFinished) {
            if (geoCollection) geoCollection.removeAll();
            if (targetMarkersCollection) targetMarkersCollection.removeAll();
            if (userMarkersCollection) userMarkersCollection.removeAll();
        } else {
            // ВОССТАНАВЛИВАЕМ маркеры теста при переходе на вкладку!
            renderQuizMarkers();
        }
    }
    else if (tabId === 'catalog') {
        if (filterContainer) filterContainer.classList.remove('hidden');
        renderRestaurants();
    }
    else if (tabId === 'services') {
        if (filterContainer) filterContainer.classList.add('hidden');

        // Очищаем слой общего каталога
        if (geoCollection) geoCollection.removeAll();

        // 1. СНАЧАЛА восстанавливаем ближайшее заведение
        // Отрисовываем его первым, чтобы его внутренние очистки карт НЕ ломали экскурсию
        if (nearestGeoRestaurant) {
            renderNearestGeoComponents();
        } else {
            if (targetMarkersCollection) targetMarkersCollection.removeAll();
        }

        // 2. СЛЕДОМ восстанавливаем/пересобираем экскурсионный маршрут
        // Проверяем чекбоксы. Если пользователь их выбрал — маршрут ДОЛЖЕН БЫТЬ на карте железно!
        const checkboxes = document.querySelectorAll('.route-checkbox:checked');

        if (checkboxes.length >= 2) {
            const points = [];
            const routeRestaurants = [];

            checkboxes.forEach(cb => {
                const id = cb.value;
                const restaurant = restaurants.find(r => r.id == id);
                const rCoords = ensureArrayCoords(coordsCache[id]);
                if (rCoords && restaurant) {
                    points.push(rCoords);
                    routeRestaurants.push(restaurant);
                }
            });

            if (points.length >= 2) {
                // Если квиз или геолокация полностью стерли линию из памяти карты — создаем её заново
                if (!activeMultiRoute && typeof ymaps !== 'undefined') {
                    activeMultiRoute = new ymaps.Polyline(points, {
                        balloonContent: "Ваш экскурсионный гастро-маршрут"
                    }, {
                        strokeColor: "#d47b52",
                        strokeWidth: 4,
                        strokeOpacity: 0.85,
                        strokeStyle: 'shortdash'
                    });
                }

                // Force-добавление линии на карту (удаляем старую копию, если она была, и ставим чистую)
                if (map) {
                    map.geoObjects.remove(activeMultiRoute);
                    map.geoObjects.add(activeMultiRoute);
                }

                // Генерируем оранжевые маркеры поверх того, что нарисовал гео-поиск
                routeRestaurants.forEach(r => {
                    const coords = ensureArrayCoords(coordsCache[r.id]);
                    if (coords) {
                        const pm = new ymaps.Placemark(coords, {
                            balloonContentHeader: `<b style="color:#d47b52;">${r.name}</b>`,
                            balloonContentBody: `Адрес: ${r.address}`
                        }, {
                            preset: 'islands#orangeFoodIcon',
                            zIndex: 8000
                        });
                        targetMarkersCollection.add(pm);
                    }
                });
            }
        } else {
            // Если галочек нет, а линия осталась в памяти — убираем её с карты
            if (activeMultiRoute && map) {
                map.geoObjects.remove(activeMultiRoute);
                activeMultiRoute = null;
            }
        }

        // Финально выводим объединенную коллекцию маркеров (Ближайший + Экскурсия) на карту
        if (map && targetMarkersCollection) {
            map.geoObjects.add(targetMarkersCollection);
        }
    }
}

// Генерация списка каталога
function renderRestaurants(filterText = '') {
    const listContainer = document.getElementById('restaurants-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (typeof geoCollection !== 'undefined' && geoCollection) {
        geoCollection.removeAll();
    }

    if (typeof restaurants === 'undefined') return;

    const filtered = restaurants.filter(r => {
        const cat = (r.category || '').toLowerCase().trim();
        const target = (currentCategory || 'all').toLowerCase().trim();

        const matchesCategory = (target === 'all') || (cat === target);
        const matchesSearch = filterText === '' ||
            (r.name && r.name.toLowerCase().includes(filterText.toLowerCase())) ||
            (r.dishes && r.dishes.toLowerCase().includes(filterText.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = '<p class="text-xs text-gray-500 dark:text-zinc-500 p-4">Ничего не найдено.</p>';
    }

    filtered.forEach(r => {
        if (typeof placemarksByRestaurant !== 'undefined' && placemarksByRestaurant[r.id]) {
            geoCollection.add(placemarksByRestaurant[r.id]);
        }

        const card = document.createElement('div');
        card.id = `card-${r.id}`;
        card.className = 'restaurant-card p-4 rounded-xl cursor-pointer transition-all';
        card.addEventListener('click', () => showRestaurantDetails(r.id, true));

        card.innerHTML = `
            <div class="flex justify-between items-start gap-2">
                <h4 class="font-bold text-sm text-gray-900 dark:text-white">${r.name}</h4>
                <span class="text-[10px] uppercase font-bold tracking-wider text-[#d47b52] px-2 py-0.5 rounded bg-[#d47b52]/10 border border-[#d47b52]/20 shrink-0">${r.category}</span>
            </div>
            <p class="text-xs text-gray-500 dark:text-zinc-400 mt-1.5 line-clamp-2">${r.description || ''}</p>
        `;
        listContainer.appendChild(card);
    });
}

function showRestaurantDetails(id, panTo = false) {
    if (typeof restaurants === 'undefined') return;
    const r = restaurants.find(item => item.id === id);
    if (!r) return;

    previousTab = currentTab;
    console.log("💾 Сохранена предыдущая вкладка:", previousTab);

    if (activeMultiRoute && map) {
        map.geoObjects.remove(activeMultiRoute);
    }

    document.querySelectorAll('.restaurant-card').forEach(card => card.classList.remove('active'));
    const activeCard = document.getElementById(`card-${id}`);
    if (activeCard) {
        activeCard.classList.add('active');
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Определяем ключ категории (приводим к нижнему регистру)
    const categoryKey = (r.category || '').toLowerCase();
    // Берём картинку из объекта или заглушку
    const imageSrc = r.image || categoryImages[categoryKey] || DEFAULT_IMAGE;
    document.getElementById('details-img').src = imageSrc;
    document.getElementById('details-badge').innerText = r.category || '';
    document.getElementById('details-name').innerText = r.name || '';
    document.getElementById('details-cuisine').innerText = r.cuisine || '';
    document.getElementById('details-desc').innerText = r.description || '';
    document.getElementById('details-address').innerText = r.address || '';
    document.getElementById('details-price').innerText = `Средний чек: ${r.price || ''}`;
    document.getElementById('details-dishes').innerText = r.dishes || '';
    document.getElementById('details-style').innerText = r.style || '';

    document.getElementById('details-link').href = r.link || '#';
    document.getElementById('details-slide').classList.remove('hidden');

    if (panTo && map) {
        const targetCoords = coordsCache[id];
        if (targetCoords) {
            addTargetMarker(targetCoords, r);

            map.panTo(targetCoords, { flying: true, duration: 500 }).then(() => {
                map.setZoom(16, { duration: 150 });
            });
        }
    }
}

function addTargetMarker(coords, restaurant) {
    if (targetMarkersCollection) {
        targetMarkersCollection.removeAll();
    }

    const targetMarker = new ymaps.Placemark(coords, {
        balloonContentHeader: `<b style="color:#d47b52;">${restaurant.name}</b>`,
        balloonContentBody: `
            <div style="font-family:sans-serif;font-size:12px;color:#333;">
                <p><b>Кухня:</b> ${restaurant.cuisine}</p>
                <p><b>Адрес:</b> ${restaurant.address}</p>
                <p><b>Чек:</b> ${restaurant.price}</p>
            </div>
        `,
        hintContent: restaurant.name
    }, {
        preset: 'islands#orangeFoodIcon',
        hideIconOnBalloonOpen: false,
        zIndex: 8000
    });

    if (targetMarkersCollection) {
        targetMarkersCollection.add(targetMarker);
    }
}

function closeDetails() {
    const detailsSlide = document.getElementById('details-slide');
    if (detailsSlide) detailsSlide.classList.add('hidden');

    switchTab(previousTab);

    if (previousTab === 'quiz' && isQuizFinished) {
        renderQuizMarkers();
    }
    else if (previousTab === 'services') {
        if (nearestGeoRestaurant) {
            renderNearestGeoComponents();
        }
        // ВОЗВРАЩАЕМ линию маршрута после закрытия деталей
        if (activeMultiRoute && map) {
            map.geoObjects.add(activeMultiRoute);
            const checkboxes = document.querySelectorAll('.route-checkbox:checked');

        if (checkboxes.length >= 2) {
            const points = [];
            const routeRestaurants = [];

            checkboxes.forEach(cb => {
                const id = cb.value;
                const restaurant = restaurants.find(r => r.id == id);
                const rCoords = ensureArrayCoords(coordsCache[id]);
                if (rCoords && restaurant) {
                    points.push(rCoords);
                    routeRestaurants.push(restaurant);
                }
            });

            if (points.length >= 2) {
                // Если квиз или геолокация полностью стерли линию из памяти карты — создаем её заново
                if (!activeMultiRoute && typeof ymaps !== 'undefined') {
                    activeMultiRoute = new ymaps.Polyline(points, {
                        balloonContent: "Ваш экскурсионный гастро-маршрут"
                    }, {
                        strokeColor: "#d47b52",
                        strokeWidth: 4,
                        strokeOpacity: 0.85,
                        strokeStyle: 'shortdash'
                    });
                }

                // Force-добавление линии на карту (удаляем старую копию, если она была, и ставим чистую)
                if (map) {
                    map.geoObjects.remove(activeMultiRoute);
                    map.geoObjects.add(activeMultiRoute);
                }

                // Генерируем оранжевые маркеры поверх того, что нарисовал гео-поиск
                routeRestaurants.forEach(r => {
                    const coords = ensureArrayCoords(coordsCache[r.id]);
                    if (coords) {
                        const pm = new ymaps.Placemark(coords, {
                            balloonContentHeader: `<b style="color:#d47b52;">${r.name}</b>`,
                            balloonContentBody: `Адрес: ${r.address}`
                        }, {
                            preset: 'islands#orangeFoodIcon',
                            zIndex: 8000
                        });
                        targetMarkersCollection.add(pm);
                    }
                });
            }
        }
        }
    }
    else {
        if (targetMarkersCollection) {
            targetMarkersCollection.removeAll();
        }
        if (map) {
            map.setZoom(13);
        }
    }
}

function filterCategory(category, btnElement) {
    currentCategory = category.toLowerCase();

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active', 'bg-[#d47b52]', 'text-white'));
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.add('text-gray-500', 'dark:text-zinc-400'));

    if (btnElement) {
        btnElement.classList.add('active', 'bg-[#d47b52]', 'text-white');
        btnElement.classList.remove('text-gray-500', 'dark:text-zinc-400');
    }

    renderRestaurants('');
}

// ================= MODULE 2: КВИЗ-ТЕСТИРОВАНИЕ =================

function startQuiz() {
    quizCurrentIndex = 0;
    quizUserTags = [];
    quizUserBudget = "";
    isQuizFinished = false;
    quizResultsData = [];
    nearestGeoRestaurant = null; // ИСПРАВЛЕНО: Очищаем прошлый гео-подбор при запуске нового теста

    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-process').classList.remove('hidden');

    if (geoCollection) geoCollection.removeAll();
    if (targetMarkersCollection) targetMarkersCollection.removeAll();
    if (userMarkersCollection) userMarkersCollection.removeAll();
    clearBuiltRoute();

    showQuizQuestion();
}

function showQuizQuestion() {
    const q = quizQuestions[quizCurrentIndex];

    document.getElementById('quiz-progress-text').innerText = `Вопрос ${quizCurrentIndex + 1} из ${quizQuestions.length}`;
    document.getElementById('quiz-progress-bar').style.width = `${((quizCurrentIndex + 1) / quizQuestions.length) * 100}%`;
    document.getElementById('quiz-question').innerText = q.question;

    const answersContainer = document.getElementById('quiz-answers');
    if (!answersContainer) return;
    answersContainer.innerHTML = '';

    q.answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.innerText = ans.text;
        btn.onclick = () => handleQuizAnswer(ans);
        answersContainer.appendChild(btn);
    });
}

function handleQuizAnswer(answer) {
    if (answer.tag) quizUserTags.push(answer.tag);
    if (answer.budget) quizUserBudget = answer.budget;

    quizCurrentIndex++;
    if (quizCurrentIndex < quizQuestions.length) {
        showQuizQuestion();
    } else {
        calculateQuizResult();
    }
}

function renderQuizMarkers() {
    if (!map || quizResultsData.length === 0) return;

    if (geoCollection) geoCollection.removeAll();
    if (targetMarkersCollection) targetMarkersCollection.removeAll();
    if (userMarkersCollection) userMarkersCollection.removeAll();

    quizResultsData.forEach(r => {
        const coords = ensureArrayCoords(coordsCache[r.id]);
        if (coords) {
            const targetMarker = new ymaps.Placemark(coords, {
                balloonContentHeader: `<b style="color:#d47b52;">${r.name}</b>`,
                balloonContentBody: `
                    <div style="font-family:sans-serif;font-size:12px;color:#333;">
                        <p><b>Кухня:</b> ${r.cuisine}</p>
                        <p><b>Адрес:</b> ${r.address}</p>
                        <p><b>Средний чек:</b> ${r.price}</p>
                    </div>
                `,
                hintContent: r.name
            }, {
                preset: 'islands#orangeFoodIcon',
                hideIconOnBalloonOpen: false,
                zIndex: 8000
            });

            targetMarker.events.add('click', function () {
                showRestaurantDetails(r.id, true);
            });

            targetMarkersCollection.add(targetMarker);
        }
    });

    if (targetMarkersCollection.getLength() > 0) {
        map.setBounds(targetMarkersCollection.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 60,
            duration: 600
        });
    }
}

function calculateQuizResult() {
    isQuizFinished = true;

    document.getElementById('quiz-process').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');

    const filterContainer = document.getElementById('category-filters');
    if (filterContainer) {
        filterContainer.classList.add('hidden');
    }

    if (typeof restaurants === 'undefined') return;

    let matchScores = restaurants.map(r => {
        let score = 0;
        if (r.priceRange === quizUserBudget) score += 3;

        if (r.tags) {
            r.tags.forEach(t => {
                if (quizUserTags.includes(t)) score += 2;
            });
        }
        return { restaurant: r, score: score };
    });

    matchScores.sort((a, b) => b.score - a.score);
    const bestMatches = matchScores.slice(0, 3).map(item => item.restaurant);

    quizResultsData = bestMatches;

    let profileTitle = "Исследователь Сибири";
    let profileDesc = "Вы цените глубину традиций, аутентичные вкусы и уединенную, благородную атмосферу.";

    if (quizUserTags.includes("view") || quizUserTags.includes("modern")) {
        profileTitle = "Эстет-Урбанист";
        profileDesc = "Вам важны визуальная составляющая, панорамные виды, трендовые концепции интерьера и высокая авторская подача.";
    } else if (quizUserTags.includes("company")) {
        profileTitle = "Душа Компании";
        profileDesc = "Вы любите сытную еду, кавказское или восточное гостеприимство и открытые пространства для больших застолий.";
    } else if (quizUserTags.includes("family")) {
        profileTitle = "Семейный Гуляка";
        profileDesc = "Вы ищете уютные, дружелюбные места с хорошей атмосферой для отдыха с близкими людьми.";
    } else if (quizUserTags.includes("history")) {
        profileTitle = "Историк Вкусов";
        profileDesc = "Вам нравятся места с историей, традиционные рецепты и аутентичная атмосфера времен.";
    }

    document.getElementById('quiz-profile-title').innerText = profileTitle;
    document.getElementById('quiz-profile-desc').innerText = profileDesc;

    renderQuizMarkers();

    const recContainer = document.getElementById('quiz-recommendations');
    if (!recContainer) return;
    recContainer.innerHTML = '';

    if (bestMatches.length === 0) {
        recContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-zinc-400 text-xs py-4">Не найдено подходящих ресторанов.</p>';
    } else {
        bestMatches.forEach((r, idx) => {
            const item = document.createElement('div');
            item.className = 'bg-gray-50 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 p-3 rounded-xl flex justify-between items-center cursor-pointer hover:border-[#d47b52] dark:hover:border-[#d47b52] transition-colors';
            item.onclick = () => showRestaurantDetails(r.id, true);

            const score = matchScores.find(m => m.restaurant.id === r.id).score;
            item.innerHTML = `
                <div class="flex-1">
                    <h5 class="text-xs font-bold text-gray-900 dark:text-white">${idx + 1}. ${r.name}</h5>
                    <p class="text-[10px] text-[#d47b52] mt-0.5">${r.cuisine}</p>
                    <p class="text-[9px] text-gray-500 dark:text-zinc-500 mt-1">${r.price}</p>
                </div>
                <div class="text-right">
                    <div class="text-[10px] font-bold text-[#d47b52] mb-1">Совпадение: ${score}</div>
                    <i class="fa-solid fa-arrow-right text-gray-400 dark:text-zinc-600 text-xs"></i>
                </div>
            `;
            recContainer.appendChild(item);
        });
    }
}

// ================= MODULE 3: МАРШРУТИЗАЦИЯ И ГЕО-ПОДБОР =================

// ИСПРАВЛЕНО: Выделенная функция для гарантированного восстановления компонентов гео-подбора на карте
function renderNearestGeoComponents() {
    if (!map || !nearestGeoRestaurant) return;

    if (geoCollection) geoCollection.removeAll();
    if (targetMarkersCollection) targetMarkersCollection.removeAll();

    const restCoords = ensureArrayCoords(coordsCache[nearestGeoRestaurant.id]);
    if (restCoords) {
        const targetMarker = new ymaps.Placemark(restCoords, {
            balloonContentHeader: `<b style="color:#d47b52;">${nearestGeoRestaurant.name}</b>`,
            balloonContentBody: `
                <div style="font-family:sans-serif;font-size:12px;color:#333;">
                    <p><b>Кухня:</b> ${nearestGeoRestaurant.cuisine}</p>
                    <p><b>Адрес:</b> ${nearestGeoRestaurant.address}</p>
                    <p><b>Средний чек:</b> ${nearestGeoRestaurant.price}</p>
                </div>
            `,
            hintContent: nearestGeoRestaurant.name
        }, {
            preset: 'islands#orangeFoodIcon',
            hideIconOnBalloonOpen: false,
            zIndex: 8000
        });

        targetMarker.events.add('click', function () {
            showRestaurantDetails(nearestGeoRestaurant.id, true);
        });

        targetMarkersCollection.add(targetMarker);

        // Пересоздаем линию пути, если на карте есть отметка пользователя
        if (userMarkersCollection && userMarkersCollection.getLength() > 0) {
            const userMarker = userMarkersCollection.get(0);
            const userCoords = userMarker.geometry.getCoordinates();
            buildRouteToNearest(userCoords, restCoords);
        }
    }
}

function findNearestByGPS() {
    const resultDiv = document.getElementById('geo-match-result');
    if (!resultDiv) return;
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Определение координат GPS...`;

    // ИСПРАВЛЕНО: Очищаем результаты старого квиза, чтобы избежать конфликтов на карте


    if (!navigator.geolocation) {
        resultDiv.innerText = "Геолокация не поддерживается вашим браузером.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const userCoords = [lat, lng];

            if (map && userMarkersCollection) {
                userMarkersCollection.removeAll();

                const userMarker = new ymaps.Placemark(userCoords, {
                    balloonContentHeader: '<b style="color:#4F46E5;">📍 Вы здесь</b>',
                    balloonContentBody: `Ваша позиция<br>Широта: ${lat.toFixed(4)}<br>Долгота: ${lng.toFixed(4)}`,
                    hintContent: 'Ваша геолокация'
                }, {
                    preset: 'islands#blueDotIcon',
                    zIndex: 9999,
                    draggable: false
                });

                userMarkersCollection.add(userMarker);
                map.setCenter(userCoords, 14, {duration: 300});
            }

            evaluateNearest(userCoords, "Ваша GPS-позиция");
        },
        (error) => {
            console.error("Ошибка геолокации:", error);
            let errorMsg = "Не удалось получить координаты. ";
            if (error.code === 1) errorMsg += "Доступ запрещен.";
            else if (error.code === 2) errorMsg += "Позиция недоступна.";
            else if (error.code === 3) errorMsg += "Таймаут.";
            resultDiv.innerText = errorMsg + " Введите адрес вручную.";
        }
    );
}

function findNearestByAddress() {
    const addressVal = document.getElementById('user-address-input').value;
    const resultDiv = document.getElementById('geo-match-result');

    if (!addressVal.trim()) {
        alert("Пожалуйста, введите корректный адрес.");
        return;
    }

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Геокодирование адреса...`;

    // ИСПРАВЛЕНО: Очищаем старый квиз
    ymaps.geocode("Тюмень, " + addressVal, { results: 1 }).then(res => {
        const firstObj = res.geoObjects.get(0);
        if (firstObj) {
            const userCoords = firstObj.geometry.getCoordinates();

            if (map && userMarkersCollection) {
                userMarkersCollection.removeAll();

                const addressMarker = new ymaps.Placemark(userCoords, {
                    balloonContentHeader: '<b style="color:#4F46E5;">📍 Введённый адрес</b>',
                    balloonContentBody: `${addressVal}<br>Координаты: ${userCoords[0].toFixed(4)}, ${userCoords[1].toFixed(4)}`,
                    hintContent: addressVal
                }, {
                    preset: 'islands#blueDotIcon',
                    zIndex: 9999,
                    draggable: false
                });

                userMarkersCollection.add(addressMarker);
                map.setCenter(userCoords, 14, {duration: 300});
            }

            evaluateNearest(userCoords, addressVal);
        } else {
            resultDiv.innerText = "Адрес не найден. Уточните улицу и номер дома.";
        }
    }).catch(() => {
        resultDiv.innerText = "Ошибка соединения с сервером геокодирования.";
    });
}

function calculateDistance(coord1, coord2) {
    const lat1 = coord1[0] * Math.PI / 180;
    const lat2 = coord2[0] * Math.PI / 180;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const R = 6371;
    return R * c * 1000;
}

function ensureArrayCoords(coords) {
    if (!coords) return null;
    if (Array.isArray(coords)) {
        return [parseFloat(coords[0]), parseFloat(coords[1])];
    }
    if (typeof coords === 'string') {
        const parts = coords.split(',');
        if (parts.length === 2) {
            return [parseFloat(parts[0]), parseFloat(parts[1])];
        }
    }
    if (coords.lat !== undefined && coords.lng !== undefined) {
        return [parseFloat(coords.lat), parseFloat(coords.lng)];
    }
    return coords;
}

function evaluateNearest(userCoords, titleText) {
    if (typeof restaurants === 'undefined') return;
    let nearestRest = null;
    let minDistance = Infinity;
    let evaluatedCount = 0;
    let distances = [];

    const validUserCoords = ensureArrayCoords(userCoords);

    restaurants.forEach(r => {
        const rCoords = ensureArrayCoords(coordsCache[r.id]);
        if (rCoords && validUserCoords) {
            evaluatedCount++;
            const distance = calculateDistance(validUserCoords, rCoords);
            distances.push({name: r.name, dist: distance});
            if (distance < minDistance) {
                minDistance = distance;
                nearestRest = r;
            }
        }
    });

    distances.sort((a, b) => a.dist - b.dist);

    const resultDiv = document.getElementById('geo-match-result');
    if (!resultDiv) return;

    if (nearestRest && minDistance !== Infinity) {
        // ИСПРАВЛЕНО: Сохраняем найденное заведение в глобальную переменную
        nearestGeoRestaurant = nearestRest;

        const km = (minDistance / 1000).toFixed(2);

        // ИСПРАВЛЕНО: Обернули результат в стильный кликабельный блок с эффектом ховера.
        // Клик по нему вызывает плавный полет к заведению на карте и открывает детали.
        resultDiv.innerHTML = `
            <div class="space-y-1 p-3 bg-gray-50 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 hover:border-[#d47b52] dark:hover:border-[#d47b52] rounded-xl cursor-pointer transition-all active:scale-[0.98]" onclick="showRestaurantDetails('${nearestRest.id}', true)">
                <span class="text-[10px] font-bold uppercase block text-emerald-500">✓ Ближайшее найдено:</span>
                <span class="text-gray-900 dark:text-white font-bold block">${nearestRest.name}</span>
                <span class="text-gray-500 dark:text-zinc-400 block">Расстояние: ~${km} км</span>
                <span class="text-gray-400 dark:text-zinc-500 text-[9px] block">От: ${titleText}</span>
            </div>
        `;


        showRestaurantDetails(nearestRest.id, true);

        const restCoords = ensureArrayCoords(coordsCache[nearestRest.id]);
        buildRouteToNearest(validUserCoords, restCoords);
    } else {
        resultDiv.innerHTML = `
            <div class="text-red-500 text-sm">
                ⚠ Ошибка: координаты не загружены. Подождите загрузки карты и повторите попытку.
                <div class="text-[10px] mt-1">Загружено ресторанов: ${evaluatedCount}</div>
            </div>
        `;
    }
}


function buildRouteSelectorList() {
    const container = document.getElementById('route-selector-list');
    if (!container || typeof restaurants === 'undefined') return;
    container.innerHTML = '';

    restaurants.forEach(r => {
        const div = document.createElement('label');
        div.className = 'flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/40 cursor-pointer text-xs transition-colors';
        div.innerHTML = `
            <input type="checkbox" value="${r.id}" class="route-checkbox shrink-0">
            <div class="truncate">
                <span class="font-bold text-gray-900 dark:text-white block truncate">${r.name}</span>
                <span class="text-[10px] text-gray-500 dark:text-zinc-500 truncate block">${r.address}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

function buildSelectedRoute() {
    if (typeof restaurants === 'undefined') return;

    const checkboxes = document.querySelectorAll('.route-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);

    if (selectedIds.length < 2) {
        alert("Для построения экскурсионного пути выберите как минимум 2 заведения.");
        return;
    }

    const points = [];
    const routeRestaurants = [];

    for (let id of selectedIds) {
        const restaurant = restaurants.find(r => r.id == id);
        const rCoords = ensureArrayCoords(coordsCache[id]);
        if (rCoords && restaurant) {
            points.push(rCoords);
            routeRestaurants.push(restaurant);
        }
    }

    if (points.length < 2) {
        alert("Не удалось найти координаты для выбранных заведений.");
        return;
    }

    // Вместо вызова полного сброса clearBuiltRoute() удаляем только старую линию,
    // чтобы не сбросить чекбоксы, которые пользователь только что выбрал.
    if (activeMultiRoute && map) {
        map.geoObjects.remove(activeMultiRoute);
        activeMultiRoute = null;
    }

    if (geoCollection) geoCollection.removeAll();
    if (targetMarkersCollection) targetMarkersCollection.removeAll();

    previousTab = 'services';

    // Запись экскурсионного маршрута в вашу переменную activeMultiRoute
    activeMultiRoute = new ymaps.Polyline(points, {
        balloonContent: "Ваш экскурсионный гастро-маршрут"
    }, {
        strokeColor: "#d47b52",
        strokeWidth: 4,
        strokeOpacity: 0.85,
        strokeStyle: 'shortdash'
    });

    if (map) {
        map.geoObjects.add(activeMultiRoute);

        routeRestaurants.forEach(r => {
            const coords = ensureArrayCoords(coordsCache[r.id]);
            if (coords) {
                const pm = new ymaps.Placemark(coords, {
                    balloonContentHeader: `<b style="color:#d47b52;">${r.name}</b>`,
                    balloonContentBody: `Адрес: ${r.address}`
                }, {
                    preset: 'islands#orangeFoodIcon',
                    zIndex: 8000
                });
                targetMarkersCollection.add(pm);
            }
        });

        map.geoObjects.add(targetMarkersCollection);

        map.setBounds(activeMultiRoute.geometry.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 50
        });

        console.log(`🎯 Построен маршрут. Сфокусировались на туре из ${routeRestaurants.length} точек.`);

        const extBtn = document.getElementById("external-nav-btn");
        if (extBtn) extBtn.classList.remove("hidden");
    }
}

function openInYandexMaps() {
    const checkboxes = document.querySelectorAll('.route-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);
    const pointsArray = [];

    for (let id of selectedIds) {
        const rCoords = ensureArrayCoords(coordsCache[id]);
        if (rCoords) {
            pointsArray.push(`${rCoords[0]},${rCoords[1]}`);
        }
    }

    if (pointsArray.length < 2) return;

    const rtextParam = pointsArray.join('~');
    const yandexMapsUrl = `https://yandex.ru/maps/?rtext=${rtextParam}&rtt=pd`;

    window.open(yandexMapsUrl, '_blank');
}

function clearBuiltRoute() {
    // 1. Удаляем линию маршрута с карты и обнуляем переменную
    if (activeMultiRoute && map) {
        map.geoObjects.remove(activeMultiRoute);
        activeMultiRoute = null;
    }

    // 2. Полностью вычищаем маркеры точек маршрута
    if (targetMarkersCollection) {
        targetMarkersCollection.removeAll();
        renderNearestGeoComponents();
    }

    // 3. Снимаем галочки со всех чекбоксов в списке
    const checkboxes = document.querySelectorAll('.route-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = false;
    });

    // 4. Сбрасываем сохраненное ближайшее заведение
    nearestGeoRestaurant = null;

    // 5. Скрываем кнопку внешних карт
    const extBtn = document.getElementById("external-nav-btn");
    if (extBtn) extBtn.classList.add("hidden");

    console.log("✓ Карта очищена от путей, маркеры удалены, чекбоксы сброшены.");
}

function handleSearch(searchValue) {
    renderRestaurants(searchValue);
}