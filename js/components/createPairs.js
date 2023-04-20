import createElement from '../utils/createElement.js';
import showAlert from './showAlert.js';

const createPairs = parentElem => {
  const pairs = createElement('section', {
    className: 'card section-offset',
  });

  const container = createElement('div', {
    className: 'container card__container',
  });

  const btnReturn = createElement('button', {
    className: 'card__return',
    ariaLabel: 'Возврат к категориям',
  });

  const btnCard = createElement('button', {
    className: 'card__item',
  });

  const spanFront = createElement('span', {
    className: 'card__front',
    textContent: '123',
  });

  const spanBack = createElement('span', {
    className: 'card__back',
    textContent: '321',
  });

  btnCard.append(spanFront, spanBack);
  container.append(btnReturn, btnCard);
  pairs.append(container);

  const cardController = data => {
    let index = 0;

    spanFront.textContent = data[index][0];
    spanBack.textContent = data[index][1];

    const flipCard = () => {
      btnCard.classList.add('card__item_flipped');
      btnCard.removeEventListener('click', flipCard);

      setTimeout(() => {
        btnCard.classList.remove('card__item_flipped');

        setTimeout(() => {
          index++;
          if (index === data.length) {
            spanFront.textContent = 'Карточки закончились';
            showAlert('Возврат к категориям...', 2400);
            // emulation returning to main page
            setTimeout(() => {
              btnReturn.click();
            }, 2000);
            return;
          }

          spanFront.textContent = data[index][0];
          spanBack.textContent = data[index][1];

          btnCard.addEventListener('click', flipCard);
        }, 100);
      }, 1500);
    };

    btnCard.addEventListener('click', flipCard);
  };

  const mount = data => {
    parentElem.append(pairs);
    cardController(data.pairs);
  };

  const unmount = () => pairs.remove();

  return { btnReturn, mount, unmount };
};

export default createPairs;
