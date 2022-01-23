import { galleryItems } from './gallery-items.js';
const galleryRef = document.querySelector('.gallery');
const markupGallery = composeMarkup(galleryItems);

galleryRef.innerHTML = markupGallery;
galleryRef.addEventListener('click', selectImg);

function selectImg(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const onEscape = (evt) => {
    if (evt.key === 'Escape') {
      instance.close();
    }
  };

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}"/> `,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', onEscape);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscape);
      },
    }
  );

  instance.show();
}

function composeMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
  </div>
  `;
    })
    .join('');
}
