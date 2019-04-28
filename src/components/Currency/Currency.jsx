import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Currency = ({ value, style }) => (
  <Typography style={style}>{`$${value}`}</Typography>
);

Currency.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.shape(),
};

Currency.defaultProps = {
  style: null,
};

export default Currency;
