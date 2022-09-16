/* Код для активации focus в браузере Safari */

document.addEventListener('click', event => {
  if (event.target.matches('button')) {
      event.target.focus()
  }
});


/* Модальное окно */

const heroBtn = document.querySelector('.hero__btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

heroBtn.addEventListener('click', () => {
  overlay.classList.add('overlay_active');
  modal.classList.add('modal_active');
});

overlay.addEventListener('click', (event) => {
  const target = event.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('overlay_active');
    modal.classList.remove('modal_active');
  }  
});

/* Закрытие модального окна при клике вне его контентной области */

modal.click(function (event) {    
    if (!modalContent.is(event.target) && modalContent.has(event.target).length === 0) {
      $(this).removeClass('modal_active'); // событие вызвал элемент modal
      modalOverlay.removeClass('overlay_active');
    }
});


/* Отправка формы */

const modalTitle = $('.modal__title');
const modalForm = $('.modal__form');

modalForm.submit(function (event) {
  event.preventDefault();
  $.ajax( {
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'POST',
    data: $(this).serialize(),
    success(data) {
      modalTitle.text('Спасибо, ожидайте звонок')
      modalForm.slideUp(300);
    },
    error() {
      modalTitle.text('Косячок')
    }
  })
});


/* Burger */

const burger = document.querySelector('.header__burger');
const popup = document.querySelector('.popup');
const headerNav = document.querySelector('.burger__menu');

burger.addEventListener('click', () => {
  popup.classList.add('active');
  headerNav.classList.add('active');
});


$('.burger__menu_item a').on('click', function(){
  $('.burger__menu').removeClass('active');
  $('.popup').removeClass('active');
});


/* Sliders */

// const swiper = new Swiper(".hero__items", {
//   spaceBetween: 10,
//   slidesPerView: 4,
//   freeMode: true,
//   watchSlidesProgress: true,
// });

// const swiper2 = new Swiper(".hero__pic_slider", {
//   slidesPerView: 1,
//   loop: true,
//   spaceBetween: 10,
//   thumbs: {
//     swiper: swiper,
//   },
// });

new Swiper(".help__financial_slider", { 
  enabled: true,
  breakpoints: {
    767: {
      enabled: false,
      spaceBetween: 10,
      slidesPerView: 1,
      freeMode: true,
      watchSlidesProgress: true,
    }
  }
});

new Swiper(".help__conservator_slider", { 
  enabled: true,
  breakpoints: {
    767: {
      enabled: false,
      spaceBetween: 10,
      slidesPerView: 1,
      freeMode: true,
      watchSlidesProgress: true,
    }
  }
});


/* Яндекс-карты */

ymaps.ready(init);
  function init() {
    const myMap = new ymaps.Map("map", {
      center: [55.903403, 37.259899],
      zoom: 16
    });

    const marker = new ymaps.Placemark([55.903403, 37.259899], {
      hintContent: 'Пятницкое шоссе'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/marker.svg',
      iconImageSize: [39, 59],
      iconImageOffset: [-3, -42]
    });

      myMap.geoObjects.add(marker);
  };