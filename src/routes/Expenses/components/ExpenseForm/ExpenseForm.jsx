import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useMappedState } from 'redux-react-hook';
import ExpenseInnerForm from './components/ExpenseInnerForm';
import Navbar from '../../../../components/Navbar';
import BackButton from '../../../../components/BackButton';
import apiExpense from '../../../../services/api/expense';
import apiIncome from '../../../../services/api/income';
import { useTranslation } from '../../../../services/translation';
import { capitalizeString } from '../../../../utils/helpers';

const ExpenseForm = ({ history, match: { params: { id } } }) => {
  const { t } = useTranslation();
  // Getting tab
  // Redux state
  const mapState = useCallback(state => ({
    tab: state.app.expenseListTab,
  }), []);
  const {
    tab,
  } = useMappedState(mapState);
  // Setting api
  const api = useMemo(() => {
    if (tab === 0) {
      return apiExpense;
    }
    return apiIncome;
  }, [tab]);
  // Fetching
  const [data, setData] = useState(null);
  // didMount
  useEffect(() => {
    (async () => {
      if (id) {
        const item = await api.getById(id);
        setData(item);
      }
    })();
  }, [api]);
  const type = tab === 0 ? 'expense' : 'income';
  if (!id) {
    return (
      <ExpenseInnerForm history={history} id={id} />
    );
  }
  return !data ? (
    <Navbar
      left={<BackButton to={`/expenses/${id}`} />}
      title={t(`Loading ${capitalizeString(type)}`)}
    />
  ) : (
    <ExpenseInnerForm history={history} id={id} data={data} />
  );
};

ExpenseForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

ExpenseForm.defaultProps = {};

export default ExpenseForm;
