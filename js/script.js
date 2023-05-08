import createHeader from './components/createHeader.js';
import createCategory from './components/createCategory.js';
import {
  getCategories,
  getCards,
  fetchEditCategory,
  fetchCreateCategory,
  fetchDeleteCategory,
} from './utils/apiService.js';
import createElement from './utils/createElement.js';
import createEditCategory from './components/createEditCategory.js';
import createPairs from './components/createPairs.js';
import showAlert from './components/showAlert.js';

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

  const postHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchCreateCategory(data);

    if (dataCategories.err) {
      showAlert(dataCategories.err.message);
      return;
    }

    showAlert(`Новая категория "${data.title}" добавлена`);
    unmountAllSections();
    headerObj.updateHeaderTitle('Категории');
    categoryObj.mount(dataCategories);
  };

  const patchHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(
      editCategoryObj.btnSave.dataset.id,
      data,
    );

    if (dataCategories.err) {
      showAlert(dataCategories.err.message);
      return;
    }

    showAlert(`Категория "${data.title}" обновлена`);
    unmountAllSections();
    headerObj.updateHeaderTitle('Категории');
    categoryObj.mount(dataCategories);
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
    editCategoryObj.btnSave.addEventListener('click', postHandler); //send new data
    editCategoryObj.btnSave.removeEventListener('click', patchHandler);
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

      editCategoryObj.btnSave.addEventListener('click', patchHandler); //send updated data
      editCategoryObj.btnSave.removeEventListener('click', postHandler);

      return;
    }

    if (target.closest('.category__del')) {
      if (confirm('Уверены, что хотите удалить категорию?')) {
        const result = await fetchDeleteCategory(categoryItem.dataset.id);

        if (result.err) {
          showAlert(result.err.message);
          return;
        }

        showAlert(`Категория удалена!`);
        categoryItem.remove();
      }
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
