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

export default calc; 