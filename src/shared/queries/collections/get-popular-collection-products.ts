import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_POPULAR_COLLECTION_PRODUCTS } from '@/shared/queries/collections/query';

import type { PopularCollectionProductsData } from '@/shared/queries/collections/types';

export const getPopularCollectionProductsQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['collection', handle, 'popular-products'],
    queryFn: async () => {
      return serverGraphqlFetcher<PopularCollectionProductsData>(
        GET_POPULAR_COLLECTION_PRODUCTS,
        { handle, first: 6 },
        { tags: ['collection', handle, 'popular'] },
      );
    },
    select: data => data.collection?.products.edges.map(edge => edge.node) ?? [],
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
