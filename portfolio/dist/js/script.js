const w = window.innerWidth;

let i;
    if (w <= 492) {
        i = 1; 
    } else {
        i = 3;
    }
console.log(w);




const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: i,
    spaceBetween: 0,
    centeredSlides: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
});
  

const promoMenu = document.querySelector('.promo__menu'); 
const promoList = document.querySelector('.promo__menu_list');
const burger = document.querySelector('.promo__menu_burger');
const i1 = document.querySelector('#i1'); 
const i2 = document.querySelector('#i2'); 
const i3 = document.querySelector('#i3'); 
const sidePanel = document.querySelector('.promo__sidepanel');

promoMenu.addEventListener('click', () => {
    console.log(1);
    if (promoMenu.classList.contains('promo__menu_mini')) {
        promoMenu.classList.remove('promo__menu_mini');
        promoList.classList.remove('promo__menu_list-mini');
        i1.classList.remove('item1');
        i2.classList.remove('item2');
        i3.classList.remove('item3');
        sidePanel.classList.remove('promo__sidepanel_active');
    } else {
        promoMenu.classList.add('promo__menu_mini');
        promoList.classList.add('promo__menu_list-mini');
        i1.classList.add('item1');
        i2.classList.add('item2');
        i3.classList.add('item3');
        sidePanel.classList.add('promo__sidepanel_active');

    }
    
});
