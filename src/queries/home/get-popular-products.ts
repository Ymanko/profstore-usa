import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const GET_POPULAR_PRODUCTS = `
  query GetPopularProducts {
    collection(handle: "popular") {
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
            featuredImage {
              url
              altText
            }
            metafields(identifiers: [
              {namespace: "custom", key: "short_description"},
              {namespace: "custom", key: "custom_product_image"}
            ]) {
              namespace
              key
              value
              type
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
  select: data => ({
    ...data.collection,
    products: data.collection?.products?.edges ?? [],
  }),
});
