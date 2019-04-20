import React, {
  useState, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpenseIcon from '@material-ui/icons/ShoppingCart';
import IncomeIcon from '@material-ui/icons/AttachMoney';
import Navbar from '../../../../components/Navbar';
import MenuButton from '../../../../components/MenuButton';
import AddFabButton from '../../../../components/AddFabButton';
import FilterSortSearchButtons from '../../../../components/FilterSortSearchButtons';
import { withTranslation } from '../../../../services/translation';
import MonthPicker from '../../../../components/MonthPicker';
import AppBar from '../../../../components/StyledAppBar';
import ListBlock from '../../../../components/ListBlock';
import SortDialog from '../../../../components/SortDialog';
import FilterDialog from '../../../../components/FilterDialog';
import useRenders, { avatarRenderCategoryColor } from './utils/useRenders';
import getGroupByFunc from './utils/getGroupByFunc';

const monthPickerProps = {
  size: 'large',
};

const isFiltersActive = filters => Object.values(filters).some((value) => {
  if (Array.isArray(value)) {
    return !!value.length;
  }
  return value !== null;
});

const sortOptions = [
  { text: 'Date' },
  { text: 'Category' },
];

const filterSections = [{
  property: 'categories',
  title: 'Categories',
  type: 'multi',
  // options: categories,
  options: [],
  valueProp: 'id',
  renderText: category => category.name,
  renderAvatar: avatarRenderCategoryColor,
}];

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
  // Sort state
  const [sortOpen, setSortOpen] = useState(false);
  const [{ sortIndex, sortDir }, setSort] = useState({ sortIndex: 0, sortDir: 'desc' });
  const onSortChange = ({ sortIndex: index, sortDir: dir }) => {
    setSort({ sortIndex: index, sortDir: dir });
  };
  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
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
  // Mapping expenses
  const grouped = getGroupByFunc(sortIndex)(expenses, categories, sortDir);
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
            sortActive={sortIndex !== null}
            filterActive={isFiltersActive(filters)}
            onSortClick={() => setSortOpen(true)}
            onFilterClick={() => setFilterOpen(true)}
          />
        )}
      />
      <SortDialog
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        options={sortOptions}
        translateText
        index={sortIndex}
        dir={sortDir}
        onSave={onSortChange}
      />
      <FilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sections={filterSections}
        onSave={setFilters}
        initialValue={filters}
      />
      <MonthPicker
        month={month}
        year={year}
        onChange={onMonthYearChange}
        buttonProps={monthPickerProps}
      />
      <AppBar position="static">
        <Tabs value={tab} onChange={(event, value) => setTab(value)} variant="fullWidth">
          <Tab icon={<ExpenseIcon />} label={t('Expenses')} />
          <Tab icon={<IncomeIcon />} label={t('Incomes')} />
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
