/**
 * Server-side GraphQL fetchers для використання в Server Components
 * Ці функції можна викликати тільки на сервері (без 'use client')
 */

import type { Product, QueryRoot } from './graphql';

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
  throw new Error('Missing required Shopify environment variables');
}

const GRAPHQL_ENDPOINT = `${SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Server-side GraphQL fetcher
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param options - Fetch options (cache, revalidate, etc.)
 */
async function serverGraphqlFetcher<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  options?: {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
  },
): Promise<TData> {
  if (!STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: options?.cache,
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const json: GraphQLResponse<TData> = await response.json();

  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  if (!json.data) {
    throw new Error('No data returned from GraphQL query');
  }

  return json.data;
}

// GraphQL queries
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

// Response types
type GetProductsResponse = Pick<QueryRoot, 'products'>;
type GetProductByHandleResponse = Pick<QueryRoot, 'productByHandle'>;

/**
 * Отримати список продуктів на сервері
 *
 * @example
 * ```tsx
 * // Server Component
 * export default async function ProductsPage() {
 *   const data = await getServerProducts({ first: 10 });
 *   return <ProductsList products={data.products} />;
 * }
 * ```
 */
export async function getServerProducts(
  variables: { first: number },
  options?: {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
  },
) {
  return serverGraphqlFetcher<GetProductsResponse, typeof variables>(GET_PRODUCTS_QUERY, variables, options);
}

/**
 * Отримати продукт за handle на сервері
 *
 * @example
 * ```tsx
 * // Server Component
 * export default async function ProductPage({ params }: { params: { handle: string } }) {
 *   const data = await getServerProductByHandle({ handle: params.handle });
 *   return <ProductDetail product={data.productByHandle} />;
 * }
 * ```
 */
export async function getServerProductByHandle(
  variables: { handle: string },
  options?: {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
  },
) {
  return serverGraphqlFetcher<GetProductByHandleResponse, typeof variables>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    variables,
    options,
  );
}

// Експортуємо тип Product
export type { Product };
