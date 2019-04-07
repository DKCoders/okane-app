import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import EraseEditButtons from '../../../components/EraseEditButtons';
import InfoBox from '../../../components/InfoBox';
import CategoryTitle from '../../../components/CategoryTitle';
import Currency from '../../../components/Currency';
import { useTranslation } from '../../../services/translation';
import { normalizedExpenses, normalizedCategories } from '../../../mock';

const useStyles = makeStyles(theme => ({
  spacing: {
    paddingLeft: theme.custom.padding,
    paddingRight: theme.custom.padding,
    marginTop: '1em',
  },
}));

const ExpenseView = ({ match: { params: { id } } }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const expense = normalizedExpenses[id];
  return !!expense && (
    <>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t('Expense')}
        right={<EraseEditButtons />}
      />
      <Grid container className={classes.spacing} wrap="nowrap" justify="space-between">
        <Grid item>
          <CategoryTitle category={normalizedCategories[expense.categoryId]} justify="flex-start" />
        </Grid>
        <Grid item>
          <Currency value={expense.value} />
        </Grid>
      </Grid>
      <InfoBox title={t('Description')} content={expense.description} />
    </>
  );
};

ExpenseView.propTypes = {
  match: PropTypes.shape().isRequired,
};

ExpenseView.defaultProps = {};

export default ExpenseView;
