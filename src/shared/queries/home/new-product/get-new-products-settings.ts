import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_NEW_PRODUCTS_SETTINGS } from '@/shared/queries/home/new-product/query';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

const COUNT_DEFAULT = 10;

export const getNewProductsSettingsQueryOptions = queryOptions({
  queryKey: ['new-products-settings'],
  queryFn: async () => {
    const data = await serverGraphqlFetcher<Pick<QueryRoot, 'shop'>>(
      GET_NEW_PRODUCTS_SETTINGS,
      {},
      {
        tags: ['new-products-settings'],
      },
    );

    const value = data.shop?.metafield?.value;
    if (!value) return COUNT_DEFAULT;

    return parseInt(value, 10);
  },
  staleTime: STALE_TIME.ONE_HOUR,
});
