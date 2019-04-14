import { regularSetReducer, regularSetByIdReducer, omitReducer } from '../../utils/reducerHelpers';

export const initialState = {
  categories: {},
};

export const reducers = {
  setCategories: regularSetReducer('categories'),
  setCategoryById: regularSetByIdReducer('categories'),
  removeCategoryById: omitReducer('categories'),
};
