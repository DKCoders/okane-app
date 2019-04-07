import React from 'react';
// import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import EraseEditButtons from '../../../components/EraseEditButtons';
import { useTranslation } from '../../../services/translation';

const ExpenseView = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t('Expense')}
        right={<EraseEditButtons />}
      />
      ExpenseView
    </>
  );
};

ExpenseView.propTypes = {};

ExpenseView.defaultProps = {};

export default ExpenseView;
