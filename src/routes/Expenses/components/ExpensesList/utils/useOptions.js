import { useMemo } from 'react';
import { avatarRenderCategoryColor } from './useRenders';

const useOptions = categories => useMemo(() => {
  const sortOptions = [
    { text: 'Date' },
    { text: 'Category' },
  ];

  const filterSections = [{
    property: 'categories',
    title: 'Categories',
    type: 'multi',
    options: Object.values(categories),
    valueProp: 'id',
    renderText: category => category.name,
    renderAvatar: avatarRenderCategoryColor,
  }];
  return { sortOptions, filterSections };
}, [categories]);

export default useOptions;
