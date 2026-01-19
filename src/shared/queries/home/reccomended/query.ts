export const GET_RECOMMENDED = `
  query GetRecommended {
    collection(handle: "recommended") {
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
          }
        }
      }
    }
  }
`;
