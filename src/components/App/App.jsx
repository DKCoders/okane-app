import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuDrawer from '../MenuDrawer';
import Routes from '../../routes';

function App() {
  return (
    <div>
      <CssBaseline />
      <MenuDrawer />
      <Routes />
    </div>
  );
}

export default App;
