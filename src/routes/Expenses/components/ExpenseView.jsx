import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import EraseEditButtons from '../../../components/EraseEditButtons';
import InfoBox from '../../../components/InfoBox';
import CategoryTitle from '../../../components/CategoryTitle';
import Currency from '../../../components/Currency';
import LeftAndRight from '../../../components/LeftAndRight';
import { useTranslation } from '../../../services/translation';

const useStyles = makeStyles(theme => ({
  spacing: {
    paddingLeft: theme.custom.padding,
    paddingRight: theme.custom.padding,
    marginTop: '1em',
  },
}));

const ExpenseView = ({ history, match: { url, params: { id } } }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // Redux State
  const mapState = useCallback(state => ({
    categories: state.categories.categories,
    categoriesFetched: state.categories.fetched,
    expense: state.expenses.expenses && state.expenses.expenses[id],
    expensesFetched: state.expenses.fetched,
  }), [id]);
  const {
    categories, categoriesFetched, expense, expensesFetched,
  } = useMappedState(mapState);
  const dispatch = useDispatch();
  // didMount
  useEffect(() => {
    if (!categoriesFetched) {
      dispatch.categories.fetch();
    }
    if (!expensesFetched) {
      dispatch.expenses.fetch();
    }
  }, []);
  // Handlers
  const onEdit = useCallback(() => {
    history.push(`${url}/edit`);
  }, []);
  return !!expense && !!categories && (
    <>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t('Expense')}
        right={<EraseEditButtons onEditClick={onEdit} />}
      />
      <LeftAndRight
        className={classes.spacing}
        left={(
          <CategoryTitle category={categories[expense.categoryId]} justify="flex-start" />
        )}
        right={moment(expense.date).format('ddd DD/MM/YYYY')}
      />
      <InfoBox title={t('Description')} content={expense.description} />
      <LeftAndRight
        className={classes.spacing}
        left={t('Amount')}
        right={(<Currency value={expense.amount} />)}
      />
    </>
  );
};

ExpenseView.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

ExpenseView.defaultProps = {};

export default ExpenseView;
