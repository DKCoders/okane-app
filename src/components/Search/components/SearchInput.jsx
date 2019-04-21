/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingRight: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const SearchInput = ({
  onBlur, defaultValue, onChange,
}) => {
  const classes = useStyles();
  // States
  const [search, updateSearch] = useState('');
  // Handlers
  const onUpdateSearch = useCallback(({ target: { value } }) => {
    updateSearch(value);
    onChange(value);
  }, [onChange]);
  const clearSearch = useCallback(() => {
    updateSearch('');
    onChange('');
    onBlur({ target: { value: '' } });
  }, [onChange]);
  // didMount
  useEffect(() => {
    if (defaultValue) {
      updateSearch(defaultValue);
    }
  }, []);
  return (
    <>
      <div className={classes.grow} />
      <div className={classes.search}>
        <TextField
          color="inherit"
          autoFocus
          fullWidth
          margin="dense"
          value={search}
          onBlur={onBlur}
          onChange={onUpdateSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
              focused: classes.inputFocused,
            },
            endAdornment: (
              <InputAdornment position="end">
                <ClearIcon fontSize="small" onClick={clearSearch} />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
};
SearchInput.propTypes = {
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  defaultValue: null,
};

export default SearchInput;
