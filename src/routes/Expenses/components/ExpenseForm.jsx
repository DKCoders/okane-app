import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import DayPicker from './DayPicker';
import { useTranslation } from '../../../services/translation';

const ExpenseForm = ({ match: { params: { id } } }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  return (
    <>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t(!id ? 'New Expense' : 'Edit Expense')}
        right={(
          <IconButton color="inherit">
            <DoneIcon />
          </IconButton>
        )}
      />
      <DayPicker value={date} onChange={setDate} />
    </>
  );
};

ExpenseForm.propTypes = {
  match: PropTypes.shape().isRequired,
};

ExpenseForm.defaultProps = {};

export default ExpenseForm;
