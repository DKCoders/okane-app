import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
}));

const AddFabButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Fab color="secondary" className={classes.fab} onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

AddFabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

AddFabButton.defaultProps = {};

export default AddFabButton;
