import uuid from 'uuid/v1';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';

class CategoryApi {
  static getAll() {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      resolve(items);
    });
  }

  static post(item) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      const newItem = { ...item, id: uuid() };
      const newItems = [...items, newItem];
      setToLocalStorage('categories', newItems);
      resolve(newItem);
    });
  }

  static put(id, updatedItem) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('categories');
      const index = items.findIndex(item => item.id === id);
      if (index !== -1 && items[index]) {
        items[index] = { ...updatedItem, id };
      }
      setToLocalStorage('categories', items);
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
      setToLocalStorage('categories', items);
      resolve(items[index]);
    });
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      const items = getFromLocalStorage('categories');
      const indexForRemove = items.findIndex(item => item.id === id);
      if (indexForRemove !== -1) {
        const newItems = items.filter((item, index) => index !== indexForRemove);
        setToLocalStorage('categories', newItems);
        resolve(newItems);
      } else {
        reject(new Error('Id not found'));
      }
    });
  }
}

export default CategoryApi;
