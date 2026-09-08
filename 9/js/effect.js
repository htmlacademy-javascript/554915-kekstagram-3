import { EFFECT_TYPE, EFFECT_CONFIGS } from './const';

const effectsContainer = document.querySelector('.img-upload__wrapper');
const sliderContainer = effectsContainer.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');
const effectsList = effectsContainer.querySelector('.effects__list');
const previewImage = effectsContainer.querySelector('.img-upload__preview img');

let currentEffect = EFFECT_TYPE.NONE;

const options = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  }
};

const getSliderValue = () => sliderElement.noUiSlider.get();
const updateInputValue = (value) => (sliderInput.value = value);
const updatePreviewImageStyles = (value) => (previewImage.style.filter = value);

const showSliderContainer = () => sliderContainer.classList.remove('hidden');
const hideSliderContainer = () => sliderContainer.classList.add('hidden');

const updateSliderOptions = (config) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: config.options.min,
      max: config.options.max,
    },
    step: config.options.step,
    start: config.options.start,
  });
};

const effectsListChangeHandler = (evt) => {
  const effectButton = evt.target.closest('.effects__radio');

  if (!effectButton) {
    return;
  }

  currentEffect = effectButton.value;

  const config = EFFECT_CONFIGS[currentEffect];

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
  sliderElement.noUiSlider.destroy();
};

const initEffects = () => {
  hideSliderContainer();

  noUiSlider.create(sliderElement, options);

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = getSliderValue();
    updateInputValue(sliderValue);

    const { filter, unit } = EFFECT_CONFIGS[currentEffect];

    if (currentEffect === EFFECT_TYPE.NONE) {
      updatePreviewImageStyles(EFFECT_TYPE.NONE);
    } else {
      updatePreviewImageStyles(`${filter}(${sliderValue}${unit})`);
    }
  });

  effectsList.addEventListener('change', effectsListChangeHandler);
};

export {initEffects, resetEffects};
