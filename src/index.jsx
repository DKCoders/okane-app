import React from 'react';
import ReactDOM from 'react-dom';
import { install, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { HashRouter as Router } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { ProppyProvider } from 'proppy-react';
import App from './components/App';
import models from './modules';
import TranslationService from './services/translation/service';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  custom: {
    padding: 24,
  },
});

install();

TranslationService.setLanguage('es');

const store = init({ models });
const { dispatch, getState } = store;

const providers = { dispatch, getState };

ReactDOM.render((
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ProppyProvider providers={providers}>
          <App />
        </ProppyProvider>
      </ThemeProvider>
    </Provider>
  </Router>
), document.getElementById('root'));
