import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_MENU_ITEMS } from '@/shared/queries/menu/query';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';

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
