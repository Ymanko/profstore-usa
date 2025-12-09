import { useQuery } from '@apollo/client/react';
import { GetMenuData } from '@/components/layout/Header/MiddleNav/middleNav.types';
import { GET_MENU_ITEMS } from '@/queries/getMenuItems';

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
