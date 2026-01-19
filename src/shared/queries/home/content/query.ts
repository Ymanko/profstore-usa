export const GET_HOME_PAGE_CONTENT = `
  query GetHomePageContent {
    metaobject(handle: {type: "home_page", handle: "home"}) {
      fields {
        key
        value
        reference {
          ... on Metaobject {
            id
            type
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
            }
          }
        }
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                id
                type
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
                }
              }
            }
          }
        }
      }
    }
  }
`;
