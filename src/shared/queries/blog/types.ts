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
