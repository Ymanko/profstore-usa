export const GET_POPULAR_PRODUCTS = `
  query GetPopularProducts {
    collection(handle: "popular") {
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
            metafields(identifiers: [
              {namespace: "custom", key: "short_description"},
              {namespace: "custom", key: "custom_product_image"}
            ]) {
              namespace
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
            }
          }
        }
      }
    }
  }
`;
