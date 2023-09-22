/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
     //Calc 

     const result = document.querySelector('.calculating__result span');


     let sex, height, weight, age, ratio;
 
     if (localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else {
         sex = 'female';
         localStorage.setItem('sex', 'female');
     }
 
 
     if (localStorage.getItem('ratio')) {
         ratio = localStorage.getItem('ratio');
     } else {
         ratio = 1.375;
         localStorage.setItem('ratio', 1.375);
     }
 
     function initLocalsettings(selector, activeClass) {
         const elements = document.querySelectorAll(selector);
 
         elements.forEach(elem => {
             elem.classList.remove(activeClass);
 
             //? Проверка по локальной базе, и в случае чего, назначение на элементов класса активности
 
             if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                 elem.classList.add(activeClass);
             }
 
             if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                 elem.classList.add(activeClass);
             }
         });
     }
     initLocalsettings('#gender div', 'calculating__choose-item_active');
     initLocalsettings('.calculating__choose_big div', 'calculating__choose-item_active');
 
     function calcTotal() {
         if (!sex || !height || !weight || !age || !ratio) {
             result.textContent = '  ';
             return;
         }
 
         if (sex === 'female') {
             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.8 * age)) * ratio);
         }
     }
 
     calcTotal();
 
     function getStaticInfo(selector, activeClass) {
         const elements = document.querySelectorAll(`${selector} div`);
 
         elements.forEach(elem => {
             elem.addEventListener('click', (e) => {
                 if (e.target.getAttribute('data-ratio')) {
                     ratio = e.target.getAttribute('data-ratio');
                     localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                 } else {
                     sex = e.target.getAttribute('id');
                     localStorage.setItem('sex', e.target.getAttribute('id'));
                 }
 
                 elements.forEach(elem => {
                     elem.classList.remove(activeClass);
                 });
 
                 e.target.classList.add(activeClass);
 
                 calcTotal();
             });
         });
 
     }
 
     getStaticInfo('#gender', 'calculating__choose-item_active');
     getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
 
 
     //? Ф-я Получения значений из инпутов
     function getDynamicInfo(selector) {
         const input = document.querySelector(selector);
 
 
         if (input.value.match(/\D/g)) {
             input.style.border = '1px solid red';
         } else {
             input.style.border = 'none';
         }
 
         input.addEventListener('input', () => {
             switch (input.getAttribute('id')) {
                 case 'height':
                     height = +input.value;
                     break;
                 case 'weight':
                     weight = +input.value;
                     break;
                 case 'age':
                     age = +input.value;
                     break;
             }
             calcTotal();
 
         });
 
     }
 
     getDynamicInfo('#height');
     getDynamicInfo('#weight');
     getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc); 


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards); 

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
 

function forms(modalTimerId) {
     //? Forms (AJAX запросы с использованием локального сервера MAMP) 

    // Переменная которая по тегу <form> получает элементы
    const forms = document.querySelectorAll('form');

    // Объект в котором находятся статусы запросов, пригодиться для оповещения пользователя о статусе
    const message = {
        loading: 'img/form/005 spinner.svg',
        success: 'Спсибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // Перебор всех тегов <form>
        bindPostData(item); // Исппользование ф-ии для одной из пребранных форм
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    // 
    function bindPostData(form) {
        form.addEventListener('submit', (e) => { // Событие которое инициализирует отправку формы, работает только на <form> или <input type="submit">
            e.preventDefault(); //Сбро стандартного поведения браузера

            // Создание элемента на странице, в котором будет написан статус отправки данных на сервер
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; // Присваивание уведомлению класса .status
            statusMessage.style.cssText = `
                 display: block; 
                 margin: 0 auto;
             `; // Сразу после отправки присвоение статуса загрузки
            // form.append(statusMessage); // Добавление в конец полученной формы статуса
            form.insertAdjacentElement('afterend', statusMessage);


            // const request = new XMLHttpRequest(); // Моздание HTTP объекта, которые далее должен передать запрос на сервер
            // request.open('POST', 'server.php'); // Метод делающий пост запрос серверу 


            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


            // Для создания объекта и для дальнейшей конвертации его в JSON
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            // Конвертация объекта в JSON
            //! PHP не умеет работать с JSON поэтому надо будет конвертировать в подходящий формат, в дальнейшем
            // const json = JSON.stringify(object); // Превращение из обычного объекта в JSON
            // request.send(json);



            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // Отображает в консоли переданные данные
                    showThanksModal(message.success); // Вызывается модальное окно с сообщением о благодарности 
                    form.reset(); // так производится очистка формы
                    statusMessage.remove(); // Удаление сообщения о статусе
                }).catch(() => { // В случае ошибки будет выполняться блок catch
                    showThanksModal(message.failure); // Вызывается модальное окно с сообщением об ошибке
                }).finally(() => {
                    form.reset();
                });


            // const formData = new FormData(form); // Создание пар ключ значение, аргументы для этого получаются с формы

            // Из-за спцифичночти FormData данные надо будет первести в JSON

            // request.send(formData);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response); // Отображает в консоли переданные данные
            //         showThanksModal(message.success); // Вызывается модальное окно с сообщением о благодарности 
            //         statusMessage.remove(); // Удаление сообщения о статусе
            //         form.reset(); // так производится очистка формы
            //     } else {
            //         showThanksModal(message.failure); // Вызывается модальное окно с сообщением об ошибке
            //     }
            // });
        });
    }

    // Modal with thanks message

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Поулчаем диалоговое окно, сам блок

        prevModalDialog.classList.add('hide'); // Сразу же скрываем его
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); // Ф-я отвеччающая за открытие окна, переключает классы

        const thanksModal = document.createElement('div'); // Создание окна благодарности
        thanksModal.classList.add('modal__dialog'); // Добавление класса, основы для окна 

        // Добавление на страницу модального окна, в котором описывается и состояние отправки формы
        thanksModal.innerHTML = `  
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;


        document.querySelector('.modal').append(thanksModal); // Добавленние окна благодарности
        setTimeout(() => { // Создание асинхронного кода по удалению окна после отправки формы
            thanksModal.remove(); // Удаление окна благодарности
            prevModalDialog.classList.add('show'); // Две следующие операции создают и скрывают модальное оконо с формой
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); // Ф-я закрытия модального окна 
        }, 4000);
    }

    // Пример с GET запросом
    //     fetch('https://jsonplaceholder.typicode.com/posts', {
    //             method: "POST",
    //             body: JSON.stringify({ name: 'Alex' }),
    //             headers: {
    //                 'Content-type': 'application/json'
    //             }
    //         }) // От сюда мы получим промис
    //         .then(response => response.json())
    //         .then(json => console.log(json));


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms); 

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.toggle('show');
    document.body.style.overflow = "hidden";
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);    
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.toggle('show');
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
      // Modal 

        const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector); 
    
        modalTrigger.forEach(btn => {
            btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
        });
        

  modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.getAttribute('data-close') == '') {
          closeModal(modalSelector, );
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
          closeModal(modalSelector, );
      }
  });

  function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
          // -1 потому что при пролистывании страница может не дойти до конца, а высота клиента будет на 1 меньше, и чтобы избежать ошибок, отняли 1px
          openModal(modalSelector, modalTimerId);
          window.removeEventListener('scroll', showModalByScroll);
      }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal); 

 


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
     // Slider

     const slides = document.querySelectorAll('.offer__slide'),
     slider = document.querySelector('.offer__slider'),
     prev = document.querySelector('.offer__slider-prev'),
     next = document.querySelector('.offer__slider-next'),
     total = document.querySelector('#total'),
     current = document.querySelector('#current'),
     slidesWrapper = document.querySelector('.offer__slider-wrapper'),
     slidesField = document.querySelector('.offer__slider-inner'),
     width = window.getComputedStyle(slidesWrapper).width;
 console.log(slides.length);
 let slideIndex = 1;
 let offset = 0;

 if (slides.length < 10) {
     total.textContent = `0${slides.length}`;
     current.textContent = `0${slideIndex}`;
 } else {
     total.textContent = slides.length();
     current.textContent = slideIndex;
 }

 next.addEventListener('click', () => {
     if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
         offset = 0;
     } else {
         offset += +width.slice(0, width.length - 2);
     }

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slideIndex == slides.length) {
         slideIndex = 1;
     } else {
         slideIndex++;
     }

     if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
     } else {
         current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = ".5");
     dots[slideIndex - 1].style.opacity = 1;
 });

 prev.addEventListener('click', () => {
     if (offset == 0) {
         offset = +width.slice(0, width.length - 2) * (slides.length - 1);
     } else {
         offset -= +width.slice(0, width.length - 2);
     }

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slideIndex == 1) {
         slideIndex = slides.length;
     } else {
         slideIndex--;
     }

     if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
     } else {
         current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = ".5");
     dots[slideIndex - 1].style.opacity = 1;
 });




 //? Улучшенный вариант слайдера, внизу будет такой себе (он больше был ориантрирован на сам функцианал)

 slidesField.style.width = 100 * slides.length + '%';
 slidesField.style.display = 'flex';
 slidesField.style.transition = '0.5s all';
 slides.forEach(slide => {
     slide.style.width = width;
 });

 slider.style.position = 'relative';

 const indicators = document.createElement('ol'),
     dots = [];
 indicators.classList.add('crousel-indicators');
 indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;
 slider.append(indicators);

 //* Цикл для создания точек, чтобы создалось кол-во точек в зависимости от количества слайдов
 for (let i = 0; i < slides.length; i++) {
     const dot = document.createElement('li');

     //* Каждой точке будет устанавливаться атрибут data-slide-to и выстравивать нумерацию начиная с единицы
     dot.setAttribute('data-slide-to', i + 1);
     dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;

     if (i == 0) {
         dot.style.opacity = 1;
     }
     indicators.append(dot);

     // Метод для отправки точек в массив
     dots.push(dot);

 }

 function deleteNotDigits(str) {
     return str.replace(/\D/g, '');
 }

 //? Перебор всех точек, далее навешивание на каждый обработчика событий, 
 //? далее получаем атрибут, который добавляется,
 dots.forEach(dot => {
     dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = deleteNotDigits(width) * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
             current.textContent = `0${slideIndex}`;
         } else {
             current.textContent = slideIndex;
         }

         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex - 1].style.opacity = 1;

     });
 });

 slidesWrapper.style.overflow = 'hidden';


 //! Самый простой вариант слайдера, сама логика отображения слайдов
 /* showSlides(slideIndex); 

 //* Отображение общего количества слайдов
 // Будет каждый раз при вызове ф-ии запускаться этот скрипт 
 // Если слайдов будет меньше 10, тогда будет строка с 0, в другом случае будет строка с количесвом, но без 0
 if (slides.length < 10) {
     total.textContent = `0${slides.length}`;
 }else{
     total.textContent = slides.length();
 }

 function showSlides(n) {
     if (n > slides.length){
         slideIndex = 1; 
     }

     if (n < 1) {
         slideIndex = 4; 
     }

     //* Скрытие скрытие слайдов
     slides.forEach(item => item.style.display = 'none'); 


     //* Отображение первого слайда
     slides[slideIndex - 1].style.display = 'block'; 

     //* Отображение номера текущего слайда
     if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
     }else{
         current.textContent = slideIndex;
     }
 }

 //* Изменение на 1 цифры у слайдера
 function plusSlides(n) {
     showSlides(slideIndex += n)
 }

 prev.addEventListener('click', () => {
     plusSlides(-1)
 });

 next.addEventListener('click', () => {
     plusSlides(1)
 }) */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    //! Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => { // Перебором получаеми все картинки, которые надо скрыть
            item.classList.add('hide'); // Добавляем класс скрытия
            item.classList.remove('show', 'fade'); // Убираем показывающий класс и анимацию
        });
        tabs.forEach(tab => { // Перебираем все табы
            tab.classList.remove('tabheader__item_active'); // Удаляем класс активной вкладки
        });
    }

    function showTabContent(i = 0) { // По умолчанию будет показываться первая картинка
        tabsContent[i].classList.add('show', 'fade'); // Добавляем показывающий класс и анимацию
        tabsContent[i].classList.remove('hide'); // Удаляем скрывающий класс

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    console.log('Hello');


    tabsParent.addEventListener('click', (event) => { // За счёт обработчика будем получать информацию по клику
        // и далее уже за счёт перебора получать аргумент i (порядковый номер), котторый будет вставляться в ф-ю показа
        const target = event.target; // чтобы постоянно не прописывать event.target можно занести в переменную

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => { // Перебираются все табы и передаются аргументы элементов и порядкого номера
                if (target == item) { // Если цель совпадает с элементом, то 
                    hideTabContent(); // Скрываются все табы и
                    showTabContent(i); // Показывается только тот, который совпол с пордковым номером
                    console.dir(event);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
     //! Timer

     const deadline = '2025-05-25';

     function getTimeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
             hours = Math.floor((t / (1000 * 60 * 60) % 24)),
             minutes = Math.floor((t / (1000 / 60)) % 60),
             seconds = Math.floor((t / 1000) % 60);
 
         return {
             'total': t,
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
         };
 
     }
 
     function getZero(num) {
         if (num >= 0 && num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
     }
 
     function setClock(selector, endtime) {
         const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minuts = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);
 
         updateClock();
 
         function updateClock() {
             const t = getTimeRemaining(endtime);
 
             days.innerHTML = getZero(t.days);
             hours.innerHTML = getZero(t.hours);
             minuts.innerHTML = getZero(t.minutes);
             seconds.innerHTML = getZero(t.seconds);
 
             if (t.total <= 0) {
                 clearInterval(timeInterval); //Если таймер будет равен нулю, то остановить его
             }
         }
     }
 
     setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer); 


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");





 



document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(); 
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(); 
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])(); 
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])(); 
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(modalTimerId); 
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])(); 
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map