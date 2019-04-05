import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import Search from '../Search';

const FilterSortSearchButtons = ({ onSortClick, onFilterClick }) => (
  <>
    <IconButton aria-haspopup="true" color="inherit" onClick={onFilterClick}>
      <FilterIcon />
    </IconButton>
    <IconButton aria-haspopup="true" color="inherit" onClick={onSortClick}>
      <SortIcon />
    </IconButton>
    <Search />
  </>
);

FilterSortSearchButtons.propTypes = {
  onSortClick: PropTypes.func,
  onFilterClick: PropTypes.func,
};

const dummyFunc = () => {};
FilterSortSearchButtons.defaultProps = {
  onSortClick: dummyFunc,
  onFilterClick: dummyFunc,
};

export default FilterSortSearchButtons;
