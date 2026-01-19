import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_PRODUCT_COLLECTIONS } from '@/shared/queries/home/collections/query';

import type { ProductCollectionsResponse } from '@/shared/queries/home/collections/types';

export const getProductCollectionsQueryOptions = queryOptions({
  queryKey: ['product-collections'],
  queryFn: () => {
    return serverGraphqlFetcher<ProductCollectionsResponse>(
      GET_PRODUCT_COLLECTIONS,
      {},
      {
        tags: ['product-collections'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => {
    const newProductsCount = data.shop?.newProductsCount?.value ? parseInt(data.shop.newProductsCount.value, 10) : 8;

    return {
      recommended: data.recommended,
      new: {
        edges: data.new?.edges?.slice(0, newProductsCount) ?? [],
      },
      saleHits: data.saleHits,
    };
  },
});
