import { EFFECT_TYPE, EFFECT_OPTIONS } from './const';

const effectsContainer = document.querySelector('.img-upload__wrapper');
const sliderContainer = effectsContainer.querySelector('.img-upload__effect-level');
const sliderControl = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');
const effectsList = effectsContainer.querySelector('.effects__list');
const previewImage = effectsContainer.querySelector('.img-upload__preview img');

let currentEffect = EFFECT_TYPE.NONE;

const effectOptions = {
  ...EFFECT_OPTIONS[currentEffect].options,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  }
};

const getSliderValue = () => sliderControl.noUiSlider.get();

const updateInputValue = (value) => {
  sliderInput.value = value;
};

const updatePreviewImageStyles = (value) => {
  previewImage.style.filter = value;
};

const showSliderContainer = () => sliderContainer.classList.remove('hidden');
const hideSliderContainer = () => sliderContainer.classList.add('hidden');

const updateSliderOptions = (config) => {
  sliderControl.noUiSlider.updateOptions(config.options);
};

const effectsListChangeHandler = (evt) => {
  const effectButton = evt.target.closest('.effects__radio');

  if (!effectButton) {
    return;
  }

  currentEffect = effectButton.value;

  const config = EFFECT_OPTIONS[currentEffect];

  if (currentEffect === EFFECT_TYPE.NONE) {
    hideSliderContainer();
    updatePreviewImageStyles(EFFECT_TYPE.NONE);
  } else {
    showSliderContainer();
    updateSliderOptions(config);
  }
};

const resetEffects = () => {
  hideSliderContainer();
  currentEffect = EFFECT_TYPE.NONE;
  updatePreviewImageStyles(EFFECT_TYPE.NONE);
  sliderControl.noUiSlider.destroy();
  effectsList.querySelector('#effect-none').checked = true;
  effectsList.removeEventListener('change', effectsListChangeHandler);
};

const initEffects = () => {
  hideSliderContainer();

  noUiSlider.create(sliderControl, effectOptions);

  sliderControl.noUiSlider.on('update', () => {
    const sliderValue = getSliderValue();
    updateInputValue(sliderValue);

    const { filter, unit } = EFFECT_OPTIONS[currentEffect];

    if (currentEffect === EFFECT_TYPE.NONE) {
      updatePreviewImageStyles(EFFECT_TYPE.NONE);
    } else {
      updatePreviewImageStyles(`${filter}(${sliderValue}${unit})`);
    }
  });

  effectsList.addEventListener('change', effectsListChangeHandler);
};

export {initEffects, resetEffects};
