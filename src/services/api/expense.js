import uuid from 'uuid/v1';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';

class ExpenseApi {
  static getAll() {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('expenses');
      resolve(items);
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('expenses');
      resolve(items.find(item => item.id === id));
    });
  }

  static post(item) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('expenses');
      const newItem = { ...item, id: uuid() };
      const newItems = [...items, newItem];
      setToLocalStorage('expenses', newItems);
      resolve(newItem);
    });
  }

  static put(id, updatedItem) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('expenses');
      const index = items.findIndex(item => item.id === id);
      if (index !== -1 && items[index]) {
        items[index] = { ...updatedItem, id };
      }
      setToLocalStorage('expenses', items);
      resolve(items[index]);
    });
  }

  static patch(id, updatedItem) {
    return new Promise((resolve) => {
      const items = getFromLocalStorage('expenses');
      const index = items.findIndex(item => item.id === id);
      if (index !== -1 && items[index]) {
        items[index] = { ...items[index], ...updatedItem, id };
      }
      setToLocalStorage('expenses', items);
      resolve(items[index]);
    });
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      const items = getFromLocalStorage('expenses');
      const indexForRemove = items.findIndex(item => item.id === id);
      if (indexForRemove !== -1) {
        const newItems = items.filter((item, index) => index !== indexForRemove);
        setToLocalStorage('expenses', newItems);
        resolve(newItems);
      } else {
        reject(new Error('Id not found'));
      }
    });
  }
}

export default ExpenseApi;
