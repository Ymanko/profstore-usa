export interface SearchProductsParams {
  query: string;
  first?: number;
  collectionHandles?: string[];
  inDescription?: boolean;
}

export interface SearchProductNode {
  id: string;
  handle: string;
  title: string;
  productType: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  collections: {
    edges: Array<{
      node: {
        handle: string;
        metafield: {
          reference: {
            handle: string;
          } | null;
        } | null;
      };
    }>;
  };
}

export interface SearchProductsResponse {
  products: {
    edges: Array<{
      node: SearchProductNode;
      cursor: string;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  };
}

export interface SearchCollectionProductsResponse {
  collection: {
    id: string;
    products: {
      edges: Array<{
        node: SearchProductNode;
        cursor: string;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
      };
    };
  } | null;
}
