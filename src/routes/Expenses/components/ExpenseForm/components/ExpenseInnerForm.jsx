import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useField, useForm } from 'react-final-form-hooks';
import { useBoolean } from 'react-hanger';
import { useDispatch, useMappedState } from 'redux-react-hook';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import { FORM_ERROR } from 'final-form';
import Navbar from '../../../../../components/Navbar';
import BackButton from '../../../../../components/BackButton';
import DayPicker from './DayPicker';
import { useTranslation } from '../../../../../services/translation';
import { makeValidator } from '../../../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  spacing: {
    paddingLeft: theme.custom.padding,
    paddingRight: theme.custom.padding,
    marginTop: '1em',
  },
  itemSpacing: {
    paddingBottom: 16,
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

const newInitialValues = {
  date: moment().format('YYYY-MM-DD'),
  description: '',
  categoryId: '',
  amount: '',
};

const ExpenseInnerForm = ({ history, id, data }) => {
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
      dispatch.categories.fetch();
    }
  }, []);
  // Create another state
  const createAnother = useBoolean(false);
  // Form state
  const onSubmit = useCallback(async (values, formApi) => {
    // Casting numbers
    const castedValues = { ...values, amount: +values.amount };
    try {
      if (!id) {
      // New
        const newItem = await dispatch.expenses.add(castedValues);
        if (createAnother.value) {
          const anotherInitialValues = {
            ...newInitialValues,
            date: castedValues.date,
          };
          formApi.reset(anotherInitialValues);
        } else {
          history.replace(`/expenses/${newItem.id}`);
        }
        return {};
      }
      // Edit
      await dispatch.expenses.edit({ id, item: castedValues });
      history.replace(`/expenses/${id}`);
      return {};
    } catch (e) {
      return { [FORM_ERROR]: e.message };
    }
  }, [createAnother.value]);
  let initialValues = newInitialValues;
  if (id) {
    const {
      date: _date, description: _description, amount: _amount, categoryId: _categoryId,
    } = data;
    initialValues = {
      date: _date, description: _description, amount: _amount, categoryId: _categoryId,
    };
  }
  const {
    form, handleSubmit, pristine, submitting, submitError,
  } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate, // a record-level validation function to check all form values
    initialValues,
  });
  const date = useField('date', form);
  const description = useField('description', form);
  const categoryId = useField('categoryId', form);
  const amount = useField('amount', form);
  const getErrorAndHelperText = makeGetErrorAndHelperText(t);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Navbar
        left={<BackButton to={!id ? '/expenses' : `/expenses/${id}`} />}
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
      <Grid container direction="column" className={classes.spacing}>
        <Grid item className={classes.itemSpacing}>
          <TextField
            {...description.input}
            {...getErrorAndHelperText(description)}
            label={t('Description')}
            required
            fullWidth
          />
        </Grid>
        <Grid item className={classes.itemSpacing}>
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
        <Grid item className={classes.itemSpacing}>
          <TextField
            {...amount.input}
            {...getErrorAndHelperText(amount)}
            type="number"
            label={t('Amount')}
            required
            fullWidth
          />
        </Grid>
        {!id && (
          <Grid item className={classes.itemSpacing}>
            <FormControlLabel
              control={
                <Checkbox checked={createAnother.value} onChange={createAnother.toggle} />
              }
              label={t('Create another after save')}
            />
          </Grid>
        )}
        {submitError && (
          <Grid item className={classes.itemSpacing}>
            <Typography variant="headline" color="error">{t(submitError)}</Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

ExpenseInnerForm.propTypes = {
  id: PropTypes.string,
  history: PropTypes.shape().isRequired,
  data: PropTypes.shape(),
};

ExpenseInnerForm.defaultProps = {
  id: null,
  data: null,
};

export default ExpenseInnerForm;
