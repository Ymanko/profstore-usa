import { queryOptions } from '@tanstack/react-query';

import { getProductReviews } from '@/shared/actions/review/get-reviews';
import { STALE_TIME } from '@/shared/constants/stale-time';

export type { JudgeMeReview } from '@/shared/actions/review/get-reviews';

export const getProductReviewsQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['reviews', productId],
    queryFn: () => getProductReviews(productId),
    staleTime: STALE_TIME.FIVE_MINUTES,
    enabled: !!productId,
  });
