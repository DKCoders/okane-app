import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { useTranslation } from '../../../services/translation';

const Section = ({ section }) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h5">
        {t(section.title)}
      </Typography>
      <List>
        {section.options.map(option => (
          <ListItem button key={option[section.keyProp]}>
            {section.renderAvatar && (
            <ListItemAvatar>
              {section.renderAvatar(option)}
            </ListItemAvatar>
            )}
            <ListItemText>{section.renderText(option)}</ListItemText>
            <ListItemSecondaryAction>
              {section.type === 'multi'
                ? (<Checkbox checked />)
                : (<Radio checked />)
          }
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

Section.propTypes = {
  section: PropTypes.shape().isRequired,
};

Section.defaultProps = {};

export default Section;
