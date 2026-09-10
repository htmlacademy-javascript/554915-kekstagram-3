import { renderPhotos } from './photos.js';
import { openModal } from './full-photo.js';
import { getData } from './api.js';
import { showErrorAlert } from './alert.js';
import { ALERT_TYPE } from './const.js';

const photoList = document.querySelector('.pictures');


let cards = [];

getData(
  (data) => {
    cards = data;
    renderPhotos(cards);
  },
  () => showErrorAlert(ALERT_TYPE.DATA_ERROR)
);

const openModalClickHandler = (evt) => {
  const photoCard = evt.target.closest('.picture');

  if (!photoCard) {
    return;
  }

  const filteredPhoto = cards.find((card) => card.id === Number(photoCard.id));

  openModal(filteredPhoto);
};

photoList.addEventListener('click', openModalClickHandler);


