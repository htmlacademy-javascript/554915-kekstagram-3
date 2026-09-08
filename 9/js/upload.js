import { isEscKeydown } from './util';
import { resetScale, initScale } from './scale.js';
import { initEffects, resetEffects } from './effect.js';
import { resetValidation } from './validate.js';

const uploadForm = document.querySelector('.img-upload__form');
const openUploadButton = uploadForm.querySelector('.img-upload__input');
const closeUploadButton = uploadForm.querySelector('.img-upload__cancel');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const clearUploadInput = () => (openUploadButton.value = '');

const openPopup = () => {
  uploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initScale();
  initEffects();

  document.addEventListener('keydown', documentEscKeydownHandler);
};

const isElementFocused = (element) => document.activeElement === element;
const isTextFieldFocused = () => isElementFocused(hashtagInput) || isElementFocused(commentInput);

const closePopup = () => {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearUploadInput();
  resetScale();
  resetEffects();
  resetValidation();

  document.removeEventListener('keydown', documentEscKeydownHandler);
};

function documentEscKeydownHandler (evt) {
  if (isEscKeydown(evt) && !isTextFieldFocused()) {
    closePopup();
  }
}

openUploadButton.addEventListener('change', openPopup);
closeUploadButton.addEventListener('click', closePopup);


