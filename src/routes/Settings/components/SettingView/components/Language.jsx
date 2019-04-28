import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import CheckIcon from '@material-ui/icons/Check';
import Navbar from '../../../../../components/Navbar';
import BackButton from '../../../../../components/BackButton';
import { useTranslation, useLanguage } from '../../../../../services/translation';

const Language = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const { getLanguage, setLanguage } = useLanguage();
  const language = getLanguage();
  const onLanguageClick = useCallback((key) => {
    setLanguage(key);
    setCount(count + 1);
  }, [count, setLanguage]);
  return (
    <>
      <Navbar
        left={<BackButton to="/settings" />}
        title={t('Languages')}
      />
      <List>
        <ListItem button selected={language === 'en'} onClick={() => onLanguageClick('en')}>
          <ListItemText primary={t('English')} />
          {language === 'en' && (
            <ListItemSecondaryAction>
              <Icon>
                <CheckIcon />
              </Icon>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <ListItem button selected={language === 'es'} onClick={() => onLanguageClick('es')}>
          <ListItemText primary={t('Spanish')} />
          {language === 'es' && (
            <ListItemSecondaryAction>
              <Icon>
                <CheckIcon />
              </Icon>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
    </>
  );
};

Language.propTypes = {};

Language.defaultProps = {};

export default Language;
