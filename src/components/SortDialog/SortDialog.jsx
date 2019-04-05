import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Check';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AppBar from '../StyledAppBar';
import { withTranslation } from '../../services/translation';

const Transition = props => <Slide direction="up" {...props} />;

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

const SortDialog = ({ open, onClose, t }) => {
  const classes = useStyles();
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar position="relative">
        <Toolbar>
          <div className={classes.leftButtons}>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h6" color="inherit">
            {t('Sort')}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.buttons}>
            <IconButton color="inherit" onClick={onClose}>
              <ClearAllIcon />
            </IconButton>
            <IconButton color="inherit" onClick={onClose}>
              <SaveIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    </Dialog>
  );
};

SortDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  t: PropTypes.func.isRequired,
};

const dummyFunc = () => {};
SortDialog.defaultProps = {
  open: false,
  onClose: dummyFunc,
};

export default withTranslation()(SortDialog);
