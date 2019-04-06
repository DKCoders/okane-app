import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Check';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextRotationDownIcon from '@material-ui/icons/TextRotationDown';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';
import AppBar from '../StyledAppBar';
import Toolbar from '../Toolbar';
import { withTranslation } from '../../services/translation';

const Transition = props => <Slide direction="up" {...props} />;

const getSortIcon = dir => (dir === 'asc' ? (
  <TextRotateUpIcon />
) : (
  <TextRotationDownIcon />
));

class SortDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: null,
      sortIndex: null,
      sortDir: null,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      open, index, dir, options,
    } = this.props;
    if (prevProps.open !== open && index !== null && options[index]) {
      this.setInitialValues(options[index], index, dir || 'asc');
    }
  }

  onButtonClick(option, index) {
    const { sortOption, sortIndex, sortDir } = this.state;
    if (sortOption === null || sortIndex !== index) {
      this.setState({
        sortOption: option,
        sortIndex: index,
        sortDir: 'asc',
      });
    } else if (sortDir === 'asc') {
      this.setState({
        sortDir: 'desc',
      });
    } else {
      this.setState({
        sortOption: null,
        sortIndex: null,
        sortDir: null,
      });
    }
  }

  onClose(event) {
    const { onClose } = this.props;
    if (onClose) {
      onClose(event);
      this.setInitialValues(null, null, null);
    }
  }

  onClear() {
    this.setInitialValues(null, null, null);
  }

  onSave(event) {
    const { onSave } = this.props;
    const { sortOption, sortIndex, sortDir } = this.state;
    if (onSave) {
      onSave({
        sortIndex, sortDir, sortOption, event,
      });
      this.onClose(event);
      this.setInitialValues(null, null, null);
    }
  }

  setInitialValues(sortOption, sortIndex, sortDir) {
    this.setState({
      sortOption,
      sortIndex,
      sortDir,
    });
  }

  render() {
    const {
      open, t, options, translateText,
    } = this.props;
    const { sortIndex, sortDir } = this.state;
    return (
      <Dialog fullScreen open={open} onClose={this.onClose} TransitionComponent={Transition}>
        <AppBar position="relative">
          <Toolbar
            left={(
              <IconButton color="inherit" onClick={this.onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            )}
            title={t('Sort')}
            right={(
              <>
                <IconButton color="inherit" onClick={this.onClear}>
                  <ClearAllIcon />
                </IconButton>
                <IconButton color="inherit" onClick={this.onSave}>
                  <SaveIcon />
                </IconButton>
              </>
            )}
          />
        </AppBar>
        <List>
          {options.map((option, index) => (
            <ListItem key={option.text} button onClick={() => this.onButtonClick(option, index)}>
              <ListItemText primary={!translateText ? option.text : t(option.text)} />
              {index === sortIndex && (
                <ListItemSecondaryAction>
                  <Icon>
                    {getSortIcon(sortDir)}
                  </Icon>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
}

SortDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  t: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  translateText: PropTypes.bool,
  index: PropTypes.number,
  dir: PropTypes.string,
};

SortDialog.defaultProps = {
  open: false,
  onClose: null,
  onSave: null,
  options: [],
  translateText: false,
  index: null,
  dir: 'asc',
};

export default withTranslation()(SortDialog);
