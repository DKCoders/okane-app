import { regularSetReducer } from '../../utils/reducerHelpers';

export const initialState = {
  menuOpen: false,
};

export const reducers = {
  setMenuOpen: regularSetReducer('menuOpen'),
};
