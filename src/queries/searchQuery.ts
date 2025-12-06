import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  query Search($query: String!) {
    products(first: 10, query: $query) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
    collections(first: 5, query: $query) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;
