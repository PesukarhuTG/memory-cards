import createHeader from './components/createHeader.js';
import createCategory from './components/createCategory.js';
import { getCategories, getCards } from './utils/apiService.js';
import createElement from './utils/createElement.js';
import createEditCategory from './components/createEditCategory.js';
import createPairs from './components/createPairs.js';

const initApp = async () => {
  const header = document.querySelector('.header');
  const app = document.getElementById('app');

  const headerObj = createHeader(header);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);
  const pairsObject = createPairs(app);

  const unmountAllSections = () => {
    [categoryObj, editCategoryObj, pairsObject].forEach(obj => obj.unmount());
  };

  const renderIndex = async e => {
    e?.preventDefault();
    unmountAllSections();

    // 1) get data from API
    const categories = await getCategories();
    headerObj.updateHeaderTitle('Категории');

    // 2) error checking
    if (categories.err) {
      app.append(
        createElement('p', {
          className: 'server-error',
          textContent: 'Ошибка сервера, попробуйте позже',
        }),
      );
      return;
    }

    // 3) show data
    categoryObj.mount(categories);

    headerObj.updateHeaderTitle('Категории');
  };

  renderIndex(); // launch with 1st render

  headerObj.logoLink.addEventListener('click', renderIndex); //clicking by header logo redirects us to the main state
  headerObj.headerBtn.addEventListener('click', () => {
    //clicking by header btn redirects us to the creation of new category
    unmountAllSections();
    headerObj.updateHeaderTitle('Новая категория');
    editCategoryObj.mount();
  });

  // checking: which card was clicked and find edit icon
  categoryObj.categoryList.addEventListener('click', async e => {
    const target = e.target;
    const categoryItem = target.closest('.category__item');

    if (target.closest('.category__edit')) {
      const dataCards = await getCards(categoryItem.dataset.id);
      unmountAllSections();
      headerObj.updateHeaderTitle('Редактирование');
      editCategoryObj.mount(dataCards);
      return;
    }

    if (target.closest('.category__del')) {
      console.log('del');
      return;
    }

    if (categoryItem) {
      const dataCards = await getCards(categoryItem.dataset.id);
      unmountAllSections();
      headerObj.updateHeaderTitle(`Категория: ${dataCards.title}`);
      pairsObject.mount(dataCards);
    }
  });

  pairsObject.btnReturn.addEventListener('click', renderIndex);
};

initApp();
