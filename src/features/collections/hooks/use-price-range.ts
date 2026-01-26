import type { Filter } from '@/shared/queries/collections/types';

const DEFAULT_PRICE_RANGE = { min: 0, max: 1000 };

export function usePriceRange(priceFilter?: Filter) {
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
}
