import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LeftRightButtons from './LeftRightButtons';
import months from '../months';
import { withTranslation } from '../../../services/translation';

class MonthPickerDialog extends Component {
  constructor(props) {
    super(props);
    const { initialYear, initialMonth } = props;
    this.state = {
      selectedYear: initialYear !== null ? initialYear : moment().year(),
      selectedMonth: initialMonth !== null ? initialMonth : moment().month(),
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
      selectedYear: initialYear !== null ? initialYear : moment().year(),
      selectedMonth: initialMonth !== null ? initialMonth : moment().month(),
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
    const { open, t } = this.props;
    const { selectedYear, selectedMonth } = this.state;
    return (
      <Dialog open={open} maxWidth="md" fullWidth onClose={this.onClose}>
        <DialogContent>
          <LeftRightButtons
            onLeftClick={() => this.modifyYear(-1)}
            onRightClick={() => this.modifyYear(1)}
          >
            <Typography variant="h5">{selectedYear}</Typography>
          </LeftRightButtons>
          <LeftRightButtons
            onLeftClick={() => this.modifyMonth(-1)}
            onRightClick={() => this.modifyMonth(1)}
          >
            <Typography variant="h4">{t(months[selectedMonth])}</Typography>
          </LeftRightButtons>
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

export default withTranslation()(MonthPickerDialog);
