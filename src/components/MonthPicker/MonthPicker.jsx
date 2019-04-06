import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MonthPickerDialog from './components/MonthPickerDialog';
import LeftRightButtons from './components/LeftRightButtons';
import months from './months';
import { useTranslation } from '../../services/translation';

const modifyDate = (oldMont, oldYear, value) => {
  let month = oldMont + value;
  let year = oldYear;
  if (month > months.length - 1) {
    month = 0;
    year += 1;
  } else if (month < 0) {
    month = months.length - 1;
    year -= 1;
  }
  return [month, year];
};

const MonthPicker = ({
  month, year, onChange, buttonProps,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onSave = useCallback((...params) => {
    if (onChange) onChange(...params);
    setOpen(false);
  }, [onChange]);
  const onLeftClick = useCallback((event) => {
    if (onChange) onChange(...modifyDate(month, year, -1), event);
  }, [onChange]);
  const onRightClick = useCallback((event) => {
    if (onChange) onChange(...modifyDate(month, year, 1), event);
  }, [onChange]);
  return (
    <>
      <LeftRightButtons
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      >
        <Button {...buttonProps} onClick={() => setOpen(true)}>{`${t(months[month])} ${year}`}</Button>
      </LeftRightButtons>
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
  onChange: PropTypes.func,
  buttonProps: PropTypes.shape(),
};

const dummyShape = {};
MonthPicker.defaultProps = {
  onChange: null,
  buttonProps: dummyShape,
};

export default MonthPicker;
