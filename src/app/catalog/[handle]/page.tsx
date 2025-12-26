import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ProductView } from '@/features/product/product-info';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getProductQueryOptions } from '@/shared/queries/get-product';

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Props) {
  const handleParams = await params;

  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getProductQueryOptions(handleParams.handle));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView handle={handleParams.handle} />)
    </HydrationBoundary>
  );
}
