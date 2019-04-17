import api from '../../services/api/expense';
import { normalizatorById } from '../../utils/helpers';

const effects = {
  async fetchExpenses({ resolve, reject } = {}) {
    try {
      const data = await api.getAll();
      const normalized = normalizatorById(data);
      this.setExpenses(normalized);
      this.setFetched(true);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async addExpense(item) {
    const newItem = await api.post(item);
    this.setExpenseById(newItem);
    return newItem;
  },
  async editExpense({
    item, id,
  } = {}) {
    const updatedItem = await api.put(id, item);
    this.setExpenseById(updatedItem);
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
