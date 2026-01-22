import { CONTENT_BLOCK_FIELDS_FRAGMENT } from '@/shared/queries/fragments';

export const GET_CATEGORY = `
  query GetCategory($handle: String!) {
    metaobject(handle: { type: "category", handle: $handle }) {
      id
      handle
      fields {
        key
        value
        type
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
        references(first: 20) {
          edges {
            node {
              ... on Collection {
                id
                handle
                title
                description
                image {
                  url
                  altText
                }
              }
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
