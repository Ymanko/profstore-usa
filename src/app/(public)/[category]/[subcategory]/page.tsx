import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CollectionProducts } from '@/features/collections/collection-products';
import { getSubcategoryProductsQueryOptions } from '@/shared/queries/collections/get-subcategory-products';

type SubcategoryPageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { subcategory } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData(
    getSubcategoryProductsQueryOptions({
      handle: subcategory,
      first: 12,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CollectionProducts handle={subcategory} />
    </HydrationBoundary>
  );
}
