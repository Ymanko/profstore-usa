// Collection fields with parent category for building product URL
export const PRODUCT_COLLECTION_FRAGMENT = `
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
`;

// Base product fields for cards
export const BASE_PRODUCT_FIELDS = `
  id
  handle
  title
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
`;

// Product fields with collection info for proper URL building
export const PRODUCT_CARD_FIELDS = `
  ${BASE_PRODUCT_FIELDS}
  ${PRODUCT_COLLECTION_FRAGMENT}
`;

// Content block fields fragment
export const CONTENT_BLOCK_FIELDS_FRAGMENT = `
  id
  fields {
    key
    value
    type
    reference {
      ... on MediaImage {
        image {
          url
          altText
          width
          height
        }
      }
      ... on Video {
        sources {
          url
          mimeType
        }
      }
    }
    references(first: 20) {
      edges {
        node {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;
