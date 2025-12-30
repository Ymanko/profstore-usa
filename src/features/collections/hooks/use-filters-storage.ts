import { useEffect } from 'react';
import { useSessionStorage } from 'react-use';

import type { Filter } from '@/shared/queries/collections/get-subcategory-products';

interface UseFiltersStorageParams {
  handle: string;
  filters: Filter[];
  hasActiveFilters: boolean;
  isMounted: boolean;
}

const FIVE_MINUTES = 5 * 60 * 1000;

export function useFiltersStorage({ handle, filters, hasActiveFilters, isMounted }: UseFiltersStorageParams) {
  const [storedFilters, setStoredFilters] = useSessionStorage<{
    filters: Filter[];
    timestamp: number;
  } | null>(`filters-${handle}`, null);

  // Use stored filters if available and current filters are empty
  const baseFilters = filters.length > 0 ? filters : (storedFilters?.filters ?? []);

  // Smart filters storage with validation
  useEffect(() => {
    if (!isMounted || hasActiveFilters || filters.length === 0) {
      return;
    }

    const now = Date.now();

    // Update if:
    // 1. No stored filters
    // 2. Stored filters are older than 5 minutes
    // 3. New filters have more options (new products added)
    const shouldUpdate =
      !storedFilters || now - storedFilters.timestamp > FIVE_MINUTES || filters.length > storedFilters.filters.length;

    if (shouldUpdate) {
      setStoredFilters({ filters, timestamp: now });
    }
  }, [isMounted, hasActiveFilters, filters, storedFilters, setStoredFilters]);

  return baseFilters;
}
