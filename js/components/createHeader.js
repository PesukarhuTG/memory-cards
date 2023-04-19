import createElement from '../utils/createElement.js';

const createHeader = (parentElem) => {
  const container = createElement('div', {
    className: 'container header__container',
  });

  const logoLink = createElement('a', {
    className: 'header__logo-link',
    href: '#',
  });

  const logoImg = createElement('img', {
    className: 'header__logo',
    alt: 'Логотип сервиса Brain Cards',
    src: 'img/logo.svg',
  });

  const headerTitle = createElement('h2', {
    className: 'header__subtitle',
    textContent: 'Категории',
  });

  const headerBtn = createElement('button', {
    className: 'header__btn',
    textContent: 'Добавить категорию',
  });

  const updateHeaderTitle = (title) => {
    headerTitle.textContent = title;
  };

  logoLink.append(logoImg);
  container.append(logoLink, headerTitle, headerBtn);
  parentElem.append(container);

  // to add extra functional
  return { logoLink, headerBtn, updateHeaderTitle };
};

export default createHeader;
