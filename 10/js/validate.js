import {
  VALIDATOR_MODE,
  VALIDATOR_PRIORITY,
  VALIDATOR_HALT_BEHAVIOR,
  MAX_COMMENT_LENGTH,
  MAX_HASHTAGS,
  HASHTAG_PATTERN,
  ALERT_TYPE,
  EVENT_FLOW,
  SUBMIT_BUTTON_TEXT
} from './const.js';
import { sendData } from './api.js';
import {showAlert} from './alert.js';

const uploadForm = document.querySelector('.img-upload__form');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');

let uploadFormSubmitHandler = null;

const settings = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
};

const disableSubmitButton = () => {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};

const enableSubmitButton = () => {
  submitButton.removeAttribute('disabled', 'disabled');
  submitButton.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};

const getFormData = (evt) => new FormData(evt.target);
const getHashtags = (hashtags) => hashtags.trim().split(/\s+/);

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtag = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtags(value);

  return hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag));
};

const validatehashtagCount = (value) => {
  const hashtags = getHashtags(value);

  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value).map((tag) => tag.toLowerCase());

  return hashtags.length === new Set(hashtags).size;
};

const getCommentErrorMessage = () => `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`;
const getHashtagErrorMessage = () => 'Хэштег должен начинаться с символа #, состоять только из букв и чисел, разделятся пробелам и быть не длиннее 20 символов';
const getHashtagCountErrorMessage = () => `Хэштегов не должно быть больше ${MAX_HASHTAGS} штук.`;
const getHashtagUniqueErrorMessage = () => 'Хэштеги не должны повторяться';

const pristine = new Pristine(uploadForm, settings, VALIDATOR_MODE.CHANGE);

pristine.addValidator(commentInput, validateComment, getCommentErrorMessage);
pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage, VALIDATOR_PRIORITY.LOW, VALIDATOR_HALT_BEHAVIOR.CONTINUE);
pristine.addValidator(hashtagInput, validatehashtagCount, getHashtagCountErrorMessage, VALIDATOR_PRIORITY.HIGH, VALIDATOR_HALT_BEHAVIOR.STOP);
pristine.addValidator(hashtagInput, validateHashtagUnique, getHashtagUniqueErrorMessage, VALIDATOR_PRIORITY.LOW, VALIDATOR_HALT_BEHAVIOR.CONTINUE);

const uploadFormSubmit = (evt, onSuccess) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    disableSubmitButton();

    sendData(
      () => {
        onSuccess();
        showAlert(ALERT_TYPE.SUCCESS, EVENT_FLOW.BUBBLE);
        enableSubmitButton();
        // eslint-disable-next-line no-console
        console.log('Форма успешно отправлена!');
      },
      () => {
        enableSubmitButton();
        showAlert(ALERT_TYPE.ERROR, EVENT_FLOW.CAPTURE);
        // eslint-disable-next-line no-console
        console.log('Форма не отправлена..');
      },
      getFormData(evt)
    );

  } else {
    // eslint-disable-next-line no-console
    console.log('Ошибка валидации..');
  }
};

const initValidation = (onSuccess) => {
  uploadFormSubmitHandler = (evt) => uploadFormSubmit(evt, onSuccess);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
};

const resetValidation = () => {
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
  uploadForm.removeEventListener('submit', uploadFormSubmitHandler);
  uploadFormSubmitHandler = null;
};

export { initValidation, resetValidation };
