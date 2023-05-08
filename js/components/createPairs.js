import createElement from '../utils/createElement.js';
import mixArrayElements from '../utils/mixArrayElements.js';
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

  let dataCards = [];

  const flipCard = () => {
    console.log(btnCard.index);
    btnCard.classList.add('card__item_flipped');
    btnCard.removeEventListener('click', flipCard);

    setTimeout(() => {
      btnCard.classList.remove('card__item_flipped');

      setTimeout(() => {
        btnCard.index++;
        if (btnCard.index === dataCards.length) {
          spanFront.textContent = 'Карточки закончились';
          showAlert('Возврат к категориям...', 2400);
          // emulation returning to main page
          setTimeout(() => {
            btnReturn.click();
          }, 2000);
          return;
        }

        spanFront.textContent = dataCards[btnCard.index][0];
        spanBack.textContent = dataCards[btnCard.index][1];

        btnCard.addEventListener('click', flipCard);
      }, 100);
    }, 1500);
  };

  const cardController = data => {
    dataCards = [...data];
    btnCard.index = 0; //create new attr

    spanFront.textContent = data[btnCard.index][0];
    spanBack.textContent = data[btnCard.index][1];

    btnCard.addEventListener('click', flipCard);
  };

  const mount = data => {
    parentElem.append(pairs);
    const mixedPairsArr = mixArrayElements(data.pairs);
    cardController(mixedPairsArr);
  };

  const unmount = () => {
    pairs.remove();
    btnCard.removeEventListener('click', flipCard);
  };

  return { btnReturn, mount, unmount };
};

export default createPairs;
