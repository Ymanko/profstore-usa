import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CategoryDetail } from '@/features/categories/category-detail';
import { getCategoryQueryOptions } from '@/shared/queries/categories/get-category';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData(getCategoryQueryOptions(category));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryDetail handle={category} />
    </HydrationBoundary>
  );
}
