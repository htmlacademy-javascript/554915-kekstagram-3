import { fillFullPhoto, clearFullPhoto } from './full-photo';
import { isEscKeydown } from './util';

const modal = document.querySelector('.big-picture');
const closeModalButton = modal.querySelector('.big-picture__cancel');

const openModal = (photo) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fillFullPhoto(photo);

  window.addEventListener('keydown', documentKeydownHandler);
};

const closeModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearFullPhoto();

  window.removeEventListener('keydown', documentKeydownHandler);
};

function documentKeydownHandler (evt) {
  if (isEscKeydown(evt)) {
    closeModal();
  }
}

closeModalButton.addEventListener('click', closeModal);

export {openModal};
