import createElement from '../utils/createElement.js';
import declOfNum from '../utils/wordsDeclination.js';

const createCategory = parentElem => {
  const section = createElement('section', {
    className: 'category section-offset',
  });

  const container = createElement('div', {
    className: 'container',
  });

  const categoryList = createElement('ul', {
    className: 'category__list',
  });

  // create single card - one 'li' element
  const createCategoryCard = data => {
    const card = createElement('li', {
      className: 'category__item',
    });

    card.dataset.id = data.id;

    const btnCardDesc = createElement('button', {
      className: 'category__card',
    });

    const btnCardEdit = createElement('button', {
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });

    const btnCardDel = createElement('button', {
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });

    const spanTitle = createElement('span', {
      className: 'category__title',
      textContent: data.title,
    });

    const spanPair = createElement('span', {
      className: 'category__pairs',
      textContent: `${declOfNum(data.length, ['пара', 'пары', 'пар'])}`,
    });

    btnCardDesc.append(spanTitle, spanPair);
    card.append(btnCardDesc, btnCardEdit, btnCardDel);

    return card;
  };

  container.append(categoryList);
  section.append(container);

  // show data function
  const mount = data => {
    categoryList.textContent = '';
    parentElem.append(section);

    const cards = data.map(createCategoryCard);
    categoryList.append(...cards);
  };

  // clear data function
  const unmount = () => section.remove();

  return { mount, unmount, categoryList };
};

export default createCategory;
