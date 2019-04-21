import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  compose, toPairs, fromPairs, filter,
} from 'ramda';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Check';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AppBar from '../StyledAppBar';
import Toolbar from '../Toolbar';
import SectionPicker from './components/SectionPicker';
import Section from './components/Section';
import { useTranslation } from '../../services/translation';

const Transition = props => <Slide direction="up" {...props} />;

const getDefaultFilters = sections => sections
  .reduce((acum, section) => ({ ...acum, [section.property]: section.type === 'multi' ? [] : null }), {});

const cleanFilters = compose(
  fromPairs,
  filter(entries => entries[1].length),
  toPairs,
);

const FilterDialog = ({
  open, onClose, onSave, sections, initialValue,
}) => {
  const { t } = useTranslation();
  // Filter state
  const [filters, setFilters] = useState({});
  useEffect(() => {
    const defaultFilters = getDefaultFilters(sections);
    const useInitialValue = initialValue && Object.keys(initialValue).length === sections.length;
    setFilters(useInitialValue ? initialValue : defaultFilters);
  }, [open]);
  // Section state
  const [selectedSection, setSelectedSection] = useState(null);

  const onCloseHandle = (event) => {
    if (onClose) {
      onClose(event);
      setSelectedSection(null);
    }
  };
  const onClearHandle = () => {
    const defaultFilters = getDefaultFilters(sections);
    setFilters(defaultFilters);
  };
  const onSaveHandle = (event) => {
    if (onSave) {
      onSave(cleanFilters(filters));
      onCloseHandle(event);
      setSelectedSection(null);
      setFilters({});
    }
  };

  // Content render logic
  let content = null;
  if (open) {
    if (sections.length === 1) {
      content = (
        <Section
          section={sections[0]}
          value={filters[sections[0].property]}
          onChange={value => setFilters({ ...filters, [sections[0].property]: value })}
        />
      );
    } else if (selectedSection !== null) {
      const section = sections[selectedSection];
      content = (
        <Section
          section={section}
          onBack={() => setSelectedSection(null)}
          value={filters[section.property]}
          onChange={value => setFilters({ ...filters, [section.property]: value })}
        />
      );
    } else {
      content = (
        <SectionPicker
          sections={sections}
          onSectionClick={index => setSelectedSection(index)}
          filters={filters}
        />
      );
    }
  }

  return (
    <Dialog fullScreen open={open} onClose={onCloseHandle} TransitionComponent={Transition}>
      <AppBar position="relative">
        <Toolbar
          left={(
            <IconButton color="inherit" onClick={onCloseHandle} aria-label="Close">
              <CloseIcon />
            </IconButton>
        )}
          title={t('Filters')}
          right={(
            <>
              <IconButton color="inherit" onClick={onClearHandle}>
                <ClearAllIcon />
              </IconButton>
              <IconButton color="inherit" onClick={onSaveHandle}>
                <SaveIcon />
              </IconButton>
            </>
        )}
        />
      </AppBar>
      {content}
    </Dialog>
  );
};

FilterDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  sections: PropTypes.arrayOf(PropTypes.shape()),
  initialValue: PropTypes.shape(),
};

FilterDialog.defaultProps = {
  open: false,
  onClose: null,
  onSave: null,
  sections: [],
  initialValue: null,
};

export default FilterDialog;
