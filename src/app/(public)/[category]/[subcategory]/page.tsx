import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { CollectionProducts } from '@/features/collections/collection-products';
import { getSubcategoryProductsQueryOptions } from '@/shared/queries/collections/get-subcategory-products';

type SubcategoryPageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { subcategory } = await params;
  const queryClient = new QueryClient();

  const subcategoryData = await queryClient.fetchQuery(
    getSubcategoryProductsQueryOptions({
      handle: subcategory,
      first: 12,
    }),
  );

  if (!subcategoryData?.collection) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CollectionProducts handle={subcategory} />
    </HydrationBoundary>
  );
}
