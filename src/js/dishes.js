const dishes = [
    {
        foodType: 'перша страва',
        calories: '56 кКал',
        dishName: 'сирний суп з індичкою',
        ingredients: 'Індичка (бедро) – 600 г, Картопля – 4-5 шт., Фунчоза вермішель – 50 г, Плавлені сирки – 4 шт., Морква – 1 шт., Цибуля – 1 шт., Олія – для смаження, Сіль, перець, лавровий лист – за смаком, Зелень кропу та петрушки – за смаком, Варені курячі яйця – для подачі, Вода – 3 л.',
        img: 'https://guslyanka.com/wp-content/uploads/2023/02/klasychnyj-syrnyj-sup-z-indychkoiu-na-56-kalorij-13-768x500.jpg',
    },
    {
        foodType: 'гарнір',
        calories: '100 кКал',
        dishName: 'тушковані кабачки з рисом',
        ingredients: 'Рис – 1 склянка, Кабачки – 1-2 шт., Помідори – 2 шт., Сіль, перець – за смаком, Олія – для смаження, Зелень петрушки та кропу – пучок.',
        img: 'https://guslyanka.com/wp-content/uploads/2022/08/Tushkovani-kabachky-z-rysom-14-768x500.jpg',
    },
    {
        foodType: "м'ясо",
        calories: '194 кКал',
        dishName: 'запечена курка з яблуками',
        ingredients: 'Курка – 1,5-2 кг, Яблука – 2 шт., Сіль, перець – за смаком, Майонез – 2 ст. ложки, Приправа до курки – 1-2 ч. ложки',
        img: 'https://guslyanka.com/wp-content/uploads/2023/02/Zapechena-kurka-z-yablukamy-10-768x500.jpg',
    },
    {
        foodType: 'перша страва',
        calories: '68 кКал',
        dishName: 'гороховий суп з куркою',
        ingredients: 'Горох – 2/3 ст., Вода – 3 л, Курка – 260 г, Картопля – 260 г, Морква – 120 г, Цибуля ріпчаста – 120 г, Олія соняшникова – 2 ст. ложки, Кріп – 3 шт., Сіль, приправи – за бажанням.',
        img: 'https://guslyanka.com/wp-content/uploads/2021/09/Horokhovyy-sup-13-768x500.jpg',
    },
    {
        foodType: "м'ясо",
        calories: '139 кКал',
        dishName: 'тушкований кролик в сметані',
        ingredients: 'Кролик – 1,5 – 2 кг, Сметана – 500 г, Цибуля – 2 шт., Морква – 2 шт., Сіль, перець – за смаком, Олія – 2 ст. ложки, Орегано – 1 ч. ложка, Вода – 400 мл, Лавровий лист – 1-2 шт.',
        img: 'https://guslyanka.com/wp-content/uploads/2022/10/Tushenyy-krolyk-v-smetani-14-768x500.jpg',
    },
];

//just for testing
for(let i = 0; i < dishes.length; i++) {
    console.log(dishes[i]);
}


let dishes_holder = document.querySelector('.dishes-holder');
let searched = document.querySelector('.searched-dishes');



function load() {
    for(let i = 0; i < dishes.length; i++) {
        let contentBlock = `
            <div class="dish-desc">
                <div class="dish-img">
                    <img src="${dishes[i].img}" alt="mustang">
                </div>
                <div class="desc-holder">
                    <p>Вид: ${dishes[i].foodType}</p>
                    <p>Кількість калорій: ${dishes[i].calories}</p>
                    <p>Назва страви: ${dishes[i].dishName}</p>
                    <p>Інгрідієнти: ${dishes[i].ingredients}</p>
                    
                </div>
            </div>
        `;
        dishes_holder.insertAdjacentHTML('beforeend', contentBlock);
    }
}

load();

function search() {
    let input_value = document.querySelector('.search-input').value;
    

    for(let i = 0; i < dishes.length; i++) {
        if(input_value == dishes[i].dishName) {
            dishes_holder.style.display = "none";
            let contentBlock = `
            <div class="dish-desc">
                <div class="dish-img">
                    <img src="${dishes[i].img}" alt="mustang">
                </div>
                <div class="desc-holder">
                    <p>Вид: ${dishes[i].foodType}</p>
                    <p>Кількість калорій: ${dishes[i].calories}</p>
                    <p>Назва страви: ${dishes[i].dishName}</p>
                    <p>Інгрідієнти: ${dishes[i].ingredients}</p>
                    
                </div>
            </div>
        `;
        searched.insertAdjacentHTML('beforeend', contentBlock);
        }
    }
}

function firstDishes() {
    for(let i = 0; i < dishes.length; i++) {
        if(dishes[i].foodType == "перша страва") {
            dishes_holder.style.display = "none";
            let contentBlock = `
            <div class="dish-desc">
                <div class="dish-img">
                    <img src="${dishes[i].img}" alt="mustang">
                </div>
                <div class="desc-holder">
                    <p>Вид: ${dishes[i].foodType}</p>
                    <p>Кількість калорій: ${dishes[i].calories}</p>
                    <p>Назва страви: ${dishes[i].dishName}</p>
                    <p>Інгрідієнти: ${dishes[i].ingredients}</p>
                    
                </div>
            </div>
        `;
        searched.insertAdjacentHTML('beforeend', contentBlock);
        }
    }
    
}

function meat() {
    for(let i = 0; i < dishes.length; i++) {
        if(dishes[i].foodType == "м'ясо") {
            dishes_holder.style.display = "none";
            let contentBlock = `
            <div class="dish-desc">
                <div class="dish-img">
                    <img src="${dishes[i].img}" alt="mustang">
                </div>
                <div class="desc-holder">
                    <p>Вид: ${dishes[i].foodType}</p>
                    <p>Кількість калорій: ${dishes[i].calories}</p>
                    <p>Назва страви: ${dishes[i].dishName}</p>
                    <p>Інгрідієнти: ${dishes[i].ingredients}</p>
                    
                </div>
            </div>
        `;
        searched.insertAdjacentHTML('beforeend', contentBlock);
        }
    }
}

function sideDish() {
    for(let i = 0; i < dishes.length; i++) {
        if(dishes[i].foodType == "гарнір") {
            dishes_holder.style.display = "none";
            let contentBlock = `
            <div class="dish-desc">
                <div class="dish-img">
                    <img src="${dishes[i].img}" alt="mustang">
                </div>
                <div class="desc-holder">
                    <p>Вид: ${dishes[i].foodType}</p>
                    <p>Кількість калорій: ${dishes[i].calories}</p>
                    <p>Назва страви: ${dishes[i].dishName}</p>
                    <p>Інгрідієнти: ${dishes[i].ingredients}</p>
                    
                </div>
            </div>
        `;
        searched.insertAdjacentHTML('beforeend', contentBlock);
        }
    }
}