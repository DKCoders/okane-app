import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Currency = ({ value }) => (
  <Typography>{`$${value}`}</Typography>
);

Currency.propTypes = {
  value: PropTypes.number.isRequired,
};

Currency.defaultProps = {};

export default Currency;
