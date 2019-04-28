import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import { useTranslation } from '../../../services/translation';

const SettingsList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title={t('Settings')}
      />
      <List>
        <ListItem button component={Link} to="/settings/data-management">
          <ListItemText primary={t('Data management')} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/settings/languages">
          <ListItemText primary={t('Languages')} />
        </ListItem>
        <Divider />
      </List>
    </>
  );
};

SettingsList.propTypes = {};

SettingsList.defaultProps = {};

export default SettingsList;
