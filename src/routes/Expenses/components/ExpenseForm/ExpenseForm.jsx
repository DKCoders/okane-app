import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExpenseInnerForm from './components/ExpenseInnerForm';
import Navbar from '../../../../components/Navbar';
import BackButton from '../../../../components/BackButton';
import api from '../../../../services/api/expense';
import { useTranslation } from '../../../../services/translation';

const ExpenseForm = ({ history, match: { params: { id } } }) => {
  const { t } = useTranslation();
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
  }, []);
  if (!id) {
    return (
      <ExpenseInnerForm history={history} id={id} />
    );
  }
  return !data ? (
    <Navbar
      left={<BackButton to={`/expenses/${id}`} />}
      title={t('Loading Expense')}
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
