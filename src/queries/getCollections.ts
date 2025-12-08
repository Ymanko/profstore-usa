import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 5) {
      edges {
        node {
          id
          handle
          title
          products(first: 3) {
            edges {
              node {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;
