'use server';

import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { WishlistGetData, WishlistProduct } from '@/shared/queries/wishlist/types';

const GET_PRODUCTS_COLLECTIONS = `
  query GetProductsCollections($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        handle
        collections(first: 1) {
          edges {
            node {
              handle
              metafield(namespace: "custom", key: "parent_category") {
                reference {
                  ... on Metaobject {
                    handle
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

interface ProductCollection {
  id: string;
  handle: string;
  collections: {
    edges: Array<{
      node: {
        handle: string;
        metafield?: {
          reference?: {
            handle?: string;
          } | null;
        } | null;
      };
    }>;
  };
}

interface ProductsCollectionsResponse {
  nodes: (ProductCollection | null)[];
}

export interface WishlistProductWithUrl extends WishlistProduct {
  productUrl: string;
}

export interface WishlistWithUrlsData {
  total_records: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  result: WishlistProductWithUrl[];
}

async function fetchWishlistData(customerId: number): Promise<WishlistGetData> {
  const url = `${process.env.WISHLIST_API_URL}/fetchWishlistData/${customerId}`;
  const options = {
    method: 'GET',
    headers: {
      xtoken: process.env.NEXT_PUBLIC_WISHLIST_APP_TOKEN!,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchProductsCollections(productIds: string[]): Promise<Map<string, string>> {
  if (productIds.length === 0) {
    return new Map();
  }

  const data = await serverGraphqlFetcher<ProductsCollectionsResponse>(GET_PRODUCTS_COLLECTIONS, {
    ids: productIds,
  });

  const result = new Map<string, string>();

  for (const product of data.nodes) {
    if (!product) continue;

    const collection = product.collections.edges[0]?.node;
    const categoryHandle = collection?.metafield?.reference?.handle;
    const subcategoryHandle = collection?.handle;

    if (categoryHandle && subcategoryHandle) {
      result.set(product.id, `/${categoryHandle}/${subcategoryHandle}/${product.handle}`);
    } else {
      result.set(product.id, `/products/${product.handle}`);
    }
  }

  return result;
}

export async function getWishlistWithUrls(customerId: number): Promise<WishlistWithUrlsData> {
  try {
    // Fetch wishlist data from iWish
    const wishlistData = await fetchWishlistData(customerId);

    if (wishlistData.result.length === 0) {
      return wishlistData as WishlistWithUrlsData;
    }

    // Convert numeric IDs to Shopify global IDs
    const globalIds = wishlistData.result.map(item => `gid://shopify/Product/${item.id}`);

    // Fetch collections from Shopify in parallel
    const urlsMap = await fetchProductsCollections(globalIds);

    // Merge URLs into wishlist items
    const resultWithUrls: WishlistProductWithUrl[] = wishlistData.result.map(item => {
      const globalId = `gid://shopify/Product/${item.id}`;
      const productUrl = urlsMap.get(globalId) || `/products/${item.handle}`;

      return {
        ...item,
        productUrl,
      };
    });

    return {
      ...wishlistData,
      result: resultWithUrls,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch wishlist with URLs:', error);
    return {
      total_records: 0,
      current_page: 1,
      prev_page: 0,
      next_page: 0,
      result: [],
    };
  }
}
