import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { CategoryDetail } from '@/features/categories/category-detail';
import { getCategoryQueryOptions } from '@/shared/queries/categories/get-category';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const queryClient = new QueryClient();

  const categoryData = await queryClient.fetchQuery(getCategoryQueryOptions(category));

  if (!categoryData) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryDetail handle={category} />
    </HydrationBoundary>
  );
}
