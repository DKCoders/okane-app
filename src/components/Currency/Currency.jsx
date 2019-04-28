import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Currency = ({ value, style, color }) => (
  <Typography style={style} color={color}>{`$${value}`}</Typography>
);

Currency.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.shape(),
  color: PropTypes.string,
};

Currency.defaultProps = {
  style: null,
  color: undefined,
};

export default Currency;
