import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EraseEditButtons = ({ onEraseClick, onEditClick }) => (
  <>
    <IconButton
      aria-haspopup="true"
      color="inherit"
      onClick={onEraseClick}
    >
      <DeleteIcon />
    </IconButton>
    <IconButton
      aria-haspopup="true"
      color="inherit"
      onClick={onEditClick}
    >
      <EditIcon />
    </IconButton>
  </>
);

EraseEditButtons.propTypes = {
  onEraseClick: PropTypes.func,
  onEditClick: PropTypes.func,
};

const dummyFunc = () => {};
EraseEditButtons.defaultProps = {
  onEraseClick: dummyFunc,
  onEditClick: dummyFunc,
};

export default EraseEditButtons;
