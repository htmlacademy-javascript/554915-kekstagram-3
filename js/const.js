const ALERT_SHOW_TIME = 5000;

const VALIDATOR_MODE = {
  SUBMIT: false,
  CHANGE: true,
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
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const EFFECT_TYPE = {
  NONE: 'none',
};

const UNIT = {
  PIXEL: 'px',
  PERCENT: '%',
  NONE: '',
};

const EFFECT_OPTIONS = {
  none: {
    filter: 'none',
    unit: UNIT.NONE,
    options: { range: { min: 0, max: 100 }, step: 1, start: 100 }
  },
  chrome: {
    filter: 'grayscale',
    unit: UNIT.NONE,
    options: { range: { min: 0, max: 1 }, step: 0.1, start: 1 }
  },
  sepia: {
    filter: 'sepia',
    unit: UNIT.NONE,
    options: { range: { min: 0, max: 1 }, step: 0.1, start: 1 }
  },
  marvin: {
    filter: 'invert',
    unit: UNIT.PERCENT,
    options: { range: { min: 0, max: 100 }, step: 1, start: 100 }
  },
  phobos: {
    filter: 'blur',
    unit: UNIT.PIXEL,
    options: { range: { min: 0, max: 3 }, step: 0.1, start: 3 }
  },
  heat: {
    filter: 'brightness',
    unit: UNIT.NONE,
    options: { range: { min: 1, max: 3 }, step: 0.1, start: 3 }
  }
};

const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  DATA_ERROR: 'data-error',
};

const EVENT_FLOW = {
  CAPTURE: true,
  BUBBLE: false,
};

const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуем...'
};


export {
  EFFECT_TYPE,
  UNIT,
  EFFECT_OPTIONS,
  VALIDATOR_MODE,
  VALIDATOR_PRIORITY,
  VALIDATOR_HALT_BEHAVIOR,
  MAX_COMMENT_LENGTH,
  MAX_HASHTAGS,
  HASHTAG_PATTERN,
  ALERT_SHOW_TIME,
  ALERT_TYPE,
  EVENT_FLOW,
  SUBMIT_BUTTON_TEXT
};
