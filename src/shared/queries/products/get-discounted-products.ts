import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { Product } from '@/shared/queries/collections/get-subcategory-products';

export const GET_DISCOUNTED_PRODUCTS = `
  query GetDiscountedProducts($first: Int = 10) {
    products(
      first: $first
      query: "variants.compareAtPrice:>0"
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
`;

export interface DiscountedProductsData {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export const getDiscountedProductsQueryOptions = queryOptions({
  queryKey: ['discounted-products'],
  queryFn: async () => {
    return serverGraphqlFetcher<DiscountedProductsData>(
      GET_DISCOUNTED_PRODUCTS,
      { first: 20 },
      { tags: ['products', 'discounted'] },
    );
  },
  staleTime: STALE_TIME.FIVE_MINUTES,
  select: data =>
    data.products.edges
      .map(edge => edge.node)
      .filter(product => {
        const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
        return !(!compareAtPrice || parseFloat(compareAtPrice) === 0);
      }),
});
