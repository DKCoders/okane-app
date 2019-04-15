import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

const generateRoutes = ({ list, view, form }) => {
  const GenerateRoutes = ({ match }) => (
    <Switch>
      <Route path={match.url} exact component={list} />
      {form && <Route path={`${match.url}/new`} component={form} />}
      {view && <Route path={`${match.url}/:id`} exact component={view} />}
      {form && <Route path={`${match.url}/:id/edit`} component={form} />}
    </Switch>
  );

  GenerateRoutes.propTypes = {
    match: PropTypes.shape().isRequired,
  };

  GenerateRoutes.defaultProps = {};

  return GenerateRoutes;
};


export default generateRoutes;
