import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import randomColor from 'randomcolor';
import { useMappedState, useDispatch } from 'redux-react-hook';
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
import { useSnackbar } from 'notistack';
import Navbar from '../../../components/Navbar';
import MenuButton from '../../../components/MenuButton';
import FilterSortSearchButtons from '../../../components/FilterSortSearchButtons';
import AddFabButton from '../../../components/AddFabButton';
import { useTranslation } from '../../../services/translation';
import confirmDialog from '../../../services/confirmDialog';
import categoryFormDialogService from './CategoryFormDialog';
import useDebounceState from '../../../hooks/useDebounceState';
import { filterByKey } from '../../../utils/helpers';

const template = {
  name: '',
  color: randomColor(),
};

const CategoriesList = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  // Search state
  const [search, setSearch] = useDebounceState('', 300);
  // State connection
  const mapState = useCallback(state => ({
    categories: Object.values(state.categories.categories),
  }), []);
  const { categories } = useMappedState(mapState);
  const dispatch = useDispatch();
  // Filtering
  const filtered = useMemo(() => categories.filter(filterByKey(search)), [categories, search]);
  // Error handler
  const onFetchError = useCallback((e) => {
    enqueueSnackbar(e.message);
  }, []);
  // Did mount
  const fetchData = useCallback(() => {
    dispatch.categories.fetchCategories({ reject: onFetchError });
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  // Menu state
  const [anchor, setAnchor] = useState(null);
  const [item, setItem] = useState(null);
  const setAnchorAndItem = (_anchor, _item) => {
    setAnchor(_anchor);
    setItem(_item);
  };
  // Handlers
  const onAdd = useCallback(async () => {
    setAnchor(null);
    const added = await categoryFormDialogService.show({
      item: { ...template, color: randomColor() },
    });
    if (added) {
      const resolve = () => setItem(null);
      dispatch.categories.addCategory({ item: added, resolve, reject: onFetchError });
    }
  }, [item]);
  const onEdit = useCallback(async () => {
    setAnchor(null);
    const edited = await categoryFormDialogService.show({ item });
    if (edited) {
      const resolve = () => setItem(null);
      dispatch.categories.editCategory({
        item: edited, resolve, reject: onFetchError, id: item.id,
      });
    }
  }, [item]);
  const onRemove = useCallback(async () => {
    setAnchor(null);
    const confirm = await confirmDialog.show({
      title: t('Confirmation'),
      content: `${t('Are you sure in deleting')} "${item.name}"?`,
      confirmText: `${t('Delete it')}!`,
      cancelText: t('No'),
    });
    if (confirm) {
      dispatch.categories.removeCategory({ id: item.id, reject: onFetchError });
    }
    setItem(null);
  }, [item]);
  return (
    <>
      <Navbar
        left={<MenuButton />}
        title="Categories"
        right={(<FilterSortSearchButtons onSearchChange={setSearch} />)}
      />
      <List>
        {!filtered.length ? (
          <ListItem>
            <ListItemText primary={!search ? t('Empty') : t('Nothing found')} />
          </ListItem>
        ) : filtered.map(category => (
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
      <AddFabButton onClick={onAdd} />
    </>
  );
};

CategoriesList.propTypes = {};

CategoriesList.defaultProps = {};

export default CategoriesList;
