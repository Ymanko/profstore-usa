import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const GET_CATEGORIES = `
  query GetCategories {
    collections(first: 20, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const getCategoriesQueryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: () => {
    return serverGraphqlFetcher<Pick<QueryRoot, 'collections'>>(
      GET_CATEGORIES,
      {},
      {
        tags: ['categories'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => {
    const excludeHandles = ['popular', 'recommended', 'sale-hits'];
    return data.collections?.edges.filter(edge => !excludeHandles.includes(edge.node.handle)) ?? [];
  },
});
