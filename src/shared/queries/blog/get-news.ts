import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

export const GET_NEWS = `
  query GetNews($handle: String!, $first: Int = 10) {
    blog(handle: $handle) {
      id
      handle
      title
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerpt
            excerptHtml
            content
            contentHtml
            image {
              url
              altText
              width
              height
            }
            publishedAt
            author {
              name
            }
            tags
          }
        }
      }
    }
  }
`;

export type Article = {
  id: string;
  title: string;
  handle: string;
  excerpt?: string | null;
  excerptHtml?: string | null;
  content: string;
  contentHtml: string;
  image?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  publishedAt: string;
  author?: {
    name: string;
  } | null;
  tags: string[];
};

export interface NewsData {
  blog: {
    id: string;
    handle: string;
    title: string;
    articles: {
      edges: Array<{
        node: Article;
      }>;
    };
  } | null;
}

export const getNewsQueryOptions = (params: { handle: string; first?: number }) =>
  queryOptions({
    queryKey: ['blog', params.handle, 'articles', { first: params.first }],
    queryFn: async () => {
      return serverGraphqlFetcher<NewsData>(
        GET_NEWS,
        { handle: params.handle, first: params.first ?? 10 },
        { tags: ['blog', params.handle] },
      );
    },
    select: data => data.blog?.articles.edges.map(edge => edge.node) ?? [],
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
