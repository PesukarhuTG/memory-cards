import createElement from '../utils/createElement.js';

const showAlert = (message, time = 3000) => {
  const alertWrapper = createElement('div', {
    className: 'alert',
  });

  const alertText = createElement('p', {
    className: 'alert__text',
    textContent: message,
  });

  alertWrapper.append(alertText);
  document.body.append(alertWrapper);
  setTimeout(() => alertWrapper.classList.add('alert_show'), 0);
  setTimeout(() => {
    alertWrapper.classList.remove('alert_show');
    setTimeout(() => alertWrapper.remove(), 200);
  }, time);
};

export default showAlert;
