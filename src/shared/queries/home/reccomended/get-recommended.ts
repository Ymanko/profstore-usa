import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_RECOMMENDED } from '@/shared/queries/home/reccomended/query';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

export const getRecommendedQueryOptions = queryOptions({
  queryKey: ['recommended'],
  queryFn: () => {
    return serverGraphqlFetcher<Pick<QueryRoot, 'collection'>>(
      GET_RECOMMENDED,
      {},
      {
        tags: ['recommended'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => ({
    ...data.collection,
    products: data.collection?.products.edges.map(edge => edge.node) ?? [],
  }),
});
