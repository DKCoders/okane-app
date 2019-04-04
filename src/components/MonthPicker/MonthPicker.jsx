import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MonthPickerDialog from './MonthPickerDialog';
import months from './months';
import { withTranslation } from '../../services/translation';

const MonthPicker = ({
  month, year, onChange, t,
}) => {
  const [open, setOpen] = useState(false);
  const onSave = useCallback((...params) => {
    if (onChange) onChange(...params);
    setOpen(false);
  }, [onChange]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{`${t(months[month])} ${year}`}</Button>
      <MonthPickerDialog
        open={open}
        initialMonth={month}
        initialYear={year}
        onClose={() => setOpen(false)}
        onSave={onSave}
      />
    </>
  );
};

MonthPicker.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

MonthPicker.defaultProps = {
  onChange: null,
};

export default withTranslation()(MonthPicker);
