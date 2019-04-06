import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import Search from '../Search';

const FilterSortSearchButtons = ({
  onSortClick, onFilterClick, sortActive, filterActive,
}) => (
  <>
    <IconButton
      aria-haspopup="true"
      color={!filterActive ? 'inherit' : 'secondary'}
      onClick={onFilterClick}
    >
      <FilterIcon />
    </IconButton>
    <IconButton
      aria-haspopup="true"
      color={!sortActive ? 'inherit' : 'secondary'}
      onClick={onSortClick}
    >
      <SortIcon />
    </IconButton>
    <Search />
  </>
);

FilterSortSearchButtons.propTypes = {
  onSortClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  sortActive: PropTypes.bool,
  filterActive: PropTypes.bool,
};

const dummyFunc = () => {};
FilterSortSearchButtons.defaultProps = {
  onSortClick: dummyFunc,
  onFilterClick: dummyFunc,
  sortActive: false,
  filterActive: false,
};

export default FilterSortSearchButtons;
