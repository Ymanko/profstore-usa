import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const GET_RECOMMENDED = `
  query GetRecommended {
    collection(handle: "recommended") {
      id
      handle
      title
      products(first: 8) {
        edges {
          node {
            id
            handle
            title
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            availableForSale
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

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
