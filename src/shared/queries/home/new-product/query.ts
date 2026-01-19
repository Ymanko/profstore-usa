export const GET_NEW_PRODUCTS = `
  query GetNewProducts {
    shop {
      newProductsCount: metafield(namespace: "custom", key: "new_products_count") {
        value
      }
    }
    products(first: 30, sortKey: CREATED_AT, reverse: true) {
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
        }
      }
    }
  }
`;

export const GET_NEW_PRODUCTS_SETTINGS = `
  query GetNewProductsSettings {
    shop {
      metafield(namespace: "custom", key: "new_products_count") {
        value
      }
    }
  }
`;
