import { isEscKeydown } from './util.js';
import { resetScale, initScale } from './scale.js';
import { initEffects, resetEffects } from './effect.js';
import { initValidation,resetValidation } from './validate.js';
import { initUploadFile, resetUploadFile } from './upload.js';

const uploadForm = document.querySelector('.img-upload__form');
const openUploadButton = uploadForm.querySelector('.img-upload__input');
const closeUploadButton = uploadForm.querySelector('.img-upload__cancel');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const isElementFocused = (element) => document.activeElement === element;
const isTextFieldFocused = () => isElementFocused(hashtagInput) || isElementFocused(commentInput);

const initForm = () => {
  initUploadFile();
  initScale();
  initEffects();

};

const resetForm = () => {
  resetUploadFile();
  resetScale();
  resetEffects();
  resetValidation();
};

const closePopup = () => {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

  closeUploadButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', documentEscKeydownHandler);
};

const openPopup = () => {
  uploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initForm();
  initValidation(closePopup);

  closeUploadButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', documentEscKeydownHandler);
};

function documentEscKeydownHandler (evt) {
  if (isEscKeydown(evt) && !isTextFieldFocused()) {
    closePopup();
  }
}

openUploadButton.addEventListener('change', openPopup);


