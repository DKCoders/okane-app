import { regularSetReducer, regularSetByIdReducer, omitReducer } from '../../utils/reducerHelpers';

export const initialState = {
  categories: {},
  fetched: false,
};

export const reducers = {
  setCategories: regularSetReducer('categories'),
  setCategoryById: regularSetByIdReducer('categories'),
  removeCategoryById: omitReducer('categories'),
  setFetched: regularSetReducer('fetched'),
};
