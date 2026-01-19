import type { BaseProduct } from '@/shared/queries/products/types';
import type { ContentMetaobjectField } from '@/shared/utils/parsers/parse-content-blocks';

export interface PopularCollectionProductsData {
  collection: {
    id: string;
    handle: string;
    products: {
      edges: Array<{
        node: Product;
      }>;
    };
  } | null;
}

export type ProductFilter = {
  available?: boolean;
  price?: { min?: number; max?: number };
  productType?: string;
  productVendor?: string;
  tag?: string;
  variantOption?: { name: string; value: string };
  productMetafield?: { namespace: string; key: string; value: string };
  variantMetafield?: { namespace: string; key: string; value: string };
};

export type SubcategoryProductsParams = {
  handle: string;
  first?: number;
  after?: string | null;
  filters?: ProductFilter[];
  sortKey?: 'BEST_SELLING' | 'COLLECTION_DEFAULT' | 'CREATED' | 'ID' | 'MANUAL' | 'PRICE' | 'RELEVANCE' | 'TITLE';
  reverse?: boolean;
};

export type FilterValue = {
  id: string;
  label: string;
  count: number;
  input: string;
};

export type Filter = {
  id: string;
  label: string;
  type: 'LIST' | 'PRICE_RANGE' | 'BOOLEAN';
  values: FilterValue[];
};

// Product extends BaseProduct with additional catalog-specific fields
export interface Product extends BaseProduct {
  productType: string;
  vendor: string;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        } | null;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
}

export type SubcategoryProductsData = {
  collection: {
    id: string;
    handle: string;
    title: string;
    description: string;
    content?: {
      references?: {
        edges: Array<{
          node: {
            id: string;
            fields?: ContentMetaobjectField[];
          };
        }>;
      } | null;
    } | null;
    image?: {
      url: string;
      altText?: string;
    } | null;
    products: {
      filters: Filter[];
      edges: Array<{
        cursor: string;
        node: Product;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
      };
    };
  } | null;
};
