import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTranslation } from '../../../services/translation';

const SectionPicker = ({ sections, onSectionClick, filters }) => {
  const { t } = useTranslation();
  return (
    <List>
      {sections.map((section, index) => (
        <ListItem
          key={section.property}
          button
          onClick={event => onSectionClick(index, section, event)}
          selected={filters[section.property] !== null && !!filters[section.property].length}
        >
          <ListItemText>{t(section.title)}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

SectionPicker.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape()),
  onSectionClick: PropTypes.func,
  filters: PropTypes.shape().isRequired,
};

const dummyFunc = () => {};
SectionPicker.defaultProps = {
  sections: [],
  onSectionClick: dummyFunc,
};

export default SectionPicker;
