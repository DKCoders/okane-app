import React from 'react';
import TranslateService from './service';

const withTranslation = () => Component => props => (
  <Component t={TranslateService.t} {...props} />
);

export default withTranslation;
