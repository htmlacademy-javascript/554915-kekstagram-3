import '../vendor/pristine/pristine.min.js';
import {
  VALIDATOR_MODE,
  VALIDATOR_PRIORITY,
  VALIDATOR_HALT_BEHAVIOR,
  MAX_COMMENT_LENGTH,
  MAX_HASHTAGS,
  HASHTAG_PATTERN
} from './const.js';

const uploadForm = document.querySelector('.img-upload__form');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');


const settings = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__text-error',
  errorTextTag: 'div',
};

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

const resetValidation = () => pristine.reset();

export { resetValidation };
