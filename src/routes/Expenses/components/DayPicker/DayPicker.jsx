import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import LeftRightButtons from '../../../../components/LeftRightButtons';
import DayButton from './components/DayButton';

const getButtons = (value, isSM = true) => (isSM ? [
  moment(value).subtract(1, 'day'),
  moment(value),
  moment(value).add(1, 'day'),
] : [
  moment(value).subtract(2, 'day'),
  moment(value).subtract(1, 'day'),
  moment(value),
  moment(value).add(1, 'day'),
  moment(value).add(2, 'day'),
]);

const getMiddle = (middle, setMiddle, operation = 'subtract') => {
  const newMiddle = moment(middle)[operation](1, 'days');
  setMiddle(newMiddle);
};

const DayPicker = ({ value, onChange }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  // States
  const [middle, setMiddle] = useState(value);
  const [buttons, setButtons] = useState(getButtons(middle, !matches));
  // Mobile breakpoints
  useEffect(() => {
    setButtons(getButtons(middle, !matches));
  }, [matches, middle]);
  // Handlers
  const { onLeft, onRight } = useMemo(() => {
    const subtract = () => getMiddle(middle, setMiddle, 'subtract');
    const add = () => getMiddle(middle, setMiddle, 'add');
    return { onLeft: subtract, onRight: add };
  }, [middle]);
  return (
    <LeftRightButtons
      onLeftClick={onLeft}
      onRightClick={onRight}
    >
      <Grid container spacing={8}>
        {buttons.map((button) => {
          const buttonDateString = button.format('YYYY-MM-DD');
          return (
            <Grid item key={buttonDateString}>
              <DayButton
                date={buttonDateString}
                active={value === buttonDateString}
                onClick={onChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </LeftRightButtons>
  );
};

DayPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DayPicker.defaultProps = {};

export default DayPicker;
