import { regularSetReducer } from '../../utils/reducerHelpers';

export const initialState = {
  menuOpen: false,
  expenseListTab: 0,
};

export const reducers = {
  setMenuOpen: regularSetReducer('menuOpen'),
  setExpenseListTab: regularSetReducer('expenseListTab'),
};
