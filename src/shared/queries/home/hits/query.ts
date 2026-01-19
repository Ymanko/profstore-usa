export const GET_SALE_HITS = `
  query GetSaleHits {
    collection(handle: "sale-hits") {
      id
      handle
      title
      products(first: 8) {
        edges {
          node {
            id
            handle
            title
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
            availableForSale
            featuredImage {
              url
              altText
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
    }
  }
`;
