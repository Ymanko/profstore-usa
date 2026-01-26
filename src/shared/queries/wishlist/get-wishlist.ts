import { queryOptions } from '@tanstack/react-query';

import { getWishlistData } from '@/shared/actions/wishlist/get-wishlist-data';
import { extractNumericId } from '@/shared/utils/extract-numeric-id';

export const getWishlistQueryOptions = (customerId: string) => {
  const normalizedCustomerId = extractNumericId(customerId);

  return queryOptions({
    queryKey: ['wishlist', normalizedCustomerId],
    queryFn: () => getWishlistData(normalizedCustomerId),
    enabled: !!customerId,
  });
};
