/**
 * GraphQL fetcher для використання з Tanstack Query
 * Використовує Shopify Storefront API
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
  throw new Error('Missing required Shopify environment variables');
}

const GRAPHQL_ENDPOINT = `${SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

export interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Fetch функція для GraphQL запитів
 * Використовується з Tanstack Query
 */
export async function graphqlFetcher<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables?: TVariables,
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
