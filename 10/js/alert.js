import { isEscKeydown } from './util';
import { ALERT_SHOW_TIME } from './const';

let alert = null;
let closeButton = null;
let captureStage = null;
let selectorElement = null;

const closeAlertHandler = () => {
  closeButton.removeEventListener('click', closeAlertHandler);
  document.removeEventListener('keydown', alertEscKeydownHandler, captureStage);
  document.removeEventListener('click', documentAlertClickHandler);

  alert.remove();

  alert = null;
  closeButton = null;
  captureStage = null;
};

function documentAlertClickHandler (evt) {
  const alertInner = document.querySelector(`.${selectorElement}__inner`);
  const target = evt.target.closest(`.${selectorElement}__inner`);

  if (target !== alertInner) {
    closeAlertHandler();
  }
}

function alertEscKeydownHandler (evt) {
  if (isEscKeydown(evt)) {
    evt.stopPropagation();
    closeAlertHandler();
  }

}

const showAlert = (selector, capture) => {
  captureStage = capture;
  selectorElement = selector;

  alert = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`).cloneNode(true);
  closeButton = alert.querySelector(`.${selector}__button`);

  closeButton.addEventListener('click', closeAlertHandler);
  document.addEventListener('keydown', alertEscKeydownHandler, captureStage);
  document.addEventListener('click', documentAlertClickHandler);

  document.body.append(alert);
};

const showErrorAlert = (selector) => {
  const errorAlert = document.querySelector(`#${selector}`)
    .content
    .querySelector(`.${selector}`)
    .cloneNode(true);

  document.body.append(errorAlert);

  setTimeout(() => {
    errorAlert.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showErrorAlert};
