import { gql } from '@apollo/client';

export const GET_MENU_ITEMS = gql`
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
