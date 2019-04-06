import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
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
      color="inherit"
      onClick={onFilterClick}
    >
      <Badge variant="dot" color="secondary" invisible={!filterActive}>
        <FilterIcon />
      </Badge>
    </IconButton>
    <IconButton
      aria-haspopup="true"
      color="inherit"
      onClick={onSortClick}
    >
      <Badge variant="dot" color="secondary" invisible={!sortActive}>
        <SortIcon />
      </Badge>
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
