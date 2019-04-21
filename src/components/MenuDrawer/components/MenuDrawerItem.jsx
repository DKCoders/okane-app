/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { withRouter } from 'react-router-dom';

const P = withHandlers({
  onClick: ({ path, history }) => () => {
    history.push(path);
  },
});

const MenuDrawerItem = ({
  label, icon, onClick, disabled,
}) => (
  <ListItem disabled={disabled} button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
);

MenuDrawerItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  icon: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

MenuDrawerItem.defaultProps = {
  disabled: false,
};

export default withRouter(attach(P)(MenuDrawerItem));
