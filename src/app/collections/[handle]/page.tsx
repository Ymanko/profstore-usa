import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCategoryByHandleQueryOptions } from '@/queries/categories/get-category-by-handle';

type CategoryPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { handle } = await params;
  const queryClient = new QueryClient();

  // Prefetch category data
  await queryClient.ensureQueryData(getCategoryByHandleQueryOptions(handle));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Category: {handle}</h1>
        {/* Тут буде компонент CategoryDetail */}
      </div>
    </HydrationBoundary>
  );
}
