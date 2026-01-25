import { CONTENT_BLOCK_FIELDS_FRAGMENT } from '@/shared/queries/fragments';

export const GET_PAGE = `
  query GetPage($handle: String!) {
    page(handle: $handle) {
      id
      title
      handle
      seo {
        title
        description
      }
      content: metafield(namespace: "custom", key: "description") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                ${CONTENT_BLOCK_FIELDS_FRAGMENT}
              }
            }
          }
        }
      }
    }
  }
`;
