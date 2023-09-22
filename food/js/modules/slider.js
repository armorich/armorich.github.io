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

export default slider;