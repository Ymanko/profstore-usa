import { queryOptions } from '@tanstack/react-query';

import { getWishlistWithUrls } from '@/shared/actions/wishlist/get-wishlist-with-urls';
import { extractNumericId } from '@/shared/utils/extract-numeric-id';

export const getWishlistWithUrlsQueryOptions = (customerId: string) => {
  const normalizedCustomerId = extractNumericId(customerId);

  return queryOptions({
    queryKey: ['wishlist-with-urls', normalizedCustomerId],
    queryFn: () => getWishlistWithUrls(normalizedCustomerId),
    enabled: !!customerId,
    staleTime: 0, // Always refetch on mount to get fresh data
  });
};
