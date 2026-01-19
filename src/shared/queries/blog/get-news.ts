import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_NEWS } from '@/shared/queries/blog/query';

import type { NewsData } from '@/shared/queries/blog/types';

export const getNewsQueryOptions = (params: { handle: string; first?: number; tag?: string }) =>
  queryOptions({
    queryKey: ['blog', params.handle, 'articles', { first: params.first, tag: params.tag }],
    queryFn: async () => {
      const query = params.tag ? `tag:${params.tag}` : undefined;

      return serverGraphqlFetcher<NewsData>(
        GET_NEWS,
        { handle: params.handle, first: params.first ?? 10, query },
        { tags: ['blog', params.handle] },
      );
    },
    select: data => data.blog?.articles.edges.map(edge => edge.node) ?? [],
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
