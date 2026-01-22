import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_SUBCATEGORY_PRODUCTS } from '@/shared/queries/collections/query';
import { parseContentBlocks } from '@/shared/utils/parsers/parse-content-blocks';

import type { SubcategoryProductsData, SubcategoryProductsParams } from '@/shared/queries/collections/types';

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
