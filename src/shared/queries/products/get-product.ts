import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_PRODUCT } from '@/shared/queries/products/query';

import type { ProductData } from '@/shared/queries/products/types';

export const getProductQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['product', handle],
    queryFn: async () => {
      return serverGraphqlFetcher<ProductData>(
        GET_PRODUCT,
        { handle },
        { tags: ['product', handle], revalidate: 3600 },
      );
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: (data: ProductData): ProductData['product'] => data.product,
  });
