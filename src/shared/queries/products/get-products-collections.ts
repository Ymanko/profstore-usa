import { graphqlFetcher } from '@/shared/lib/graphql/graphql-fetcher';

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

export interface ProductUrlData {
  categoryHandle: string | null;
  subcategoryHandle: string | null;
}

export async function getProductsCollections(productIds: string[]): Promise<Map<string, ProductUrlData>> {
  if (productIds.length === 0) {
    return new Map();
  }

  const data = await graphqlFetcher<ProductsCollectionsResponse>(GET_PRODUCTS_COLLECTIONS, {
    ids: productIds,
  });

  const result = new Map<string, ProductUrlData>();

  for (const product of data.nodes) {
    if (!product) continue;

    const collection = product.collections.edges[0]?.node;
    const categoryHandle = collection?.metafield?.reference?.handle ?? null;
    const subcategoryHandle = collection?.handle ?? null;

    result.set(product.id, {
      categoryHandle,
      subcategoryHandle,
    });
  }

  return result;
}

export function buildProductUrl(
  productHandle: string,
  urlData: ProductUrlData | undefined,
  fallback = '/products',
): string {
  if (urlData?.categoryHandle && urlData?.subcategoryHandle) {
    return `/${urlData.categoryHandle}/${urlData.subcategoryHandle}/${productHandle}`;
  }
  return `${fallback}/${productHandle}`;
}
