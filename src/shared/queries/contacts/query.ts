export const GET_STORE_CONTACT = `
  query getStoreContact($handle: String!) {
    metaobject(handle: { type: "store_contact", handle: $handle }) {
      fields {
        key
        value
      }
    }
  }
`;
