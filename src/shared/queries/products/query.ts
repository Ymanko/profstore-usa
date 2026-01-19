import { CONTENT_BLOCK_FIELDS_FRAGMENT } from '@/shared/utils/parsers/parse-content-blocks';

export const GET_DISCOUNTED_PRODUCTS = `
  query GetDiscountedProducts($first: Int = 10) {
    products(
      first: $first
      query: "variants.compareAtPrice:>0"
      sortKey: BEST_SELLING
    ) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          productType
          vendor
          tags
          featuredImage {
            url
            altText
            width
            height
          }
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
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      productType
      vendor
      tags

      seo {
        title
        description
      }

      featuredImage {
        url
        altText
        width
        height
      }

      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }

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

      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }

      variants(first: 100) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
      }

      options {
        id
        name
        values
      }

      # Metafields
      fullDescription: metafield(namespace: "custom", key: "full_decription") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                ${CONTENT_BLOCK_FIELDS_FRAGMENT}
              }
            }
          }
        }
      }

      videos: metafield(namespace: "custom", key: "video") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                handle
                type
                fields {
                  key
                  value
                  reference {
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
          }
        }
      }

      characteristics: metafield(namespace: "custom", key: "haracteristics") {
        references(first: 50) {
          edges {
            node {
              ... on Metaobject {
                handle
                type
                fields {
                  key
                  value
                }
              }
            }
          }
        }
      }

      files: metafield(namespace: "custom", key: "files") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                handle
                type
                fields {
                  key
                  value
                  reference {
                    ... on GenericFile {
                      url
                      originalFileSize
                      mimeType
                    }
                  }
                }
              }
            }
          }
        }
      }

      manufacturer: metafield(namespace: "custom", key: "manufacturer") {
        value
      }

      brandLogo: metafield(namespace: "custom", key: "brand_logo") {
        reference {
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

export const GET_PRODUCT_RECOMMENDATIONS = `
  query GetProductRecommendations($productId: ID!, $intent: ProductRecommendationIntent) {
    productRecommendations(productId: $productId, intent: $intent) {
      id
      handle
      title
      availableForSale
      featuredImage {
        url
        altText
        width
        height
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
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
