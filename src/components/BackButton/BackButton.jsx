import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router-dom';

const BackButton = ({ history, to }) => (
  <IconButton
    color="inherit"
    aria-label="Go back"
    onClick={() => (to ? history.replace(to) : history.goBack())}
  >
    <ArrowBackIcon />
  </IconButton>
);

BackButton.propTypes = {
  history: PropTypes.shape().isRequired,
  to: PropTypes.string,
};

BackButton.defaultProps = {
  to: null,
};

export default withRouter(BackButton);
