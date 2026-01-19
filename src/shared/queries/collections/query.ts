import { CONTENT_BLOCK_FIELDS_FRAGMENT } from '@/shared/queries/fragments';

export const GET_POPULAR_COLLECTION_PRODUCTS = `
  query GetPopularCollectionProducts($handle: String!, $first: Int = 6) {
    collection(handle: $handle) {
      id
      handle
      products(
        first: $first
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
            featuredImage {
              url
              altText
              width
              height
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
  }
`;

export const GET_SUBCATEGORY_PRODUCTS = `
  query GetSubcategoryProducts(
    $handle: String!
    $first: Int = 24
    $after: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT
    $reverse: Boolean = false
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      content: metafield(namespace: "custom", key: "content") {
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
      image {
        url
        altText
      }
      products(
        first: $first
        after: $after
        filters: $filters
        sortKey: $sortKey
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        edges {
          cursor
          node {
            id
            handle
            title
            availableForSale
            productType
            vendor
            tags
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
            featuredImage {
              url
              altText
              width
              height
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
