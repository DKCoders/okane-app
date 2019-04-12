import { regularSetReducer } from '../../utils/reducerHelpers';

export const initialState = {
  categories: {},
};

export const reducers = {
  setCategories: regularSetReducer('categories'),
};
