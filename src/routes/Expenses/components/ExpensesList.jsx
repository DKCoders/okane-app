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

const monthPickerProps = {
  size: 'large',
};

const avatarRenderColor = item => <Avatar style={{ backgroundColor: item.category ? item.category.color : 'lightgray' }} />;
const avatarRenderText = item => <Avatar>{moment(item.date).format('DD')}</Avatar>;

const dayTitle = date => (
  <Typography variant="h6" align="center">{moment(date).format('ddd DD')}</Typography>
);

const categoryTitle = category => (
  <Grid container wrap="nowrap" alignItems="center" justify="center" spacing="16">
    <Grid item>
      {avatarRenderColor({ category })}
    </Grid>
    <Grid item>
      <Typography variant="h6" inline>{category.name}</Typography>
    </Grid>
  </Grid>
);

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
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title={t('Expenses')}
        right={(
          <FilterSortSearchButtons
            onSortClick={() => setSortOpen(true)}
          />
        )}
      />
      <SortDialog open={sortOpen} onClose={() => setSortOpen(false)} />
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
