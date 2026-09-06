import { isEscKeydown } from './util';
import '../vendor/pristine/pristine.min.js'; // Просто подключаем файл

const uploadForm = document.querySelector('.img-upload__form');
const openUploadButton = uploadForm.querySelector('.img-upload__input');
const closeUploadButton = uploadForm.querySelector('.img-upload__cancel');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
// const uploadImage = uploadForm.querySelector('.img-upload__preview img');

const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const VALIDATOR_MODE = {
  SUBMIT: true,
  CHANGE: false,
};

const VALIDATOR_PRIORITY = {
  LOW: 1,
  HIGH: 100,
};

const VALIDATOR_HALT_BEHAVIOR = {
  CONTINUE: false,
  STOP: true,
};

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;

const settings = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__text-error',
  errorTextTag: 'div',
};

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;
const getCommentErrorMessage = () => `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`;

const validateHashtag = (value) => {
  if (!value.trim()) {
    return true;
  }

  const pattern = /^#[a-zа-яё0-9]{1,19}$/i;

  const hashtags = value.trim().split(/\s+/);

  return hashtags.every((hashtag) => pattern.test(hashtag));
};

const validatehashtagLength = (value) => {
  const hashtags = value.trim().split(/\s+/);

  return hashtags.length <= MAX_HASHTAGS;
};

const getHashtagErrorMessage = () => 'Хэштег должен начинаться с символа #, состоять только из букв и чисел, разделятся пробелам и быть не длиннее 20 символов';
const getHashtagLengthErrorMessage = () => 'Хэштегов не должно быть больше 5 штук.';

const pristine = new Pristine(uploadForm, settings, VALIDATOR_MODE.CHANGE);

pristine.addValidator(commentInput, validateComment, getCommentErrorMessage);
pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage, VALIDATOR_PRIORITY.LOW, VALIDATOR_HALT_BEHAVIOR.CONTINUE);
pristine.addValidator(hashtagInput, validatehashtagLength, getHashtagLengthErrorMessage, VALIDATOR_PRIORITY.HIGH, VALIDATOR_HALT_BEHAVIOR.STOP);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Форма успешно отправлена!');
  } else {
    // eslint-disable-next-line no-console
    console.log('Ошибка валидации..');
  }
});

const clearUploadInput = () => (openUploadButton.vlaue = '');

const openPopup = () => {
  uploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', documentEscKeydownHandler);
};

const isElementFocused = (element) => document.activeElement === element;
const isTextFieldFocused = () => isElementFocused(hashtagInput) || isElementFocused(commentInput);

const closePopup = () => {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearUploadInput();

  document.removeEventListener('keydown', documentEscKeydownHandler);
};

function documentEscKeydownHandler (evt) {
  if (isEscKeydown(evt) && !isTextFieldFocused()) {
    closePopup();
  }
}

openUploadButton.addEventListener('change', openPopup);
closeUploadButton.addEventListener('click', closePopup);


