import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { useBoolean } from 'react-hanger';
import Search from '../Search';

const FilterSortSearchButtons = ({
  onSortClick, onFilterClick, sortActive, filterActive, onSearchChange,
}) => {
  const openBox = useBoolean(false);
  return (
    <>
      {!openBox.value && (
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
        </>
      )}
      {!!onSearchChange && (
        <Search
          isOpen={openBox.value}
          onOpen={openBox.toggle}
          onClose={openBox.toggle}
          onChange={onSearchChange}
        />
      )}
    </>
  );
};

FilterSortSearchButtons.propTypes = {
  onSortClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  sortActive: PropTypes.bool,
  filterActive: PropTypes.bool,
};

const dummyFunc = () => {};
FilterSortSearchButtons.defaultProps = {
  onSortClick: dummyFunc,
  onFilterClick: dummyFunc,
  onSearchChange: null,
  sortActive: false,
  filterActive: false,
};

export default FilterSortSearchButtons;
