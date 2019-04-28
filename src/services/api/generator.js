import uuid from 'uuid/v1';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';


const apiServiceGenerator = (key) => {
  class ServiceApi {
    static getAll() {
      return new Promise((resolve) => {
        const items = getFromLocalStorage(key);
        resolve(items);
      });
    }

    static getById(id) {
      return new Promise((resolve) => {
        const items = getFromLocalStorage(key);
        resolve(items.find(item => item.id === id));
      });
    }

    static post(item) {
      return new Promise((resolve) => {
        const items = getFromLocalStorage(key);
        const newItem = { ...item, id: uuid() };
        const newItems = [...items, newItem];
        setToLocalStorage(key, newItems);
        resolve(newItem);
      });
    }

    static put(id, updatedItem) {
      return new Promise((resolve) => {
        const items = getFromLocalStorage(key);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1 && items[index]) {
          items[index] = { ...updatedItem, id };
        }
        setToLocalStorage(key, items);
        resolve(items[index]);
      });
    }

    static patch(id, updatedItem) {
      return new Promise((resolve) => {
        const items = getFromLocalStorage(key);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1 && items[index]) {
          items[index] = { ...items[index], ...updatedItem, id };
        }
        setToLocalStorage(key, items);
        resolve(items[index]);
      });
    }

    static remove(id) {
      return new Promise((resolve, reject) => {
        const items = getFromLocalStorage(key);
        const indexForRemove = items.findIndex(item => item.id === id);
        if (indexForRemove !== -1) {
          const newItems = items.filter((item, index) => index !== indexForRemove);
          setToLocalStorage(key, newItems);
          resolve(newItems);
        } else {
          reject(new Error('Id not found'));
        }
      });
    }
  }

  return ServiceApi;
};

export default apiServiceGenerator;
