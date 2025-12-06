import { useQuery } from '@apollo/client/react';
import {
  SearchData,
  SearchResults,
} from '@/components/layout/Header/MiddleNav/middleNav.types';
import { SEARCH_QUERY } from '@/queries/searchQuery';
import { flattenEdges } from '@/utils/flattenEdges';

export const useGetSearchData = (value: string) => {
  const {
    loading: loadingSearch,
    error: errorSearch,
    data: dataSearch,
  } = useQuery<SearchData>(SEARCH_QUERY, {
    variables: {
      query: value,
    },
    skip: !value,
  });

  const searchData: SearchResults = {
    collections: flattenEdges(dataSearch?.collections),
    products: flattenEdges(dataSearch?.products),
  };

  return {
    loadingSearch,
    errorSearch,
    searchData,
  };
};
