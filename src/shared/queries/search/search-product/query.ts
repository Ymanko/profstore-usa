export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!, $after: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        node {
          id
          handle
          title
          productType
          availableForSale
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
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
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Query for searching within a specific collection
export const SEARCH_COLLECTION_PRODUCTS_QUERY = `
  query SearchCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      products(first: $first, after: $after) {
        edges {
          node {
            id
            handle
            title
            productType
            availableForSale
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
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
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
