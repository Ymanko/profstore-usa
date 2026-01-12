import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ProductDetails } from '@/features/product/product-details';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';

interface ProductPageProps {
  params: Promise<{
    product: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const queryClient = new QueryClient();

  await queryClient.ensureQueryData(getProductQueryOptions(product));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetails handle={product} />
    </HydrationBoundary>
  );
}
