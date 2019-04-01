import React from 'react';
// import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import FilterSortSearchButtons from '../../../components/FilterSortSearchButtons';

const ExpensesList = () => (
  <>
    <Navbar
      left={<MenuButton />}
      title="Expenses"
      right={(<FilterSortSearchButtons />)}
    />
    Expenses List
  </>
);

ExpensesList.propTypes = {};

ExpensesList.defaultProps = {};

export default ExpensesList;
