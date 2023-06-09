import createElement from '../utils/createElement.js';

const TITLE = 'Введите название категории';

const createEditCategory = parentElem => {
  const editSection = createElement('section', {
    className: 'edit section-offset',
  });

  const container = createElement('div', {
    className: 'container edit__container',
  });

  const title = createElement('h2', {
    className: 'edit__title',
    contentEditable: true,
    title: 'Можно редактировать',
  });

  const table = createElement('table', {
    className: 'edit__table table',
  });

  const thead = createElement('thead');
  const trThead = createElement('tr');

  const tableHeadCellMain = createElement('th', {
    className: 'table__cell',
    textContent: 'front side',
  });

  const tableHeadCellSecond = createElement('th', {
    className: 'table__cell',
    textContent: 'back side',
  });

  const tableHeadCellEmpty = createElement('th', {
    className: 'table__cell',
  });

  const tbody = createElement('tbody');

  const btnWrapper = createElement('div', {
    className: 'edit__btn-wrapper',
  });

  const btnAddRow = createElement('button', {
    className: 'edit__btn edit__add-row',
    textContent: 'Добавить пару',
  });

  const btnSave = createElement('button', {
    className: 'edit__btn edit__save',
    textContent: 'Сохранить категорию',
  });

  const btnCancel = createElement('button', {
    className: 'edit__btn edit__cancel',
    textContent: 'Отмена',
  });

  trThead.append(tableHeadCellMain, tableHeadCellSecond, tableHeadCellEmpty);
  thead.append(trThead);
  table.append(thead, tbody);
  btnWrapper.append(btnAddRow, btnSave, btnCancel);
  container.append(title, table, btnWrapper);
  editSection.append(container);

  const createTRCell = dataArr => {
    const tr = createElement('tr');

    const tableCellMain = createElement('td', {
      className: 'table__cell table__cell_one',
      contentEditable: true,
      textContent: dataArr[0],
    });

    const tableCellSecond = createElement('td', {
      className: 'table__cell table__cell_two',
      contentEditable: true,
      textContent: dataArr[1],
    });

    const tableCellDel = createElement('td', {
      className: 'table__cell',
    });

    const btnDelRow = createElement('button', {
      className: 'table__del',
      textContent: 'x',
    });

    btnDelRow.addEventListener('click', () => {
      if (confirm('Вы уверены в удалении строки?')) {
        tr.remove();
      }
    });

    tableCellDel.append(btnDelRow);
    tr.append(tableCellMain, tableCellSecond, tableCellDel);

    return tr;
  };

  const clearTitle = () => {
    if (title.textContent === TITLE) {
      title.textContent = '';
    }
  };

  const checkTitle = () => {
    if (title.textContent === '') {
      title.textContent = TITLE;
    }
  };

  title.addEventListener('focus', clearTitle);
  title.addEventListener('blur', checkTitle);

  btnAddRow.addEventListener('click', () => {
    const emptyRow = createTRCell(['', '']);
    tbody.append(emptyRow);
  });

  // read new inputed words
  const parseData = () => {
    const cellsMain = document.querySelectorAll('.table__cell_one');
    const cellsSecond = document.querySelectorAll('.table__cell_two');

    const data = {
      pairs: [],
    };

    for (let i = 0; i < cellsMain.length; i++) {
      const textMain = cellsMain[i].textContent.trim();
      const textSecond = cellsSecond[i].textContent.trim();

      if (textMain && textSecond) {
        data.pairs[i] = [textMain, textSecond];
      }
    }

    if (title.textContent.trim() && title.textContent !== TITLE) {
      data.title = title.textContent.trim();
    }

    if (btnSave.dataset.id) {
      data.id = btnSave.dataset.id;
    }

    return data;
  };

  const mount = (data = { title: TITLE, pairs: [] }) => {
    tbody.textContent = '';
    title.textContent = data.title;

    if (title.textContent === TITLE) {
      title.classList.add('edit__title_change');
    } else {
      title.classList.remove('edit__title_change');
    }

    const rows = data.pairs.map(createTRCell);
    const emptyRow = createTRCell(['', '']);
    tbody.append(...rows, emptyRow);

    btnSave.dataset.id = data.id ? data.id : '';

    parentElem.append(editSection);
  };

  const unmount = () => {
    editSection.remove();
  };

  return { mount, unmount, parseData, btnSave, btnCancel };
};

export default createEditCategory;
