import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Expenses from './Expenses';
import Budgets from './Budgets';
import Categories from './Categories';
import Debts from './Debts';

const Routes = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/expenses" />} />
    <Route path="/expenses" component={Expenses} />
    <Route path="/budgets" component={Budgets} />
    <Route path="/categories" component={Categories} />
    <Route path="/debts" component={Debts} />
  </Switch>
);

export default Routes;
