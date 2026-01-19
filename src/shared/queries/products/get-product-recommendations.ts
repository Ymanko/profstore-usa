import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_PRODUCT_RECOMMENDATIONS } from '@/shared/queries/products/query';

import type { RecommendationIntent, RecommendationsData } from '@/shared/queries/products/types';

export const getProductRecommendationsQueryOptions = (productId: string, intent: RecommendationIntent = 'RELATED') =>
  queryOptions({
    queryKey: ['product-recommendations', productId, intent],
    queryFn: async () => {
      return serverGraphqlFetcher<RecommendationsData>(
        GET_PRODUCT_RECOMMENDATIONS,
        { productId, intent },
        { tags: ['recommendations', productId], revalidate: 3600 },
      );
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: data => data.productRecommendations || [],
    enabled: !!productId,
  });

// Convenience functions
export const getRelatedProductsQueryOptions = (productId: string) =>
  getProductRecommendationsQueryOptions(productId, 'RELATED');

export const getComplementaryProductsQueryOptions = (productId: string) =>
  getProductRecommendationsQueryOptions(productId, 'COMPLEMENTARY');
