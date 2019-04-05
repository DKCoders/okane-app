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
  title, renderAvatar, renderText, renderAction, items, keyProp,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <List>
        <ListSubheader>{title}</ListSubheader>
        {items.map((item, index) => (
          <ListItem button key={item[keyProp]}>
            {renderAvatar && (
              <ListItemAvatar>
                {renderAvatar(item, index)}
              </ListItemAvatar>
            )}
            <ListItemText primary={renderText(item, index)} />
            {renderAction && (
              <ListItemSecondaryAction>
                {renderAction(item, index)}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ListBlock.propTypes = {
  title: PropTypes.node,
  renderAvatar: PropTypes.func,
  renderAction: PropTypes.func,
  renderText: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()),
  keyProp: PropTypes.string,
};

ListBlock.defaultProps = {
  title: null,
  renderAvatar: null,
  renderAction: null,
  items: [],
  keyProp: 'id',
};

export default ListBlock;
