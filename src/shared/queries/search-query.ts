import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { graphqlFetcher } from '@/shared/lib/graphql/graphql-fetcher';
import { flattenEdges } from '@/shared/utils/flatten-edges';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

const SEARCH_QUERY = `
  query Search($query: String!) {
    products(first: 3, query: $query) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
    collections(first: 5, query: $query) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export const searchQueryOptions = (searchQuery: string) =>
  queryOptions({
    queryKey: ['search', { query: searchQuery }],
    queryFn: () => {
      return graphqlFetcher<Pick<QueryRoot, 'products' | 'collections'>>(SEARCH_QUERY, { query: searchQuery });
    },
    staleTime: STALE_TIME.ONE_MINUTE,
    enabled: Boolean(searchQuery),
    select: data => ({
      products: flattenEdges(data.products),
      collections: flattenEdges(data.collections),
    }),
  });
