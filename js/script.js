import createHeader from './components/createHeader.js'

const initApp = () => {
  const header = document.querySelector('.header');
  const app = document.getElementById('app');

  const headerObj = createHeader(header);

  const returnIndex = (e) => {
    e.preventDefault();
    headerObj.updateHeaderTitle('Категории');
  };
  
  headerObj.logoLink.addEventListener('click', returnIndex); //clicking by header logo redirects us to the main state
  headerObj.headerBtn.addEventListener('click', () => { //clicking by header btn redirects us to the creation of new category
    headerObj.updateHeaderTitle('Новая категория');
  }); 
};

initApp();