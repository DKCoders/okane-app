import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
};

const LeftRightButtons = ({
  onLeftClick, onRightClick, children, classes,
}) => (
  <Grid container justify="space-between" wrap="nowrap">
    <Grid item>
      <IconButton onClick={onLeftClick}>
        <ChevronLeftIcon />
      </IconButton>
    </Grid>
    <Grid item className={classes.wrapper}>
      {children}
    </Grid>
    <Grid item>
      <IconButton onClick={onRightClick}>
        <ChevronRightIcon />
      </IconButton>
    </Grid>
  </Grid>
);

LeftRightButtons.propTypes = {
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
};

const dummyFunc = () => {};
LeftRightButtons.defaultProps = {
  onLeftClick: dummyFunc,
  onRightClick: dummyFunc,
};

export default withStyles(styles)(LeftRightButtons);
