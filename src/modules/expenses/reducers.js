import { regularSetReducer, regularSetByIdReducer, omitReducer } from '../../utils/reducerHelpers';

export const initialState = {
  expenses: {},
};

export const reducers = {
  setExpenses: regularSetReducer('expenses'),
  setExpenseById: regularSetByIdReducer('expenses'),
  removeExpenseById: omitReducer('expenses'),
};
