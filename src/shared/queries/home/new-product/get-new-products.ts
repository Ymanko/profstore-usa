import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_NEW_PRODUCTS } from '@/shared/queries/home/new-product/query';

import type { NewProductsResponse } from '@/shared/queries/home/new-product/types';

export const getNewProductsQueryOptions = queryOptions({
  queryKey: ['new-products'],
  queryFn: async () => {
    return await serverGraphqlFetcher<NewProductsResponse>(
      GET_NEW_PRODUCTS,
      {},
      {
        tags: ['new-products'],
      },
    );
  },
  select: data => {
    const count = data.shop?.newProductsCount?.value ? parseInt(data.shop.newProductsCount.value, 10) : 8;

    return {
      edges: data.products?.edges?.slice(0, count) ?? [],
    };
  },
  staleTime: STALE_TIME.ONE_HOUR,
});
