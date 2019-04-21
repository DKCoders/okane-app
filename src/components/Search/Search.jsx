import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchInput from './components/SearchInput';

const Search = ({
  onChange, onClose, onOpen, isOpen,
}) => {
  const onBlurEvent = useCallback(({ target: { value } }) => {
    if (!value || !value.length) {
      onClose();
    }
  }, []);
  return isOpen ? (
    <SearchInput
      onBlur={onBlurEvent}
      onChange={onChange}
    />
  ) : (
    <IconButton aria-haspopup="true" color="inherit" onClick={onOpen}>
      <SearchIcon />
    </IconButton>
  );
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

Search.defaultProps = {};

export default Search;
