import api from '../../services/api/expense';
import { normalizatorById } from '../../utils/helpers';

const effects = {
  async fetchExpenses({ resolve, reject } = {}) {
    try {
      const data = await api.getAll();
      const normalized = normalizatorById(data);
      this.setExpenses(normalized);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async addExpense({ resolve, reject, item } = {}) {
    try {
      const newItem = await api.post(item);
      this.setExpenseById(newItem);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async editExpense({
    resolve, reject, item, id,
  } = {}) {
    try {
      const updatedItem = await api.put(id, item);
      this.setExpenseById(updatedItem);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async removeExpense({
    resolve, reject, id,
  } = {}) {
    try {
      await api.remove(id);
      this.removeExpenseById(id);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
};

export default effects;
