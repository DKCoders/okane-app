import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const CategoryTitle = ({ category, justify = 'center' }) => (
  <Grid container wrap="nowrap" alignItems="center" justify={justify} spacing={16}>
    <Grid item>
      <Avatar style={{ backgroundColor: category ? category.color : 'lightgray' }} />
    </Grid>
    <Grid item>
      <Typography variant="h6" inline>{category.name}</Typography>
    </Grid>
  </Grid>
);

CategoryTitle.propTypes = {
  category: PropTypes.shape().isRequired,
  justify: PropTypes.string,
};

CategoryTitle.defaultProps = {
  justify: 'center',
};

export default CategoryTitle;
