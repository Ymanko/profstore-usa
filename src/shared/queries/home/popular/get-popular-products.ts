import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_POPULAR_PRODUCTS } from '@/shared/queries/home/popular/query';
import { parsePopularProductsData } from '@/shared/utils/parsers/parse-popular-products-data';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

export const getPopularProductsQueryOptions = queryOptions({
  queryKey: ['popular-products'],
  queryFn: () => {
    return serverGraphqlFetcher<Pick<QueryRoot, 'collection'>>(
      GET_POPULAR_PRODUCTS,
      {},
      {
        tags: ['popular-products'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => parsePopularProductsData(data?.collection?.products?.edges ?? []),
});
