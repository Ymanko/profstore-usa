import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

const GET_PRODUCT_COLLECTIONS = `
  query GetProductCollections {
    shop {
      newProductsCount: metafield(namespace: "custom", key: "new_products_count") {
        value
      }
    }
    recommended: collection(handle: "recommended") {
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
          }
        }
      }
    }
    new: products(first: 30, sortKey: CREATED_AT, reverse: true) {
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
        }
      }
    }
    
    saleHits: collection(handle: "sale-hits") {
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
          }
        }
      }
    }
  }
`;

type ProductCollectionsResponse = {
  shop: {
    newProductsCount: {
      value: string;
    } | null;
  };
  recommended: QueryRoot['collection'];
  new: QueryRoot['products'];
  saleHits: QueryRoot['collection'];
};

export const getProductCollectionsQueryOptions = queryOptions({
  queryKey: ['product-collections'],
  queryFn: () => {
    return serverGraphqlFetcher<ProductCollectionsResponse>(
      GET_PRODUCT_COLLECTIONS,
      {},
      {
        tags: ['product-collections'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => {
    const newProductsCount = data.shop?.newProductsCount?.value ? parseInt(data.shop.newProductsCount.value, 10) : 8;

    return {
      recommended: data.recommended,
      new: {
        edges: data.new?.edges?.slice(0, newProductsCount) ?? [],
      },
      saleHits: data.saleHits,
    };
  },
});
