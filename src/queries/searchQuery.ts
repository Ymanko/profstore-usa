import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  query Search($query: String!) {
    products(first: 3, query: $query) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
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
