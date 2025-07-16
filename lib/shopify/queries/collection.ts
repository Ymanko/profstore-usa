import { gql } from 'graphql-request'

export const getCollectionsQuery = gql`
  query getCollections {
    collections(first: 250) {
      edges {
        node {
          id
          handle
          title
          description
          updatedAt
          seo {
            title
            description
          }
          metafields(identifiers: [{ namespace: "custom", key: "parent" }]) {
            key
            value
            namespace
            type
            reference {
              ... on Collection {
                id
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`


export const getCollectionQuery = gql`
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      updatedAt
      seo {
        title
        description
      }
      metafield(namespace: "custom", key: "parent") {
        namespace
        key
        value
        type
        reference {
          ... on Collection {
            id
            handle
            title
          }
        }
      }
    }
  }
`

export const getCollectionProductsQuery = gql`
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(first: 250, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            handle
            availableForSale
            title
            description
            descriptionHtml
            options {
              id
              name
              values
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
            images(first: 20) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            seo {
              title
              description
            }
            tags
            updatedAt
          }
        }
      }
    }
  }
`