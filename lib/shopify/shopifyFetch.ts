const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables = {} }: { query: string, variables?: any }) {
  const response = await fetch(`https://${domain}/api/2023-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken as string
    },
    body: JSON.stringify({ query, variables })
  });

  const body = await response.json();

  if (body.errors) {
    console.error('Shopify GraphQL errors:', body.errors);
    throw new Error('Failed to fetch from Shopify');
  }

  return { status: response.status, body };
}