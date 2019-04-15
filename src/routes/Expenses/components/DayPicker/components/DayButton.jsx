import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    display: 'block',
  },
});

const DayButton = ({ date: _date, active, onClick }) => {
  const classes = useStyles();
  const date = moment(_date);
  return (
    <Button
      variant="contained"
      color={active ? 'secondary' : 'default'}
      className={classes.button}
      onClick={() => onClick(_date)}
      size="small"
    >
      <Typography variant="h6" color="inherit">{date.format('ddd')}</Typography>
      <Typography variant="h4" color="inherit">{date.format('DD')}</Typography>
    </Button>
  );
};

DayButton.propTypes = {
  date: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

const dummy = () => {};
DayButton.defaultProps = {
  active: false,
  onClick: dummy,
};

export default DayButton;
