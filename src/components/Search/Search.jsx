import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => (
  <IconButton aria-haspopup="true" color="inherit">
    <SearchIcon />
  </IconButton>
);

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
