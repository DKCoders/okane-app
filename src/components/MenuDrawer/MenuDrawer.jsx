import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpensesIcon from '@material-ui/icons/List';
import BudgetsIcon from '@material-ui/icons/BubbleChart';
import DebtsIcon from '@material-ui/icons/Dehaze';
import CategoriesIcon from '@material-ui/icons/Category';
import MenuDrawerItem from './components/MenuDrawerItem';

const styles = theme => ({
  list: {
    width: 250,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
});

const MenuDrawer = ({ classes }) => (
  <Drawer open onClose={() => {}}>
    <div
      tabIndex={0}
      role="button"
      onClick={() => {}}
      onKeyDown={() => {}}
    >
      <div className={classes.list}>
        <div className={classes.toolbar}>
          <Typography variant="h6">Menu</Typography>
        </div>
        <Divider />
        <List>
          <MenuDrawerItem
            label="Expenses"
            icon={<ExpensesIcon />}
            path="/expenses"
          />
          <MenuDrawerItem
            label="Budgets"
            icon={<BudgetsIcon />}
            path="/budgets"
          />
          <MenuDrawerItem
            label="Debts"
            icon={<DebtsIcon />}
            path="/debts"
          />
          <MenuDrawerItem
            label="Categories"
            icon={<CategoriesIcon />}
            path="/categories"
          />
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    </div>
  </Drawer>
);

MenuDrawer.propTypes = {
  classes: PropTypes.shape().isRequired,
};

MenuDrawer.defaultProps = {};

export default withStyles(styles)(MenuDrawer);
