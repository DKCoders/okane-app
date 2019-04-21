import React, { useState, useMemo, useCallback } from 'react';
import { avatarRenderCategoryColor } from './useRenders';
import FilterDialog from '../../../../../components/FilterDialog';

const isFiltersActive = filters => Object.values(filters).some((value) => {
  if (Array.isArray(value)) {
    return !!value.length;
  }
  return value !== null;
});

const useFilters = (categories) => {
  // States
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // Handlers
  const openFilters = useCallback(() => setFilterOpen(true), []);
  const onClose = useCallback(() => setFilterOpen(false), []);

  const isFilterActive = useMemo(() => isFiltersActive(filters), [filters]);

  const filterSections = useMemo(() => [{
    property: 'categoryId',
    title: 'Categories',
    type: 'multi',
    options: Object.values(categories),
    valueProp: 'id',
    renderText: category => category.name,
    renderAvatar: avatarRenderCategoryColor,
  }], [categories]);

  const filterRender = useMemo(() => (
    <FilterDialog
      open={filterOpen}
      onClose={onClose}
      sections={filterSections}
      onSave={setFilters}
      initialValue={filters}
    />
  ), [filterOpen, filterSections, filters]);

  return {
    filters, openFilters, isFilterActive, filterRender,
  };
};

export default useFilters;
