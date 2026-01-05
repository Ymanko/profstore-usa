import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CategoryDetail } from '@/features/categories/category-detail';
import { getCategoryQueryOptions } from '@/shared/queries/categories/get-category';

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData(getCategoryQueryOptions(category));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryDetail handle={category} />
    </HydrationBoundary>
  );
}
