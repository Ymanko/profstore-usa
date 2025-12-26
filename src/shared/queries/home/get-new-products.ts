import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

const GET_NEW_PRODUCTS = `
  query GetNewProducts {
    shop {
      newProductsCount: metafield(namespace: "custom", key: "new_products_count") {
        value
      }
    }
    products(first: 30, sortKey: CREATED_AT, reverse: true) {
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
`;

type NewProductsResponse = {
  shop: {
    newProductsCount: {
      value: string;
    } | null;
  };
  products: QueryRoot['products'];
};

export const getNewProductsQueryOptions = queryOptions({
  queryKey: ['new-products'],
  queryFn: async () => {
    const data = await serverGraphqlFetcher<NewProductsResponse>(
      GET_NEW_PRODUCTS,
      {},
      {
        tags: ['new-products'],
      },
    );

    const count = data.shop?.newProductsCount?.value ? parseInt(data.shop.newProductsCount.value, 10) : 8;

    return {
      edges: data.products?.edges?.slice(0, count) ?? [],
    };
  },
  staleTime: STALE_TIME.ONE_HOUR,
});
