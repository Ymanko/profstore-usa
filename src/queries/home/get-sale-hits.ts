import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const GET_SALE_HITS = `
  query GetSaleHits {
    collection(handle: "sale-hits") {
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
