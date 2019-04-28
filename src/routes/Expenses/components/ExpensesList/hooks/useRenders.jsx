import React, { useMemo } from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CategoryTitle from '../../../../../components/CategoryTitle';
import Currency from '../../../../../components/Currency';

export const avatarRenderText = key => item => <Avatar>{typeof key === 'string' ? item[key] : key(item)}</Avatar>;

export const avatarRenderCategoryColor = category => (
  <Avatar style={{ backgroundColor: category ? category.color : 'lightgray' }}>
    {!!category && category.name.substring(0, 2).toUpperCase()}
  </Avatar>
);
const avatarRenderColorMaker = categories => item => avatarRenderCategoryColor(
  categories[item.categoryId],
);
const avatarRenderDateText = avatarRenderText(item => moment(item.date).format('DD'));
export const dayTitle = date => (<Typography variant="h6" align="center">{moment(date).format('ddd DD')}</Typography>);
const categoryTitle = title => <CategoryTitle category={title} />;
const renderText = item => item.description;
const renderAction = item => <Currency value={item.amount} />;
const renderFooter = (_primary, items) => {
  const primary = <Typography style={{ textAlign: 'right', marginRight: 5, fontWeight: 'bold' }}>{_primary}</Typography>;
  const total = items.reduce((acum, item) => acum + item.amount, 0);
  const action = <Currency value={total} style={{ fontWeight: 'bold' }} />;
  return { primary, action };
};

const useRenders = (sortIndex, categories) => useMemo(() => {
  if (sortIndex === 0) {
    return {
      renderTitle: dayTitle,
      renderAvatar: avatarRenderColorMaker(categories),
      renderText,
      renderAction,
      renderFooter,
    };
  }
  return {
    renderTitle: categoryTitle,
    renderAvatar: avatarRenderDateText,
    renderText,
    renderAction,
    renderFooter,
  };
}, [sortIndex, categories]);

export default useRenders;
