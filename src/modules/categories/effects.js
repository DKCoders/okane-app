import api from '../../services/api/category';
import { normalizatorById } from '../../utils/helpers';

const effects = {
  async fetchCategories({ resolve, reject } = {}) {
    try {
      const data = await api.getAll();
      const normalized = normalizatorById(data);
      this.setCategories(normalized);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
};

export default effects;
