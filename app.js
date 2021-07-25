const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


// - Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

const imagesContainer = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const openModalImage = document.querySelector('.lightbox__image');
const modalOverlay = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGalleryMarkup(galleryItems);

imagesContainer.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, description, original }) => {
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
    </li>
    `;
  })
    .join('');
}


// - Реализация делегирования на галерее ul.js-gallery и получение url большого изображения
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута src элемента img.lightbox__image.

imagesContainer.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  event.preventDefault();

  lightboxEl.classList.add('is-open');

  openModalImage.src = event.target.dataset.source;
  openModalImage.alt = event.target.alt;

  window.addEventListener('keydown', onEscapePress);
}


// - Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// - Очистка значения атрибута src элемента img.lightbox__image. 

closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  lightboxEl.classList.remove('is-open');

  openModalImage.src = '';
  openModalImage.alt = '';

  window.removeEventListener('keydown', onEscapePress);
}


// - Закрытие модального окна по клику на div.lightbox__overlay.

modalOverlay.addEventListener('click', onOverlayClick);

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}


// - Закрытие модального окна по нажатию клавиши ESC.

function onEscapePress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}


// - Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

