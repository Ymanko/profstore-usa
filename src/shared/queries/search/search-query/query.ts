export const SEARCH_QUERY = `
  query Search($query: String!) {
    products(first: 5, query: $query) {
      edges {
        node {
          id
          title
          handle
          availableForSale
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
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          collections(first: 1) {
            edges {
              node {
                handle
                metafield(namespace: "custom", key: "parent_category") {
                  reference {
                    ... on Metaobject {
                      handle
                    }
                  }
                }
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
          metafield(namespace: "custom", key: "parent_category") {
            reference {
              ... on Metaobject {
                handle
              }
            }
          }
        }
      }
    }
  }
`;
