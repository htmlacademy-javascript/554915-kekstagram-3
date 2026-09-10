import { isEscKeydown } from './util';
import { ALERT_SHOW_TIME } from './const';

const showAlert = (selector, capture) => {
  const alert = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`).cloneNode(true);
  const closeButton = alert.querySelector(`.${selector}__button`);
  const alertInner = alert.querySelector(`.${selector}__inner`);

  const closeAlertHandler = () => closeAlert();

  function closeAlert () {
    closeButton.removeEventListener('click', closeAlertHandler);
    document.removeEventListener('keydown', alertEscKeydownHandler, capture);
    document.removeEventListener('click', documentAlertClickHandler);

    alert.remove();
  }

  function documentAlertClickHandler (evt) {
    const isChild = alertInner.contains(evt.target);

    if (!isChild) {
      closeAlert();
    }
  }

  function alertEscKeydownHandler (evt) {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      closeAlert();
    }
  }


  closeButton.addEventListener('click', closeAlertHandler);
  document.addEventListener('keydown', alertEscKeydownHandler, capture);
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
