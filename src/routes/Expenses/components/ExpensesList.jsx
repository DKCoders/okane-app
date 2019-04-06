import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
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

const monthPickerProps = {
  size: 'large',
};

const avatarRenderCategoryColor = category => <Avatar style={{ backgroundColor: category ? category.color : 'lightgray' }} />;
const avatarRenderColor = item => avatarRenderCategoryColor(item.category);
const avatarRenderText = item => <Avatar>{moment(item.date).format('DD')}</Avatar>;

const dayTitle = date => (
  <Typography variant="h6" align="center">{moment(date).format('ddd DD')}</Typography>
);

const categoryTitle = category => (
  <Grid container wrap="nowrap" alignItems="center" justify="center" spacing={16}>
    <Grid item>
      {avatarRenderColor({ category })}
    </Grid>
    <Grid item>
      <Typography variant="h6" inline>{category.name}</Typography>
    </Grid>
  </Grid>
);


const sortOptions = [
  { text: 'Category' },
  { text: 'Date' },
];

const filterSections = [{
  property: 'categories',
  title: 'Categories',
  type: 'multi',
  options: [
    { id: 'cat1', name: 'categoria 1', color: 'red' },
    { id: 'cat2', name: 'categoria 2', color: 'blue' },
  ],
  keyProp: 'id',
  renderText: category => category.name,
  renderAvatar: avatarRenderCategoryColor,
}, {
  property: 'category',
  title: 'Categories Single',
  type: 'single',
  options: [
    { id: 'cat1', name: 'categoria 1', color: 'red' },
    { id: 'cat2', name: 'categoria 2', color: 'blue' },
  ],
  keyProp: 'id',
  renderText: category => category.name,
  renderAvatar: avatarRenderCategoryColor,
}];

// TODO: remove Mocked data
const expenses = [{
  id: 1, category: { name: 'categoria', color: 'red' }, date: moment(), description: 'description', value: 10000,
}, {
  id: 2, category: { name: 'categoria', color: 'red' }, date: moment().subtract(1, 'day'), description: 'description', value: 10000,
}];

const ExpensesList = ({ t }) => {
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
    setSortOpen(false);
  };
  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title={t('Expenses')}
        right={(
          <FilterSortSearchButtons
            sortActive={sortIndex !== null}
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
        renderAction={item => item.value}
        items={expenses}
        keyProp="id"
      />
      <ListBlock
        title={categoryTitle({ name: 'category', color: 'red' })}
        renderAvatar={avatarRenderText}
        renderText={item => item.description}
        renderAction={item => item.value}
        items={expenses}
        keyProp="id"
      />
    </>
  );
};
ExpensesList.propTypes = {
  t: PropTypes.func.isRequired,
};

ExpensesList.defaultProps = {};

export default withTranslation()(ExpensesList);
