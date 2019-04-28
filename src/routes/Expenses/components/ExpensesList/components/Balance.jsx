import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import AddFabButton from '../../../../../components/AddFabButton';


const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Balance = ({ onAddClick }) => {
  const classes = useStyles();
  return (
    <>
      <div style={{ height: 60 }} />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography>Ingresos</Typography>
          </div>
          <AddFabButton absolute onClick={onAddClick} />
          <div>
            <Typography>Egresos</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

Balance.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

Balance.defaultProps = {};

export default Balance;
