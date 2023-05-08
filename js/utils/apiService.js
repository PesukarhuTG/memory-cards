const API_URL = 'https://shelled-verbena-catshark.glitch.me';

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/category`);

    if (!(response.status === 200 || response.status === 201)) {
      const err = await response.json();
      throw err;
    }

    const categories = await response.json();
    return categories;
  } catch (err) {
    return { err };
  }
};

export const getCards = async id => {
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`);

    if (!(response.status === 200 || response.status === 201)) {
      const err = await response.json();
      throw err;
    }

    const cards = await response.json();
    return cards;
  } catch (err) {
    return { err };
  }
};

export const fetchCreateCategory = async data => {
  try {
    const response = await fetch(`${API_URL}/api/category/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!(response.status === 200 || response.status === 201)) {
      const err = await response.json();
      throw err;
    }

    const categories = await response.json();
    return categories;
  } catch (err) {
    return { err };
  }
};

export const fetchEditCategory = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (!(response.status === 200 || response.status === 201)) {
      const err = await response.json();
      throw err;
    }

    const categories = await response.json();
    return categories;
  } catch (err) {
    return { err };
  }
};

export const fetchDeleteCategory = async id => {
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`, {
      method: 'DELETE',
    });

    if (!(response.status === 200 || response.status === 201)) {
      const err = await response.json();
      throw err;
    }

    const result = await response.json();
    return result;
  } catch (err) {
    return { err };
  }
};
