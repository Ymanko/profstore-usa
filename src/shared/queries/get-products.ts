import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const getProductsQueryOptions = queryOptions({
  queryKey: ['products', { first: 50 }],
  queryFn: () => {
    return serverGraphqlFetcher<Pick<QueryRoot, 'products'>, { first: number }>(
      GET_PRODUCTS_QUERY,
      { first: 50 },
      {
        tags: ['catalog-products'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_MINUTE,
  select: data => data.products.edges.map(item => item.node),
});
