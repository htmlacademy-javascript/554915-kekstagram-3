import {createCards} from './data.js';
import { renderPhotos } from './photos.js';
import { openModal } from './modal.js';

const photoList = document.querySelector('.pictures');


const cards = createCards();

const openModalClickHandler = (evt) => {
  const photoCard = evt.target.closest('.picture');

  if (!photoCard) {
    return;
  }

  const filteredPhoto = cards.find((card) => card.id === photoCard.id);

  openModal(filteredPhoto);
};

photoList.addEventListener('click', openModalClickHandler);


renderPhotos(cards);
