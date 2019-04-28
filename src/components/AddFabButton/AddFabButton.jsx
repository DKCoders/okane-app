import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  fabFixed: {
    position: 'fixed',
    bottom: 10,
  },
  fabAbsolute: {
    position: 'absolute',
    top: -30,
  },
  fabButton: {
    zIndex: 1,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

const AddFabButton = ({ onClick, absolute }) => {
  const classes = useStyles();
  const fabClasses = [classes.fabButton];
  if (absolute) fabClasses.push(classes.fabAbsolute);
  else fabClasses.push(classes.fabFixed);
  return (
    <>
      <div style={{ height: 60 }} />
      <Fab color="secondary" className={fabClasses.join(' ')} onClick={onClick}>
        <AddIcon />
      </Fab>
    </>
  );
};

AddFabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  absolute: PropTypes.bool,
};

AddFabButton.defaultProps = {
  absolute: false,
};

export default AddFabButton;
