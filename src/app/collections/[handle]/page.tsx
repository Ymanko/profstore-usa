import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CategoryDetail } from '@/features/categories/category-detail';
import { getCategoryByHandleQueryOptions } from '@/shared/queries/categories/get-category-by-handle';

type CategoryPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { handle } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData(getCategoryByHandleQueryOptions(handle));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryDetail handle={handle} />
    </HydrationBoundary>
  );
}
