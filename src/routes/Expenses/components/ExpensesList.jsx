import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import FilterSortSearchButtons from '../../../components/FilterSortSearchButtons';
import { withTranslation } from '../../../services/translation';

const ExpensesList = ({ t }) => (
  <>
    <Navbar
      left={<MenuButton />}
      title={t('Expenses')}
      right={(<FilterSortSearchButtons />)}
    />
    Expenses List
  </>
);

ExpensesList.propTypes = {
  t: PropTypes.func.isRequired,
};

ExpensesList.defaultProps = {};

export default withTranslation()(ExpensesList);
