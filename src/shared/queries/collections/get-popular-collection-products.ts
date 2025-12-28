import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { Product } from '@/shared/queries/collections/get-subcategory-products';

export const GET_POPULAR_COLLECTION_PRODUCTS = `
  query GetPopularCollectionProducts($handle: String!, $first: Int = 6) {
    collection(handle: $handle) {
      id
      handle
      products(
        first: $first
        sortKey: BEST_SELLING
      ) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            productType
            vendor
            tags
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
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
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

export interface PopularCollectionProductsData {
  collection: {
    id: string;
    handle: string;
    products: {
      edges: Array<{
        node: Product;
      }>;
    };
  } | null;
}

export const getPopularCollectionProductsQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['collection', handle, 'popular-products'],
    queryFn: async () => {
      return serverGraphqlFetcher<PopularCollectionProductsData>(
        GET_POPULAR_COLLECTION_PRODUCTS,
        { handle, first: 6 },
        { tags: ['collection', handle, 'popular'] },
      );
    },
    select: data => data.collection?.products.edges.map(edge => edge.node) ?? [],
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
