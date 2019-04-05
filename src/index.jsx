import React from 'react';
import ReactDOM from 'react-dom';
import { install } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { ProppyProvider } from 'proppy-react';
import App from './components/App';
import models from './modules';
import TranslationService from './services/translation/service';

install();

TranslationService.setLanguage('es');

const store = init({ models });
const { dispatch, getState } = store;

const providers = { dispatch, getState };

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <ProppyProvider providers={providers}>
        <App />
      </ProppyProvider>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));
