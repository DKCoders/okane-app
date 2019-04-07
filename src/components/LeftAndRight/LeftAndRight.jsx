import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const LeftAndRight = ({ left, right, className }) => (
  <Grid container className={className} wrap="nowrap" justify="space-between">
    <Grid item>
      {left}
    </Grid>
    <Grid item>
      {right}
    </Grid>
  </Grid>
);

LeftAndRight.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
  className: PropTypes.string,
};

LeftAndRight.defaultProps = {
  left: null,
  right: null,
  className: '',
};

export default LeftAndRight;
