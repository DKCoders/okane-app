import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ToolbarMat from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  leftButtons: {
    marginLeft: -12,
    marginRight: 20,
  },
  buttons: {
    display: 'flex',
  },
});

const Toolbar = ({ left, title, right }) => {
  const classes = useStyles();
  return (
    <ToolbarMat>
      <div className={classes.leftButtons}>
        {left}
      </div>
      <Typography variant="h6" color="inherit">
        {title}
      </Typography>
      <div className={classes.grow} />
      <div className={classes.buttons}>
        {right}
      </div>
    </ToolbarMat>
  );
};

Toolbar.propTypes = {
  left: PropTypes.node,
  title: PropTypes.node,
  right: PropTypes.node,
};

Toolbar.defaultProps = {
  left: null,
  title: null,
  right: null,
};

export default Toolbar;
