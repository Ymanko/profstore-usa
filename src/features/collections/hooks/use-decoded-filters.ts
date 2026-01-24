import type { SubcategoryProductsParams } from '@/shared/queries/collections/types';

interface UseDecodedFiltersParams {
  f: string;
  minPrice: number | null;
  maxPrice: number | null;
}

export function useDecodedFilters(params: UseDecodedFiltersParams): SubcategoryProductsParams['filters'] {
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
}
