import api from '../../services/api/category';
import { normalizatorById } from '../../utils/helpers';

const effects = {
  async fetchCategories({ resolve, reject } = {}) {
    try {
      const data = await api.getAll();
      const normalized = normalizatorById(data);
      this.setCategories(normalized);
      this.setFetched(true);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async addCategory({ resolve, reject, item } = {}) {
    try {
      const newItem = await api.post(item);
      this.setCategoryById(newItem);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async editCategory({
    resolve, reject, item, id,
  } = {}) {
    try {
      const updatedItem = await api.put(id, item);
      this.setCategoryById(updatedItem);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async removeCategory({
    resolve, reject, id,
  } = {}) {
    try {
      await api.remove(id);
      this.removeCategoryById(id);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
};

export default effects;
