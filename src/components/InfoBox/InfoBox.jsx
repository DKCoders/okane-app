import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: theme.custom.padding,
    paddingRight: theme.custom.padding,
    marginTop: '1em',
  },
}));

const InfoBox = ({
  title,
  content,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {title && (<Typography variant="h6">{title}</Typography>)}
      {content && (<Typography>{content}</Typography>)}
    </div>
  );
};

InfoBox.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
};

InfoBox.defaultProps = {
  title: null,
  content: null,
};

export default InfoBox;
