export const GET_GLOBAL_BENEFITS = `
  query GetGlobalBenefits {
    metaobjects(type: "global_benefits", first: 1) {
      edges {
        node {
          handle
          fields {
            key
            value
            reference {
              ... on Product {
                id
                handle
              }
            }
          }
        }
      }
    }
  }
`;
