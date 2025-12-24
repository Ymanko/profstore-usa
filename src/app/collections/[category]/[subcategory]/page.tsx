import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CollectionProducts } from '@/features/collections/collection-products';
import { getCollectionProductsQueryOptions } from '@/shared/queries/collections/get-collection-products';

type SubcategoryPageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { subcategory } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData(
    getCollectionProductsQueryOptions({
      handle: subcategory,
      first: 24,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CollectionProducts handle={subcategory} />
    </HydrationBoundary>
  );
}
