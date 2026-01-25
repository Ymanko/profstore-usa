import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_PAGE } from '@/shared/queries/pages/query';
import { parseContentBlocks } from '@/shared/utils/parsers/parse-content-blocks';

import type { PageData } from '@/shared/queries/pages/types';
import type { ContentBlock } from '@/shared/utils/parsers/parse-content-blocks';

export interface ParsedPageData {
  id: string;
  title: string;
  handle: string;
  seo: {
    title: string;
    description: string | null;
  };
  contentBlocks: ContentBlock[];
}

export const getPageQueryOptions = (handle: string) => {
  return queryOptions({
    queryKey: ['page', handle],
    queryFn: async () => {
      return serverGraphqlFetcher<PageData>(
        GET_PAGE,
        { handle },
        {
          tags: ['page', handle],
        },
      );
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: (data): ParsedPageData | null => parsePageData(data),
  });
};

export function parsePageData(data: PageData): ParsedPageData | null {
  if (!data.page) {
    return null;
  }

  const { id, title, handle, seo, content } = data.page;

  // Parse content blocks from metafield
  const contentBlocks = parseContentBlocks(content?.references as any);

  return {
    id,
    title,
    handle,
    seo: {
      title: seo?.title || title,
      description: seo?.description || null,
    },
    contentBlocks,
  };
}
