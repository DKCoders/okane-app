import React from 'react';
// import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import Search from '../Search';

const FilterSortSearchButtons = () => (
  <>
    <IconButton aria-haspopup="true" color="inherit">
      <FilterIcon />
    </IconButton>
    <IconButton aria-haspopup="true" color="inherit">
      <SortIcon />
    </IconButton>
    <Search />
  </>
);

FilterSortSearchButtons.propTypes = {};

FilterSortSearchButtons.defaultProps = {};

export default FilterSortSearchButtons;
