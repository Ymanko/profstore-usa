import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { graphqlFetcher } from '@/shared/lib/graphql/graphql-fetcher';
import { SEARCH_QUERY } from '@/shared/queries/search/search-query/query';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

export const searchQueryOptions = (searchQuery: string) =>
  queryOptions({
    queryKey: ['search', { query: searchQuery }],
    queryFn: () => graphqlFetcher<Pick<QueryRoot, 'products' | 'collections'>>(SEARCH_QUERY, { query: searchQuery }),
    staleTime: STALE_TIME.ONE_MINUTE,
    enabled: Boolean(searchQuery),
    select: data => ({
      products: data.products.edges?.map(edge => edge.node) ?? [],
      collections: data.collections.edges?.map(edge => edge.node) ?? [],
    }),
  });
