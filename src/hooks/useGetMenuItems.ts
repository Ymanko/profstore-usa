import { useQuery } from '@apollo/client/react';

import { GET_MENU_ITEMS } from '@/queries/getMenuItems';

import type { GetMenuData } from '@/components/layout/Header/MiddleNav/middleNav.types';

export const useGetMenuItems = () => {
  const {
    loading: loadingCollections,
    error: errorCollections,
    data: dataCollections,
  } = useQuery<GetMenuData>(GET_MENU_ITEMS, {
    variables: { handle: 'main-menu' },
  });

  return {
    loadingCollections,
    errorCollections,
    dataCollections,
  };
};
