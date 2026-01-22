import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_SALE_HITS } from '@/shared/queries/home/hits/query';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

export const getSaleHitsQueryOptions = queryOptions({
  queryKey: ['sale-hits'],
  queryFn: () => {
    return serverGraphqlFetcher<Pick<QueryRoot, 'collection'>>(
      GET_SALE_HITS,
      {},
      {
        tags: ['sale-hits'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => ({
    ...data.collection,
    products: data.collection?.products?.edges ?? [],
  }),
});
