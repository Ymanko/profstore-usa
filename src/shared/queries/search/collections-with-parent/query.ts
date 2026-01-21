export const GET_COLLECTIONS_WITH_PARENT = `
  query GetCollectionsWithParent {
    collections(first: 100) {
      edges {
        node {
          id
          handle
          title
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
  }
`;
