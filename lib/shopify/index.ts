import { SHOPIFY_GRAPHQL_API_ENDPOINT } from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
export * from './shopifyFetch'; // якщо є функції для client
export * from './server'; // експортуєш всі серверні функції, включно з getPage 

/**
 * Обовʼязкові змінні середовища:
 * - NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
 * - SHOPIFY_STOREFRONT_ACCESS_TOKEN
 */
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, 'https://')
  : '';

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

/**
 * Запит до Shopify Storefront API
 */
export async function shopifyFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T }> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({ query, variables })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return { status: result.status, body };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw { error: e, query };
  }
}

/**
 * Утиліта для перетворення edges -> nodes
 */
export function removeEdgesAndNodes<T>(array: { edges: { node: T }[] }): T[] {
  return array.edges.map(({ node }) => node);
}
