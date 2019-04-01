import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const MenuButton = () => (
  <IconButton color="inherit" aria-label="Open menu">
    <MenuIcon />
  </IconButton>
);

MenuButton.propTypes = {};

MenuButton.defaultProps = {};

export default MenuButton;
