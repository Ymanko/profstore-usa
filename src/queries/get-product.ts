import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
        width
        height
      }
    }
  }
`;

export const getProductQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['product', handle],
    queryFn: () => {
      return serverGraphqlFetcher<Pick<QueryRoot, 'product'>>(
        GET_PRODUCT,
        { handle },
        {
          tags: ['catalog-products'],
        },
      );
    },
    staleTime: STALE_TIME.ONE_MINUTE,
    select: data => data.product,
  });
