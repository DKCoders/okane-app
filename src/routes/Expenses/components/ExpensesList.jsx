import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import FilterSortSearchButtons from '../../../components/FilterSortSearchButtons';
import { withTranslation } from '../../../services/translation';
import MonthPicker from '../../../components/MonthPicker';

const ExpensesList = ({ t }) => {
  const [{ month, year }, setMonthYear] = useState({
    month: moment().month(), year: moment().year(),
  });
  const onMonthYearChange = (newMonth, newYear) => setMonthYear({ month: newMonth, year: newYear });
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title={t('Expenses')}
        right={(<FilterSortSearchButtons />)}
      />
      <MonthPicker open month={month} year={year} onChange={onMonthYearChange} />
    Expenses List
    </>
  );
};
ExpensesList.propTypes = {
  t: PropTypes.func.isRequired,
};

ExpensesList.defaultProps = {};

export default withTranslation()(ExpensesList);
