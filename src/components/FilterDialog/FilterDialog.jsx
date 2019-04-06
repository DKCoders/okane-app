import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const FilterDialog = ({
  open, onClose, onSave, sections,
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState(null);
  // Section state
  const [selectedSection, setSelectedSection] = useState(null);

  const onCloseHandle = (event) => {
    if (onClose) {
      onClose(event);
      setSelectedSection(null);
    }
  };
  const onClearHandle = () => {
    console.log('Clear all');
  };
  const onSaveHandle = (event) => {
    if (onSave) {
      onSave(event);
      setSelectedSection(null);
    }
  };

  // Content render logic
  let content = null;
  if (sections.length === 0) {
    content = (<Section section={sections[0]} />);
  } else if (selectedSection !== null) {
    content = (<Section section={sections[selectedSection]} />);
  } else {
    content = (<SectionPicker sections={sections} onSectionClick={setSelectedSection} />);
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
};

FilterDialog.defaultProps = {
  open: false,
  onClose: null,
  onSave: null,
  sections: [],
};

export default FilterDialog;
