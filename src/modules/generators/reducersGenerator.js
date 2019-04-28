import { regularSetReducer, regularSetByIdReducer, omitReducer } from '../../utils/reducerHelpers';

const reducersGenerator = (key) => {
  const initialState = {
    [key]: {},
    fetched: false,
  };

  const reducers = {
    setAll: regularSetReducer(key),
    setById: regularSetByIdReducer(key),
    removeById: omitReducer(key),
    setFetched: regularSetReducer('fetched'),
  };

  return { initialState, reducers };
};

export default reducersGenerator;
