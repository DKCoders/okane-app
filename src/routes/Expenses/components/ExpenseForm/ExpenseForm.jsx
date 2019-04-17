import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExpenseInnerForm from './components/ExpenseInnerForm';
import api from '../../../../services/api/expense';

const ExpenseForm = ({ history, match: { params: { id } } }) => {
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
      <>
        <ExpenseInnerForm history={history} id={id} />
      </>
    );
  }

  return !data ? (
    <>
      Loading...
    </>
  ) : (
    <>
      <ExpenseInnerForm history={history} id={id} data={data} />
    </>
  );
};

ExpenseForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

ExpenseForm.defaultProps = {};

export default ExpenseForm;
