import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import AddFabButton from '../../../../../components/AddFabButton';
import Currency from '../../../../../components/Currency';
import { useTranslation } from '../../../../../services/translation';

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

const Balance = ({ onAddClick, expenses, incomes }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <div style={{ height: 60 }} />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography color="inherit">
              {t('Expenses')}
            </Typography>
            <Currency color="inherit" value={expenses} />
          </div>
          <AddFabButton absolute onClick={onAddClick} />
          <div>
            <Typography color="inherit">
              {t('Incomes')}
            </Typography>
            <Currency color="inherit" value={incomes} />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

Balance.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  expenses: PropTypes.number.isRequired,
  incomes: PropTypes.number.isRequired,
};

Balance.defaultProps = {};

export default Balance;
