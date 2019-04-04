import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import months from './months';
import { withTranslation } from '../../services/translation';

const styles = {
  yearContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};

class MonthPickerDialog extends Component {
  constructor(props) {
    super(props);
    const { initialYear, initialMonth } = props;
    this.state = {
      selectedYear: initialYear || moment().year(),
      selectedMonth: initialMonth || moment().month(),
    };

    this.setInitialValues = this.setInitialValues.bind(this);
    this.modifyMonth = this.modifyMonth.bind(this);
    this.modifyYear = this.modifyYear.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (prevProps.open !== open) {
      this.setInitialValues();
    }
  }

  onClose(event) {
    const { onClose } = this.props;
    if (onClose) onClose(event);
  }

  onSave(event) {
    const { selectedMonth, selectedYear } = this.state;
    const { onSave } = this.props;
    if (onSave) onSave(selectedMonth, selectedYear, event);
  }

  setInitialValues() {
    const { initialYear, initialMonth } = this.props;
    this.setState({
      selectedYear: initialYear || moment().year(),
      selectedMonth: initialMonth || moment().month(),
    });
  }

  modifyMonth(value) {
    const { selectedMonth: old } = this.state;
    let selectedMonth = old + value;
    if (selectedMonth > months.length - 1) {
      selectedMonth = 0;
    } else if (selectedMonth < 0) {
      selectedMonth = months.length - 1;
    }
    this.setState({ selectedMonth });
  }

  modifyYear(value) {
    const { selectedYear: old } = this.state;
    const selectedYear = old + value;
    this.setState({ selectedYear });
  }

  render() {
    const { open, classes, t } = this.props;
    const { selectedYear, selectedMonth } = this.state;
    return (
      <Dialog open={open} maxWidth="md" fullWidth onClose={this.onClose}>
        <DialogContent>
          <Grid container justify="space-between">
            <Grid item wrap="nowrap">
              <IconButton onClick={() => this.modifyYear(-1)}>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item wrap="nowrap" className={classes.yearContainer}>
              <Typography variant="h5">{selectedYear}</Typography>
            </Grid>
            <Grid item wrap="nowrap">
              <IconButton onClick={() => this.modifyYear(1)}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item wrap="nowrap">
              <IconButton onClick={() => this.modifyMonth(-1)}>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item wrap="nowrap" className={classes.yearContainer}>
              <Typography variant="h4">{t(months[selectedMonth])}</Typography>
            </Grid>
            <Grid item wrap="nowrap">
              <IconButton onClick={() => this.modifyMonth(1)}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MonthPickerDialog.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  initialYear: PropTypes.number,
  initialMonth: PropTypes.number,
};

MonthPickerDialog.defaultProps = {
  open: false,
  initialYear: null,
  initialMonth: null,
  onClose: null,
  onSave: null,
};

export default withTranslation()(withStyles(styles)(MonthPickerDialog));
