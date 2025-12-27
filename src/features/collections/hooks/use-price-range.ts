import { useMemo } from 'react';

import type { Filter } from '@/shared/queries/collections/get-subcategory-products';

const DEFAULT_PRICE_RANGE = { min: 0, max: 1000 };

/**
 * Parses and extracts price range from price filter
 * @param priceFilter - Price filter from collection products
 * @returns Price range with min and max values
 */
export function usePriceRange(priceFilter: Filter | undefined) {
  return useMemo(() => {
    if (!priceFilter?.values[0]) {
      return DEFAULT_PRICE_RANGE;
    }

    try {
      const data = JSON.parse(priceFilter.values[0].input);
      return {
        min: Math.floor(data.price?.min ?? 0),
        max: Math.ceil(data.price?.max ?? 1000),
      };
    } catch {
      return DEFAULT_PRICE_RANGE;
    }
  }, [priceFilter]);
}
