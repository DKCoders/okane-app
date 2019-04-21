import React, { useCallback, useMemo, useState } from 'react';
import SortDialog from '../../../../../components/SortDialog';

const sortOptions = [
  { text: 'Date' },
  { text: 'Category' },
];
const useSorters = () => {
  // Sort state
  const [sortOpen, setSortOpen] = useState(false);
  const [{ sortIndex, sortDir }, setSort] = useState({ sortIndex: 0, sortDir: 'desc' });
  const onSortChange = ({ sortIndex: index, sortDir: dir }) => {
    setSort({ sortIndex: index, sortDir: dir });
  };
  // Handlers
  const onClose = useCallback(() => setSortOpen(false), []);
  const openSorters = useCallback(() => setSortOpen(true), []);
  const sortRender = useMemo(() => (
    <SortDialog
      open={sortOpen}
      onClose={onClose}
      options={sortOptions}
      translateText
      index={sortIndex}
      dir={sortDir}
      onSave={onSortChange}
    />
  ), [sortOpen, sortIndex, sortDir]);
  return {
    sortIndex, sortDir, openSorters, sortRender,
  };
};

export default useSorters;
