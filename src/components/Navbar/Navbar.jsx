import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '../StyledAppBar';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  buttons: {
    display: 'flex',
  },
};

const Navbar = ({
  classes, left, title, right,
}) => (
  <AppBar position="static">
    <Toolbar>
      <div className={classes.menuButton} id="navbar-left-side">
        {left}
      </div>
      <Typography variant="h6" color="inherit" noWrap>
        {title}
      </Typography>
      <div className={classes.grow} />
      <div className={classes.buttons}>
        {right}
      </div>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.shape().isRequired,
  left: PropTypes.node,
  title: PropTypes.node,
  right: PropTypes.node,
};

Navbar.defaultProps = {
  left: null,
  title: null,
  right: null,
};

export default withStyles(styles)(Navbar);
