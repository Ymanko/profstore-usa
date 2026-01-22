export const GET_NEWS = `
  query GetNews($handle: String!, $first: Int = 10, $query: String) {
    blog(handle: $handle) {
      id
      handle
      title
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true, query: $query) {
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
