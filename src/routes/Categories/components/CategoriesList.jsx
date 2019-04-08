import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import Search from '../../../components/Search';
import { useTranslation } from '../../../services/translation';
import confirmDialog from '../../../services/confirmDialog';
import categoryFormDialogService from './CategoryFormDialog';
import { categories } from '../../../mock';

const CategoriesList = () => {
  const { t } = useTranslation();
  // Menu state
  const [anchor, setAnchor] = useState(null);
  const [item, setItem] = useState(null);
  const setAnchorAndItem = (_anchor, _item) => {
    setAnchor(_anchor);
    setItem(_item);
  };
  // Handlers
  const onEdit = async () => {
    setAnchor(null);
    try {
      const edited = await categoryFormDialogService.show({ item });
      if (edited) {
        console.log(edited);
      }
    } catch (e) {
      throw e;
    } finally {
      setItem(null);
    }
  };
  const onRemove = async () => {
    setAnchor(null);
    const confirm = await confirmDialog.show({
      title: t('Confirmation'),
      content: `${t('Are you sure in deleting')} "${item.name}"?`,
      confirmText: `${t('Delete it')}!`,
      cancelText: t('No'),
    });
    if (confirm) {
      console.log('Here I remove', item);
    }
    setItem(null);
  };
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title="Categories"
        right={(<Search />)}
      />
      <List>
        {categories.map(category => (
          <ListItem key={category.id}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: category ? category.color : 'lightgray' }} />
            </ListItemAvatar>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="More"
                aria-owns="more-menu"
                aria-haspopup="true"
                onClick={({ currentTarget }) => setAnchorAndItem(currentTarget, category)}
              >
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchorAndItem(null, null)}
      >
        <MenuItem onClick={onEdit}>
          <ListItemIcon><EditIcon /></ListItemIcon>
          <ListItemText primary={t('Edit')} />
        </MenuItem>
        <MenuItem onClick={onRemove}>
          <ListItemIcon><DeleteIcon /></ListItemIcon>
          <ListItemText primary={t('Remove')} />
        </MenuItem>
      </Menu>
    </>
  );
};

CategoriesList.propTypes = {};

CategoriesList.defaultProps = {};

export default CategoriesList;
