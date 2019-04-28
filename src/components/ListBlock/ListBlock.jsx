import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 10,
  },
});

const ListBlock = ({
  title, footer, renderAvatar, renderText, renderAction, items, keyProp, onItemClick,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <List>
        <ListSubheader>{title}</ListSubheader>
        {items.map((item, index) => (
          <ListItem button key={item[keyProp]} onClick={event => onItemClick(item, index, event)}>
            {renderAvatar && (
              <ListItemAvatar>
                {renderAvatar(item, index)}
              </ListItemAvatar>
            )}
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={renderText(item, index)}
            />
            {renderAction && (
              <ListItemSecondaryAction>
                {renderAction(item, index)}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
        {!!footer && (
          <ListItem>
            {!!footer.avatar
              && footer.avatar
            }
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={footer.primary}
              secondary={footer.secondary}
            />
            {!!footer.action && (
              <ListItemSecondaryAction>
                {footer.action}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )}
      </List>
    </div>
  );
};

ListBlock.propTypes = {
  title: PropTypes.node,
  renderAvatar: PropTypes.func,
  renderAction: PropTypes.func,
  renderText: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape()),
  keyProp: PropTypes.string,
  footer: PropTypes.shape({
    avatar: PropTypes.node,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    action: PropTypes.node,
  }),
};

const dummyFunc = () => {};
ListBlock.defaultProps = {
  title: null,
  renderAvatar: null,
  renderAction: null,
  onItemClick: dummyFunc,
  items: [],
  keyProp: 'id',
  footer: null,
};

export default ListBlock;
