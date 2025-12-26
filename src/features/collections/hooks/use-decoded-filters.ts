import { useMemo } from 'react';

import type { SubcategoryProductsParams } from '@/shared/queries/collections/get-subcategory-products';

interface UseDecodedFiltersParams {
  f: string;
  minPrice: number | null;
  maxPrice: number | null;
}

export function useDecodedFilters(params: UseDecodedFiltersParams): SubcategoryProductsParams['filters'] {
  return useMemo(() => {
    const filters = [];

    if (params.f) {
      const decoded = atob(params.f);
      const parsedFilters = JSON.parse(decoded);
      filters.push(...parsedFilters);
    }

    if (params.minPrice !== null || params.maxPrice !== null) {
      filters.push({
        price: {
          min: params.minPrice ?? undefined,
          max: params.maxPrice ?? undefined,
        },
      });
    }

    return filters;
  }, [params.f, params.minPrice, params.maxPrice]);
}
