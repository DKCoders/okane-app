import React from 'react';
import PropTypes from 'prop-types';
import DataManagement from './components/DataManagement';

const SettingView = ({ match: { params: { id } } }) => (
  <>
    {id === 'data-management' && <DataManagement />}
  </>
);

SettingView.propTypes = {
  match: PropTypes.shape().isRequired,
};

SettingView.defaultProps = {};

export default SettingView;
