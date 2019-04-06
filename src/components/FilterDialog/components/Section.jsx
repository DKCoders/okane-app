import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/styles';
import Toolbar from '../../Toolbar';
import { useTranslation } from '../../../services/translation';

const useStyles = makeStyles({
  margin: {
    marginRight: 20,
  },
});

const Section = ({
  section, onBack, value, onChange,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const onItemClick = newValue => (event) => {
    if (onChange) {
      if (section.type === 'multi') {
        const safeValue = Array.isArray(value) ? value : [];
        const newIndex = safeValue.findIndex(val => newValue === val);
        const returnValue = newIndex !== -1
          ? safeValue.filter(val => val !== newValue)
          : [...safeValue, newValue];
        onChange(returnValue, event);
      } else {
        onChange(newValue, event);
      }
    }
  };
  const onSelectAllClick = (event) => {
    if (onChange) {
      if (section.type === 'multi') {
        if (value.length === section.options.length) {
          onChange([], event);
        } else {
          const allValues = section.options.map(option => option[section.valueProp]);
          onChange(allValues, event);
        }
      } else {
        onChange(null, event);
      }
    }
  };
  return (
    <>
      <Toolbar
        left={!!onBack && (
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        title={(
          <Badge variant="dot" color="secondary" invisible={value === null || !value.length}>
            {t(section.title)}
          </Badge>
        )}
        right={(
          <IconButton onClick={onSelectAllClick}>
            {section.type === 'multi' ? <SelectAllIcon /> : <ClearIcon />}
          </IconButton>
        )}
      />
      <List>
        {section.options.map((option) => {
          const onClickHandler = onItemClick(option[section.valueProp]);
          return (
            <ListItem
              button
              key={option[section.valueProp]}
              onClick={onClickHandler}
            >
              {section.renderAvatar && (
              <ListItemAvatar>
                {section.renderAvatar(option)}
              </ListItemAvatar>
              )}
              <ListItemText>
                {section.renderText(option)}
              </ListItemText>
              <ListItemSecondaryAction className={classes.margin}>
                {section.type === 'multi'
                  ? (
                    <Checkbox
                      onClick={onClickHandler}
                      checked={Array.isArray(value) && value.includes(option[section.valueProp])}
                    />
                  )
                  : (
                    <Radio
                      onClick={onClickHandler}
                      checked={value === option[section.valueProp]}
                    />
                  )
                }
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
Section.propTypes = {
  section: PropTypes.shape().isRequired,
  onBack: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(stringOrNumber),
    stringOrNumber,
  ]),
  onChange: PropTypes.func.isRequired,
};

Section.defaultProps = {
  onBack: null,
  value: null,
};

export default Section;
