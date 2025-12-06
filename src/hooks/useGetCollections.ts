import { useQuery } from '@apollo/client/react';
import { GetCollectionsData } from '@/components/layout/Header/MiddleNav/middleNav.types';
import { GET_COLLECTIONS } from '@/queries/getCollections';
import { flattenEdges } from '@/utils/flattenEdges';

export const useGetCollections = () => {
  const {
    loading: loadingCollections,
    error: errorCollections,
    data: dataCollections,
  } = useQuery<GetCollectionsData>(GET_COLLECTIONS);

  const collections = flattenEdges(dataCollections?.collections).map((item) => {
    return {
      ...item,
      products: flattenEdges(item.products),
    };
  });

  return {
    loadingCollections,
    errorCollections,
    collections,
  };
};
