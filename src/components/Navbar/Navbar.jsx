import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '../StyledAppBar';
import Toolbar from '../Toolbar';

const Navbar = ({
  left, title, right,
}) => (
  <AppBar position="sticky">
    <Toolbar left={left} title={title} right={right} />
  </AppBar>
);

Navbar.propTypes = {
  left: PropTypes.node,
  title: PropTypes.node,
  right: PropTypes.node,
};

Navbar.defaultProps = {
  left: null,
  title: null,
  right: null,
};

export default Navbar;
