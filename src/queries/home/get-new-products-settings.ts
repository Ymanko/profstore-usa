import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const COUNT_DEFAULT = 10;

const GET_NEW_PRODUCTS_SETTINGS = `
  query GetNewProductsSettings {
    shop {
      metafield(namespace: "custom", key: "new_products_count") {
        value
      }
    }
  }
`;

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
