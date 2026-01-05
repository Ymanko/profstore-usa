import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import {
  parseContentBlocks,
  CONTENT_BLOCK_FIELDS_FRAGMENT,
  type ContentMetaobjectField,
} from '@/shared/utils/parsers/parse-content-blocks';

export const GET_SUBCATEGORY_PRODUCTS = `
  query GetSubcategoryProducts(
    $handle: String!
    $first: Int = 24
    $after: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT
    $reverse: Boolean = false
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      content: metafield(namespace: "custom", key: "content") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                ${CONTENT_BLOCK_FIELDS_FRAGMENT}
              }
            }
          }
        }
      }
      image {
        url
        altText
      }
      products(
        first: $first
        after: $after
        filters: $filters
        sortKey: $sortKey
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        edges {
          cursor
          node {
            id
            handle
            title
            availableForSale
            productType
            vendor
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

type ProductFilter = {
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

export type Product = {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
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
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
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
};

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

export const getSubcategoryProductsQueryOptions = (params: SubcategoryProductsParams) =>
  queryOptions({
    queryKey: ['subcategory', params.handle, 'products', params],
    queryFn: () => {
      return serverGraphqlFetcher<SubcategoryProductsData>(GET_SUBCATEGORY_PRODUCTS, params, {
        tags: ['collection', params.handle],
      });
    },
    staleTime: STALE_TIME.ONE_MINUTE,
  });

export const getSubcategoryProductsInfiniteQueryOptions = (params: {
  handle: string;
  sortKey: SubcategoryProductsParams['sortKey'];
  reverse: boolean;
  productsPerPage: number;
  filters: SubcategoryProductsParams['filters'];
}) =>
  infiniteQueryOptions({
    queryKey: [
      'subcategory',
      params.handle,
      'products',
      {
        sortKey: params.sortKey,
        reverse: params.reverse,
        productsPerPage: params.productsPerPage,
        filters: params.filters,
      },
    ],
    queryFn: async ({ pageParam }) => {
      return serverGraphqlFetcher<SubcategoryProductsData>(
        GET_SUBCATEGORY_PRODUCTS,
        {
          handle: params.handle,
          first: params.productsPerPage,
          after: (pageParam as string | null) ?? null,
          sortKey: params.sortKey,
          reverse: params.reverse,
          filters: params.filters,
        },
        {
          tags: ['collection', params.handle],
        },
      );
    },
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => {
      const pageInfo = lastPage.collection?.products.pageInfo;
      return pageInfo?.hasNextPage ? pageInfo.endCursor : null;
    },
    select: data => ({
      ...data,
      pages: data.pages.map(page => ({
        ...page,
        collection: page.collection
          ? {
              ...page.collection,
              content: parseContentBlocks(page.collection.content?.references),
            }
          : null,
      })),
    }),
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
