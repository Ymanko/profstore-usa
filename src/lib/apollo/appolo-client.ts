/* eslint-disable no-undef */
'use client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

console.warn(
  'process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN test',
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
);
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`,
});

const authLink = new SetContextLink((prev, context) => ({
  ...context,
  headers: {
    ...prev.headers,
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
  },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
