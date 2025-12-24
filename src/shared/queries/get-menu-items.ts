import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

const GET_MENU_ITEMS = `
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        type

        items {
          id
          title
          url
          type

          items {
            id
            title
            url
            type
          }
        }
      }
    }
  }
`;

export const getMenuItemsQueryOptions = queryOptions({
  queryKey: ['menu-items', { handle: 'main-menu' }],
  queryFn: () => {
    return serverGraphqlFetcher<Pick<QueryRoot, 'menu'>>(
      GET_MENU_ITEMS,
      { handle: 'main-menu' },
      {
        tags: ['menu-items'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_MINUTE,
  select: data => data.menu?.items ?? [],
});
