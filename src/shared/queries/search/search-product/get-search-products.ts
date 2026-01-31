import { infiniteQueryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import {
  SEARCH_COLLECTION_PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from '@/shared/queries/search/search-product/query';

import type {
  SearchCollectionProductsResponse,
  SearchProductNode,
  SearchProductsParams,
  SearchProductsResponse,
} from '@/shared/queries/search/search-product/types';

interface NormalizedResponse {
  products: {
    edges: Array<{ node: SearchProductNode; cursor: string }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  };
}

export const getSearchProductsInfiniteQueryOptions = (params: SearchProductsParams) => {
  const { query, first = 12, collectionHandles, inDescription } = params;

  // Determine search mode
  // - Single collection handle: search within that collection
  // - Multiple handles: search globally and filter client-side
  // - No handles: global search
  const singleCollectionHandle =
    collectionHandles?.length === 1 ? collectionHandles[0] : undefined;

  // Serialize collectionHandles for stable queryKey comparison
  const collectionHandlesKey =
    collectionHandles === undefined
      ? '__global__'
      : collectionHandles.length === 0
        ? '__empty__'
        : collectionHandles.join(',');

  return infiniteQueryOptions({
    queryKey: [
      'search-products',
      query,
      first,
      collectionHandlesKey,
      inDescription,
      singleCollectionHandle,
    ],
    queryFn: async ({ pageParam }): Promise<NormalizedResponse> => {
      // If collectionHandles is empty array, return empty results
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

      // Single collection - if no search query, get all products from collection
      // If there's a search query, use global search and filter by collection
      if (singleCollectionHandle) {
        if (!query) {
          // No search query - just get all products from collection
          const response = await serverGraphqlFetcher<SearchCollectionProductsResponse>(
            SEARCH_COLLECTION_PRODUCTS_QUERY,
            {
              handle: singleCollectionHandle,
              first,
              after: pageParam,
            },
            { cache: 'no-store' },
          );

          if (!response.collection) {
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

          return {
            products: {
              edges: response.collection.products.edges,
              pageInfo: response.collection.products.pageInfo,
            },
          };
        }

        // Has search query - use global search and filter by collection handle
        const response = await serverGraphqlFetcher<SearchProductsResponse>(
          SEARCH_PRODUCTS_QUERY,
          { query, first: first * 3, after: pageParam }, // Fetch more to account for filtering
          { cache: 'no-store' },
        );

        const filteredEdges = response.products.edges.filter(edge => {
          const productCollections = edge.node.collections.edges;
          return productCollections.some(col => col.node.handle === singleCollectionHandle);
        });

        return {
          products: {
            edges: filteredEdges.slice(0, first),
            pageInfo: response.products.pageInfo,
          },
        };
      }

      // Multiple collections or global search
      let searchQuery = query || '*';

      // For multiple collections, we need to filter results client-side
      // because Shopify's search doesn't support OR logic for collections well
      const response = await serverGraphqlFetcher<SearchProductsResponse>(
        SEARCH_PRODUCTS_QUERY,
        { query: searchQuery, first, after: pageParam },
        { cache: 'no-store' },
      );

      // Filter by collection handles if specified
      if (collectionHandles && collectionHandles.length > 1) {
        const filteredEdges = response.products.edges.filter(edge => {
          const productCollections = edge.node.collections.edges;
          return productCollections.some(col =>
            collectionHandles.includes(col.node.handle),
          );
        });

        return {
          products: {
            edges: filteredEdges,
            pageInfo: response.products.pageInfo,
          },
        };
      }

      return response;
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
