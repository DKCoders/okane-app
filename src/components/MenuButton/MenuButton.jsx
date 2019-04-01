import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';

const P = withHandlers({
  openDrawer: (props, { dispatch }) => () => {
    dispatch.app.setMenuOpen(true);
  },
});

const MenuButton = ({ openDrawer }) => (
  <IconButton color="inherit" aria-label="Open menu" onClick={openDrawer}>
    <MenuIcon />
  </IconButton>
);

MenuButton.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

MenuButton.defaultProps = {};

export default attach(P)(MenuButton);
