import { useEffect } from 'react';
import { useSessionStorage } from 'react-use';

interface UsePriceRangeStorageParams {
  handle: string;
  priceRange: { min: number; max: number };
  hasActiveFilters: boolean;
  isMounted: boolean;
}

const TEN_MINUTES = 10 * 60 * 1000;

export function usePriceRangeStorage({ handle, priceRange, hasActiveFilters, isMounted }: UsePriceRangeStorageParams) {
  const [originalPriceRange, setOriginalPriceRange] = useSessionStorage<{
    min: number;
    max: number;
    timestamp: number;
  } | null>(`price-range-${handle}`, null);

  // Use original range for slider, current range for reset logic
  const basePriceRange = originalPriceRange
    ? { min: originalPriceRange.min, max: originalPriceRange.max }
    : priceRange;

  // Smart price range storage with validation
  useEffect(() => {
    if (!isMounted || hasActiveFilters) {
      return;
    }

    const now = Date.now();

    // Update if:
    // 1. No stored range
    // 2. Stored range is older than 10 minutes
    // 3. API range is WIDER than stored (new products added)
    const shouldUpdate =
      !originalPriceRange ||
      now - originalPriceRange.timestamp > TEN_MINUTES ||
      priceRange.min < originalPriceRange.min ||
      priceRange.max > originalPriceRange.max;

    if (shouldUpdate) {
      setOriginalPriceRange({ ...priceRange, timestamp: now });
    }
  }, [isMounted, hasActiveFilters, priceRange, originalPriceRange, setOriginalPriceRange]);

  return basePriceRange;
}
