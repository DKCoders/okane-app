import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpenseIcon from '@material-ui/icons/ShoppingCart';
import IncomeIcon from '@material-ui/icons/AttachMoney';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import FilterSortSearchButtons from '../../../components/FilterSortSearchButtons';
import { withTranslation } from '../../../services/translation';
import MonthPicker from '../../../components/MonthPicker';
import AppBar from '../../../components/StyledAppBar';
import ListBlock from '../../../components/ListBlock';
import SortDialog from '../../../components/SortDialog';
import FilterDialog from '../../../components/FilterDialog';
import CategoryTitle from '../../../components/CategoryTitle';
import Currency from '../../../components/Currency';
import { categories, expenses } from '../../../mock';

const monthPickerProps = {
  size: 'large',
};

const isFiltersActive = filters => Object.values(filters).some((value) => {
  if (Array.isArray(value)) {
    return !!value.length;
  }
  return value !== null;
});

const avatarRenderCategoryColor = category => <Avatar style={{ backgroundColor: category ? category.color : 'lightgray' }} />;
const avatarRenderColor = item => avatarRenderCategoryColor(
  categories.find(category => category.id === item.categoryId),
);
const avatarRenderText = item => <Avatar>{moment(item.date).format('DD')}</Avatar>;

const dayTitle = date => (
  <Typography variant="h6" align="center">{moment(date).format('ddd DD')}</Typography>
);

const sortOptions = [
  { text: 'Category' },
  { text: 'Date' },
];

const filterSections = [{
  property: 'categories',
  title: 'Categories',
  type: 'multi',
  options: categories,
  valueProp: 'id',
  renderText: category => category.name,
  renderAvatar: avatarRenderCategoryColor,
}];

const ExpensesList = ({ t, match, history }) => {
  // MonthPicker state
  const [{ month, year }, setMonthYear] = useState({
    month: moment().month(), year: moment().year(),
  });
  const onMonthYearChange = (newMonth, newYear) => setMonthYear({ month: newMonth, year: newYear });
  // Tab state
  const [tab, setTab] = useState(0);
  // Sort state
  const [sortOpen, setSortOpen] = useState(false);
  const [{ sortIndex, sortDir }, setSort] = useState({ sortIndex: null, sortDir: null });
  const onSortChange = ({ sortIndex: index, sortDir: dir }) => {
    setSort({ sortIndex: index, sortDir: dir });
  };
  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  // Handlers
  const onItemClick = (item) => {
    history.push(`${match.url}/${item.id}`);
  };
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
      <ListBlock
        title={dayTitle(moment())}
        renderAvatar={avatarRenderColor}
        renderText={item => item.description}
        renderAction={item => <Currency value={item.value} />}
        items={expenses}
        keyProp="id"
        onItemClick={onItemClick}
      />
      <ListBlock
        title={<CategoryTitle category={{ name: 'category', color: 'red' }} />}
        renderAvatar={avatarRenderText}
        renderText={item => item.description}
        renderAction={item => <Currency value={item.value} />}
        items={expenses}
        keyProp="id"
        onItemClick={onItemClick}
      />
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
