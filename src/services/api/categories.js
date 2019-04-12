import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';

class CategoriesApi {
  static getAll() {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      resolve(items);
    });
  }

  static post(item) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      const newItems = [...items, item];
      setToLocalStorage('items', newItems);
      resolve(item);
    });
  }

  static put(id, updatedItem) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      const index = items.findIndex(item => item.id === id);
      if (index !== -1 && items[index]) {
        items[index] = { ...updatedItem, id };
      }
      setToLocalStorage('items', items);
      resolve(items[index]);
    });
  }

  static patch(id, updatedItem) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      const index = items.findIndex(item => item.id === id);
      if (index !== -1 && items[index]) {
        items[index] = { ...items[index], ...updatedItem, id };
      }
      setToLocalStorage('items', items);
      resolve(items[index]);
    });
  }

  static remove(indexForRemove) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      const newItems = items.filter((item, index) => index !== indexForRemove);
      setToLocalStorage('items', newItems);
      resolve(newItems);
    });
  }
}

export default CategoriesApi;
