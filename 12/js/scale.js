import '../vendor/nouislider/nouislider';

const scaleContainer = document.querySelector('.img-upload');
const scaleMinusButton = scaleContainer.querySelector('.scale__control--smaller');
const scalePlusButton = scaleContainer.querySelector('.scale__control--bigger');
const scaleInput = scaleContainer.querySelector('.scale__control--value');
const scaleImage = scaleContainer.querySelector('.img-upload__preview img');

const SCALE_PARAMS = {
  MAX: 100,
  MIN: 25,
  DEFAULT: 100,
  STEP: 25,
};

let currentScale = SCALE_PARAMS.DEFAULT;

const normalizeScale = (value) => value / 100;

const updateInputScale = (scale) => (scaleInput.value = `${scale}%`);
const updateImageScale = (scale) => (scaleImage.setAttribute('style', `transform: scale(${normalizeScale(scale)})`));

const scaleMinusButtonHandler = () => {
  if (currentScale > SCALE_PARAMS.MIN) {
    currentScale -= SCALE_PARAMS.STEP;
  }

  updateInputScale(currentScale);
  updateImageScale(currentScale);
};

const scalePlusButtonHandler = () => {
  if (currentScale < SCALE_PARAMS.MAX) {
    currentScale += SCALE_PARAMS.STEP;
  }

  updateInputScale(currentScale);
  updateImageScale(currentScale);
};

const setDefaultParams = () => {
  currentScale = SCALE_PARAMS.DEFAULT;

  updateInputScale(SCALE_PARAMS.DEFAULT);
  updateImageScale(SCALE_PARAMS.DEFAULT);
};

const resetScale = () => {
  setDefaultParams();

  scaleMinusButton.removeEventListener('click', scaleMinusButtonHandler);
  scalePlusButton.removeEventListener('click', scalePlusButtonHandler);
};

const initScale = () => {
  setDefaultParams();

  scaleMinusButton.addEventListener('click', scaleMinusButtonHandler);
  scalePlusButton.addEventListener('click', scalePlusButtonHandler);
};


export {initScale, resetScale};
