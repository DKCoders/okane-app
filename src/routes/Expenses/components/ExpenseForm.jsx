import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useField, useForm } from 'react-final-form-hooks';
import { useDispatch, useMappedState } from 'redux-react-hook';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../components/BackButton';
import DayPicker from './DayPicker';
import { useTranslation } from '../../../services/translation';
import { makeValidator } from '../../../utils/helpers';

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

const rules = [
  { key: 'date', validators: ['required'] },
  { key: 'description', validators: ['required'] },
  { key: 'categoryId', validators: ['required'] },
  { key: 'amount', validators: ['required', 'number', 'positive'] },
];

const validate = makeValidator(rules);

const makeGetErrorAndHelperText = (t = str => str) => (field) => {
  const helperText = field.meta.touched && field.meta.error && t(field.meta.error);
  const error = !!helperText;
  return { error, helperText };
};

const selectProps = { native: true };

const onSubmit = values => ({});

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
  // Form state
  const {
    form, handleSubmit, pristine, submitting,
  } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate, // a record-level validation function to check all form values
    initialValues: {
      date: moment().format('YYYY-MM-DD'),
      description: '',
      categoryId: '',
      amount: '',
    },
  });
  const date = useField('date', form);
  const description = useField('description', form);
  const categoryId = useField('categoryId', form);
  const amount = useField('amount', form);
  const getErrorAndHelperText = makeGetErrorAndHelperText(t);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Navbar
        left={<BackButton to="/expenses" />}
        title={t(!id ? 'New Expense' : 'Edit Expense')}
        right={(
          <IconButton color="inherit" disabled={pristine || submitting} type="submit">
            <DoneIcon />
          </IconButton>
        )}
      />
      <div className={classes.dayPickerWrapper}>
        <DayPicker {...date.input} asInput />
      </div>
      <Grid container direction="column" className={classes.spacing} spacing={16}>
        <Grid item>
          <TextField
            {...description.input}
            {...getErrorAndHelperText(description)}
            label={t('Description')}
            required
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            {...categoryId.input}
            {...getErrorAndHelperText(categoryId)}
            label={t('Category')}
            required
            fullWidth
            select
            SelectProps={selectProps}
            InputLabelProps={{ shrink: !!categoryId.input.value }}
          >
            <option value="" />
            {Object.values(categories).map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            {...amount.input}
            {...getErrorAndHelperText(amount)}
            type="number"
            label={t('Amount')}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

ExpenseForm.propTypes = {
  match: PropTypes.shape().isRequired,
};

ExpenseForm.defaultProps = {};

export default ExpenseForm;
