import React from 'react';
import PropTypes from 'prop-types';
import DataManagement from './components/DataManagement';
import Language from './components/Language';

const SettingView = ({ match: { params: { id } } }) => (
  <>
    {id === 'data-management' && <DataManagement />}
    {id === 'languages' && <Language />}
  </>
);

SettingView.propTypes = {
  match: PropTypes.shape().isRequired,
};

SettingView.defaultProps = {};

export default SettingView;
