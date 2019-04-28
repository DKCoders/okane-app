import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import EraseEditButtons from '../../../components/EraseEditButtons';
import InfoBox from '../../../components/InfoBox';
import CategoryTitle from '../../../components/CategoryTitle';
import Currency from '../../../components/Currency';
import LeftAndRight from '../../../components/LeftAndRight';
import { useTranslation } from '../../../services/translation';
import confirmDialog from '../../../services/confirmDialog';

const useStyles = makeStyles(theme => ({
  spacing: {
    paddingLeft: theme.custom.padding,
    paddingRight: theme.custom.padding,
    marginTop: '1em',
  },
}));

const ExpenseView = ({ history, match: { url, params: { id } } }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  // Redux State
  const mapState = useCallback(state => ({
    tab: state.app.expenseListTab,
    categories: state.categories.categories,
    categoriesFetched: state.categories.fetched,
    expense: state.app.expenseListTab === 0
      ? state.expenses.expenses && state.expenses.expenses[id]
      : state.incomes.incomes && state.incomes.incomes[id],
    expensesFetched: state.expenses.fetched,
    incomesFetched: state.incomes.fetched,
  }), [id]);
  const {
    categories, categoriesFetched, expense, expensesFetched, incomesFetched, tab,
  } = useMappedState(mapState);
  const dispatch = useDispatch();
  const title = tab === 0 ? 'Expense' : 'Income';
  const type = tab === 0 ? 'expenses' : 'incomes';
  // didMount
  useEffect(() => {
    if (!categoriesFetched) {
      dispatch.categories.fetch();
    }
    if (!expensesFetched) {
      dispatch.expenses.fetch();
    }
    if (!incomesFetched) {
      dispatch.incomes.fetch();
    }
  }, []);
  // Handlers
  const onRemoveSuccess = useCallback(() => {
    enqueueSnackbar(t('Erased'));
    history.replace('/expenses');
  }, []);
  const onFetchError = useCallback((e) => {
    enqueueSnackbar(t(e.message));
  }, []);
  const onEdit = useCallback(() => {
    history.push(`${url}/edit`);
  }, []);
  const onRemove = useCallback(async () => {
    const confirm = await confirmDialog.show({
      title: t('Confirmation'),
      content: `${t('Are you sure in deleting')} "${expense.description}"?`,
      confirmText: `${t('Delete it')}!`,
      cancelText: t('No'),
    });
    if (confirm) {
      dispatch[type].remove({
        id: expense.id,
        resolve: onRemoveSuccess,
        reject: onFetchError,
      });
    }
  }, [expense]);
  return !!expense && !!categories && (
    <>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t(title)}
        right={<EraseEditButtons onEditClick={onEdit} onEraseClick={onRemove} />}
      />
      <LeftAndRight
        className={classes.spacing}
        left={tab === 0 ? (
          <CategoryTitle category={categories[expense.categoryId]} justify="flex-start" />
        ) : (
          <CategoryTitle category={{ name: t('Income') }} justify="flex-start" />
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
