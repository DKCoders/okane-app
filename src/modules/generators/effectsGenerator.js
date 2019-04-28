import { normalizatorById } from '../../utils/helpers';

const effectsGenerator = api => ({
  async fetch({ resolve, reject } = {}) {
    try {
      const data = await api.getAll();
      const normalized = normalizatorById(data);
      this.setAll(normalized);
      this.setFetched(true);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async add({ resolve, reject, item } = {}) {
    try {
      const newItem = await api.post(item);
      this.setById(newItem);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async edit({
    resolve, reject, item, id,
  } = {}) {
    try {
      const updatedItem = await api.put(id, item);
      this.setById(updatedItem);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
  async remove({
    resolve, reject, id,
  } = {}) {
    try {
      await api.remove(id);
      this.removeById(id);
      if (resolve) resolve();
    } catch (e) {
      if (reject) reject(e);
    }
  },
});

export default effectsGenerator;
