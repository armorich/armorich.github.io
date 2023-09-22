function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH(); //Метод для конвертации
            this.parent = document.querySelector(parentSelector); //Получение элемента родителя и добавление его в конструкор, получая из введёных значений
        }

        // ф-я конвертации валюты, после чего в контексте price будет заменяться цена на конвертированную
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // ф-я которая генерирует карточку в зависимости от контекста вызова, и вставляет в html документ append
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                 <div class="menu__item">
                     <img src=${this.src} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-descr">${this.descr}</div>
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                         <div class="menu__item-cost">Цена:</div>
                         <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                     </div>
                 </div>`;

            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        }

        return await res.json();
    };


    //? Так можно генерировать карточки с текстом, что достаточно удобно, потому что надо вносить только информацию, а длее они автоматически генерируются и создаются на странице

    getResource('http://localhost:3000/menu/')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

}

export default cards; 