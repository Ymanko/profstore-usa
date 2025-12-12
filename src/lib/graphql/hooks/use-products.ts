'use client';

import { useQuery } from '@tanstack/react-query';

import { graphqlFetcher } from '@/lib/graphql/client';

import type { Product, QueryRoot } from '@/lib/graphql/graphql';

// GraphQL query для отримання продуктів
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
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
  }
`;

// GraphQL query для отримання продукту за handle
const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

// Типи для response
type GetProductsResponse = Pick<QueryRoot, 'products'>;
type GetProductByHandleResponse = Pick<QueryRoot, 'productByHandle'>;

/**
 * Hook для отримання списку продуктів
 * Використовує Tanstack Query + GraphQL Codegen
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useProducts({ first: 10 });
 * const products = data?.products?.edges.map(edge => edge.node) || [];
 * ```
 */
export function useProducts(variables: { first: number }) {
  return useQuery({
    queryKey: ['products', variables],
    queryFn: () => graphqlFetcher<GetProductsResponse, typeof variables>(GET_PRODUCTS_QUERY, variables),
  });
}

/**
 * Hook для отримання продукту за handle
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useProductByHandle({ handle: 'my-product' });
 * const product = data?.productByHandle;
 * ```
 */
export function useProductByHandle(variables: { handle: string }) {
  return useQuery({
    queryKey: ['product', variables.handle, variables],
    queryFn: () => graphqlFetcher<GetProductByHandleResponse, typeof variables>(GET_PRODUCT_BY_HANDLE_QUERY, variables),
    enabled: !!variables.handle, // Запит виконується тільки якщо є handle
  });
}

// Експортуємо тип Product для використання в компонентах
export type { Product };
