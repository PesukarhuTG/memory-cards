import createHeader from './components/createHeader.js';
import createCategory from './components/createCategory.js';
import { getCategories } from './utils/apiService.js';
import createElement from './utils/createElement.js';
import createEditCategory from './components/createEditCategory.js';

const initApp = async () => {
  const header = document.querySelector('.header');
  const app = document.getElementById('app');

  const headerObj = createHeader(header);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);

  const unmountAllSections = () => {
    [categoryObj, editCategoryObj].forEach(obj => obj.unmount());
  };

  const renderIndex = async e => {
    e?.preventDefault();
    unmountAllSections();

    // 1) get data from API
    const categories = await getCategories();

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
};

initApp();
