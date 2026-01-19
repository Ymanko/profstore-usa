/* eslint-disable no-console */

import type { SubcategoryProductsParams } from '@/shared/queries/collections/types';

interface UseCollectionFiltersProps {
  decodedFilters: SubcategoryProductsParams['filters'];
  setParams: (params: { f?: string; minPrice?: number | null; maxPrice?: number | null }) => Promise<URLSearchParams>;
  basePriceRange: { min: number; max: number };
}

export function useCollectionFilters({ decodedFilters, setParams, basePriceRange }: UseCollectionFiltersProps) {
  const handleFilterChange = (filterInput: string, checked: boolean) => {
    try {
      const filterValue = JSON.parse(filterInput);
      const currentFilters = decodedFilters?.filter(f => !('price' in f)) || [];
      let updatedFilters: NonNullable<SubcategoryProductsParams['filters']>;

      if (checked) {
        updatedFilters = [...currentFilters, filterValue];
      } else {
        updatedFilters = currentFilters.filter(f => JSON.stringify(f) !== JSON.stringify(filterValue));
      }

      const encoded = updatedFilters.length > 0 ? btoa(JSON.stringify(updatedFilters)) : '';
      setParams({ f: encoded });
    } catch (error) {
      console.error('Failed to parse filter:', error);
    }
  };

  const handlePriceChange = (min: number, max: number) => {
    const isDefaultMin = min === basePriceRange.min;
    const isDefaultMax = max === basePriceRange.max;
    const bothDefault = isDefaultMin && isDefaultMax;

    setParams({
      minPrice: bothDefault ? null : min,
      maxPrice: bothDefault ? null : max,
    });
  };

  return {
    handleFilterChange,
    handlePriceChange,
  };
}
