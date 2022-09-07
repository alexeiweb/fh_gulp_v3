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