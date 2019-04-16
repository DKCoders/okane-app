import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useFormState } from 'react-use-form-state';
import { useMappedState, useDispatch } from 'redux-react-hook';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import DayPicker from './DayPicker';
import { useTranslation } from '../../../services/translation';

const useStyles = makeStyles(theme => ({
  spacing: {
    paddingLeft: theme.custom.padding,
    paddingRight: theme.custom.padding,
    marginTop: '1em',
  },
  dayPickerWrapper: {
    marginTop: '1em',
  },
}));

const makeGetErrorAndHelperText = (formState, t = str => str) => (key) => {
  const error = !!formState.touched[key] && !formState.validity[key];
  const helperText = !!error && t(formState.errors[key]);
  return { error, helperText };
};

const selectProps = { native: true };

const ExpenseForm = ({ match: { params: { id } } }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // Redux State
  const mapState = useCallback(state => ({
    categories: state.categories.categories,
    categoriesFetched: state.categories.fetched,
  }), []);
  const { categories, categoriesFetched } = useMappedState(mapState);
  const dispatch = useDispatch();
  // didMount
  useEffect(() => {
    if (!categoriesFetched) {
      dispatch.categories.fetchCategories();
    }
  }, []);
  const [formState, { text, select, number }] = useFormState({
    date: moment().format('YYYY-MM-DD'),
    description: '',
    categoryId: '',
    amount: '',
  });
  console.log(formState);
  const getErrorAndHelperText = makeGetErrorAndHelperText(formState, t);
  return (
    <>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t(!id ? 'New Expense' : 'Edit Expense')}
        right={(
          <IconButton color="inherit" disabled>
            <DoneIcon />
          </IconButton>
        )}
      />
      <div className={classes.dayPickerWrapper}>
        <DayPicker {...text('date')} asInput />
      </div>
      <Grid container direction="column" className={classes.spacing} spacing={16}>
        <Grid item>
          <TextField
            {...text('description')}
            {...getErrorAndHelperText('description')}
            label={t('Description')}
            required
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            {...select('categoryId')}
            {...getErrorAndHelperText('categoryId')}
            label={t('Category')}
            required
            fullWidth
            select
            SelectProps={selectProps}
            InputLabelProps={{ shrink: !!formState.values.categoryId }}
          >
            <option value="" />
            {Object.values(categories).map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            {...number('amount')}
            {...getErrorAndHelperText('amount')}
            label={t('Amount')}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

ExpenseForm.propTypes = {
  match: PropTypes.shape().isRequired,
};

ExpenseForm.defaultProps = {};

export default ExpenseForm;
