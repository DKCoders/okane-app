import React from 'react';
// import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import FilterSortSearchButtons from '../../../components/FilterSortSearchButtons';

const BudgetsList = () => (
  <>
    <Navbar
      left={<MenuButton />}
      title="Budgets"
      right={(<FilterSortSearchButtons />)}
    />
    BudgetsList
  </>
);

BudgetsList.propTypes = {};

BudgetsList.defaultProps = {};

export default BudgetsList;
