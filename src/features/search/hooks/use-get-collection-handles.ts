import type { SearchParams } from '@/features/search/hooks/use-search-params';
import type { CollectionWithParent } from '@/shared/queries/search/collections-with-parent/types';

export function useGetCollectionHandles(params: SearchParams, collections: CollectionWithParent[]) {
  // Get collection handles for search filter
  // Logic:
  // - Subcategory selected → search only in that subcategory
  // - Category selected (Subcategory = All) → search in all subcategories of that category
  // - No category/subcategory → undefined (global search)
  const getCollectionHandles = () => {
    // If specific subcategory (collection) is selected - search only in it
    if (params.subcategory) {
      return [params.subcategory];
    }

    // If category is selected - search in all its subcategories
    if (params.category) {
      const categoryCollections = collections.filter(col => col.parentCategoryHandle === params.category);
      return categoryCollections.map(col => col.handle);
    }

    // No category/subcategory selected - global search
    return undefined;
  };

  return { getCollectionHandles };
}
