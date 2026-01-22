import type { SearchParams } from '@/features/search/hooks/use-search-params';
import type { CollectionWithParent } from '@/shared/queries/search/collections-with-parent/types';

export function useGetCollectionHandles(params: SearchParams, collections: CollectionWithParent[]) {
  // Get collection handles for search filter
  // Logic:
  // - Subcategory selected → use only that subcategory (collection)
  // - Category selected + includeSubcategories ON → all collections of that category
  // - Category selected + includeSubcategories OFF → empty array (no results, products don't belong to categories directly)
  // - No category/subcategory → undefined (global search)
  const getCollectionHandles = () => {
    // If specific subcategory (collection) is selected - search only in it
    if (params.subcategory) {
      return [params.subcategory];
    }

    // If category is selected
    if (params.category) {
      // If "Search in subcategories" is ON - get all collections of this category
      if (params.includeSubcategories) {
        const categoryCollections = collections.filter(col => col.parentCategoryHandle === params.category);
        return categoryCollections.map(col => col.handle);
      }
      // If "Search in subcategories" is OFF - return empty array (no results)
      // Products don't belong to categories directly, only to collections
      return [];
    }

    // No category/subcategory selected - global search
    return undefined;
  };

  return { getCollectionHandles };
}
