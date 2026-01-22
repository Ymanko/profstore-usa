export const GET_MENU_ITEMS = `
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        type

        items {
          id
          title
          url
          type

          items {
            id
            title
            url
            type
          }
        }
      }
    }
  }
`;
