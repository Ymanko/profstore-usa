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
          }
        }
      }
    }
  }
`;
