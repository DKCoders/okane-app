import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSnackbar } from 'notistack';
import Navbar from '../../../../../components/Navbar';
import BackButton from '../../../../../components/BackButton';
import { useTranslation } from '../../../../../services/translation';
import { getFromLocalStorage, downloadFile } from '../../../../../utils/helpers';

const DataManagement = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const downloadBackup = useCallback(() => {
    const categories = getFromLocalStorage('categories');
    const expenses = getFromLocalStorage('expenses');
    const joined = {
      categories,
      expenses,
    };
    const json = JSON.stringify(joined);
    const resolve = () => {
      enqueueSnackbar(t('File Downloaded'));
    };
    const reject = (e) => {
      enqueueSnackbar(e.message);
    };
    downloadFile('backup.json', json, resolve, reject);
  }, []);
  return (
    <>
      <Navbar
        left={<BackButton to="/settings" />}
        title={t('Data management')}
      />
      <List>
        <ListItem button onClick={downloadBackup}>
          <ListItemText primary={t('Download Backup')} />
        </ListItem>
      </List>
    </>
  );
};

DataManagement.propTypes = {};

DataManagement.defaultProps = {};

export default DataManagement;
