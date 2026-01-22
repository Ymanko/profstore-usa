export const GET_CATEGORIES = `
  query GetCategories {
    metaobjects(type: "category", first: 20) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
            references(first: 10) {
              edges {
                node {
                  ... on Collection {
                    id
                    handle
                    title
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
  }
`;
