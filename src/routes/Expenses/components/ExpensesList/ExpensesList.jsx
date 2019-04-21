import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import {
  toPairs, filter, any, includes,
} from 'ramda';
import moment from 'moment';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpenseIcon from '@material-ui/icons/ShoppingCart';
import IncomeIcon from '@material-ui/icons/AttachMoney';
import useDebounceState from '../../../../hooks/useDebounceState';
import { filterByKey } from '../../../../utils/helpers';
import Navbar from '../../../../components/Navbar';
import MenuButton from '../../../../components/MenuButton';
import AddFabButton from '../../../../components/AddFabButton';
import FilterSortSearchButtons from '../../../../components/FilterSortSearchButtons';
import { withTranslation } from '../../../../services/translation';
import MonthPicker from '../../../../components/MonthPicker';
import AppBar from '../../../../components/StyledAppBar';
import ListBlock from '../../../../components/ListBlock';
import useRenders from './hooks/useRenders';
import useSorters from './hooks/useSorters';
import useGroupBy from './hooks/useGroupBy';
import useFilters from './hooks/useFilters';

const monthPickerProps = {
  size: 'large',
};

const applyFilters = (expenses, filters) => {
  const filtersArray = toPairs(filters);
  if (!filtersArray.length) {
    return expenses;
  }
  const filterFunc = expense => any(
    ([key, filterValues]) => includes(expense[key])(filterValues),
  )(filtersArray);

  return filter(filterFunc)(expenses);
};

const ExpensesList = ({ t, match, history }) => {
  // MonthPicker state
  const [{ month, year }, setMonthYear] = useState({
    month: moment().month(), year: moment().year(),
  });
  const onMonthYearChange = useCallback(
    (newMonth, newYear) => setMonthYear({ month: newMonth, year: newYear }), [],
  );
  // Tab state
  const [tab, setTab] = useState(0);
  // Search state
  const [search, setSearch] = useDebounceState('', 300);
  // Redux state
  const mapState = useCallback(state => ({
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
    isExpensesFetched: state.expenses.fetched,
    isCategoriesFetched: state.categories.fetched,
  }), []);
  const {
    expenses, categories, isExpensesFetched, isCategoriesFetched,
  } = useMappedState(mapState);
  const dispatch = useDispatch();
  // Filter state
  const {
    filters, openFilters, isFilterActive, filterRender,
  } = useFilters(categories);
  // Sort and Filter Options
  const {
    sortIndex, sortDir, openSorters, sortRender,
  } = useSorters();
  // Handlers
  const onItemClick = useCallback((item) => {
    history.push(`${match.url}/${item.id}`);
  }, [match.url]);
  const onAddClick = useCallback(() => {
    history.push(`${match.url}/new`);
  }, [match.url]);
  // onMount
  useEffect(() => {
    if (!isCategoriesFetched) dispatch.categories.fetchCategories();
    if (!isExpensesFetched) dispatch.expenses.fetchExpenses();
  }, [isExpensesFetched, isCategoriesFetched]);
  // Converting to array
  const expensesArray = useMemo(() => Object.values(expenses), [expenses]);
  // Date Filter
  const dateFiltered = useMemo(() => filter((expense) => {
    const date = moment(expense.date);
    return date.month() === month && date.year() === year;
  })(expensesArray), [expensesArray, month, year]);
  // Filtering and Mapping expenses
  const filtered = useMemo(() => applyFilters(dateFiltered, filters), [dateFiltered, filters]);
  const textFiltered = useMemo(() => filtered.filter(filterByKey(search)), [filtered, search]);
  const grouped = useGroupBy(textFiltered, categories, sortIndex, sortDir);
  // Renders
  const {
    renderTitle, renderAvatar, renderText, renderAction,
  } = useRenders(sortIndex, categories);
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title={t('Expenses')}
        right={(
          <FilterSortSearchButtons
            sortActive={sortIndex !== 0 || sortDir === 'asc'}
            filterActive={isFilterActive}
            onSortClick={openSorters}
            onFilterClick={openFilters}
            onSearchChange={setSearch}
          />
        )}
      />
      {sortRender}
      {filterRender}
      <MonthPicker
        month={month}
        year={year}
        onChange={onMonthYearChange}
        buttonProps={monthPickerProps}
      />
      <AppBar position="static">
        <Tabs value={tab} onChange={(event, value) => setTab(value)} variant="fullWidth">
          <Tab icon={<ExpenseIcon />} label={t('Expenses')} />
          <Tab disabled icon={<IncomeIcon />} label={t('Incomes')} />
        </Tabs>
      </AppBar>
      {grouped.map(({ title, items, key }) => (
        <ListBlock
          key={key}
          title={renderTitle(title)}
          renderAvatar={renderAvatar}
          renderText={renderText}
          renderAction={renderAction}
          items={items}
          keyProp="id"
          onItemClick={onItemClick}
        />
      ))}
      <AddFabButton onClick={onAddClick} />
    </>
  );
};
ExpensesList.propTypes = {
  t: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

ExpensesList.defaultProps = {};

export default withTranslation()(ExpensesList);
