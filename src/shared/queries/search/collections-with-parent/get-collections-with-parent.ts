import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_COLLECTIONS_WITH_PARENT } from '@/shared/queries/search/collections-with-parent/query';

import type { CollectionsResponse, CollectionWithParent } from '@/shared/queries/search/collections-with-parent/types';

export const getCollectionsWithParentQueryOptions = queryOptions({
  queryKey: ['collections-with-parent'],
  queryFn: () => {
    return serverGraphqlFetcher<CollectionsResponse>(
      GET_COLLECTIONS_WITH_PARENT,
      {},
      {
        tags: ['collections-with-parent'],
      },
    );
  },
  staleTime: STALE_TIME.FIVE_MINUTES,
  select: (data): CollectionWithParent[] => {
    return data.collections.edges.map(({ node }) => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      parentCategoryHandle: node.metafield?.reference?.handle ?? null,
    }));
  },
});
