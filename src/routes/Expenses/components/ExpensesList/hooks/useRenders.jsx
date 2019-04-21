import React, { useMemo } from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CategoryTitle from '../../../../../components/CategoryTitle';
import Currency from '../../../../../components/Currency';

export const avatarRenderCategoryColor = category => (
  <Avatar style={{ backgroundColor: category ? category.color : 'lightgray' }}>
    {!!category && category.name.substring(0, 2).toUpperCase()}
  </Avatar>
);
const avatarRenderColorMaker = categories => item => avatarRenderCategoryColor(
  categories[item.categoryId],
);
const avatarRenderText = item => <Avatar>{moment(item.date).format('DD')}</Avatar>;
const dayTitle = date => (<Typography variant="h6" align="center">{moment(date).format('ddd DD')}</Typography>);
const categoryTitle = title => <CategoryTitle category={title} />;
const renderText = item => item.description;
const renderAction = item => <Currency value={item.amount} />;

const useRenders = (sortIndex, categories) => useMemo(() => {
  if (sortIndex === 0) {
    return {
      renderTitle: dayTitle,
      renderAvatar: avatarRenderColorMaker(categories),
      renderText,
      renderAction,
    };
  }
  return {
    renderTitle: categoryTitle,
    renderAvatar: avatarRenderText,
    renderText,
    renderAction,
  };
}, [sortIndex, categories]);

export default useRenders;
