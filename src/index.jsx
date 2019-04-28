import React from 'react';
import ReactDOM from 'react-dom';
import { install, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { HashRouter as Router } from 'react-router-dom';
import { init } from '@rematch/core';
import { StoreContext } from 'redux-react-hook';
import { SnackbarProvider } from 'notistack';
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

TranslationService.initialize();

const store = init({ models });
const { dispatch, getState } = store;

const providers = { dispatch, getState };

const startApp = () => {
  ReactDOM.render((
    <Router>
      <SnackbarProvider maxSnack={3}>
        <StoreContext.Provider value={store}>
          <ThemeProvider theme={theme}>
            <ProppyProvider providers={providers}>
              <App />
            </ProppyProvider>
          </ThemeProvider>
        </StoreContext.Provider>
      </SnackbarProvider>
    </Router>
  ), document.getElementById('root'));
};

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
