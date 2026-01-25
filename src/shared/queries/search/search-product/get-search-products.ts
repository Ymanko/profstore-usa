import { infiniteQueryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { SEARCH_PRODUCTS_QUERY } from '@/shared/queries/search/search-product/query';

import type { SearchProductsParams, SearchProductsResponse } from '@/shared/queries/search/search-product/types';

export const getSearchProductsInfiniteQueryOptions = (params: SearchProductsParams) => {
  const { query, first = 12, collectionHandles, inDescription } = params;
  const searchQuery = buildSearchQuery(params);

  // Serialize collectionHandles for stable queryKey comparison
  // Use '__empty__' when array is empty (category selected but no subcategories)
  const collectionHandlesKey =
    collectionHandles === undefined ? '__global__' : collectionHandles.length === 0 ? '__empty__' : collectionHandles.join(',');

  return infiniteQueryOptions({
    queryKey: ['search-products', query, first, collectionHandlesKey, inDescription, searchQuery],
    queryFn: async ({ pageParam }) => {
      // If collectionHandles is empty array, return empty results
      // This happens when category is selected but has no subcategories
      if (collectionHandles !== undefined && collectionHandles.length === 0) {
        return {
          products: {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          },
        };
      }

      return await serverGraphqlFetcher<SearchProductsResponse>(
        SEARCH_PRODUCTS_QUERY,
        { query: searchQuery || '*', first, after: pageParam },
        { cache: 'no-store' },
      );
    },
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => {
      if (lastPage.products.pageInfo.hasNextPage) {
        return lastPage.products.pageInfo.endCursor;
      }
      return undefined;
    },
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
};

function buildSearchQuery(params: SearchProductsParams): string {
  const { query, collectionHandles } = params;

  const parts: string[] = [];

  // Text search
  if (query) {
    parts.push(query);
  }

  // Collection filter
  // If collectionHandles is undefined - no filter (global search)
  // If collectionHandles has items - filter by those collections
  if (collectionHandles !== undefined && collectionHandles.length > 0) {
    if (collectionHandles.length === 1) {
      parts.push(`collection:"${collectionHandles[0]}"`);
    } else {
      const collectionFilters = collectionHandles.map(h => `collection:"${h}"`).join(' OR ');
      parts.push(`(${collectionFilters})`);
    }
  }

  return parts.join(' AND ');
}
