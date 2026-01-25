import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { ProductDetails } from '@/features/product/product-details';
import { getGlobalBenefitsQueryOptions } from '@/shared/queries/global/get-global-benefits';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';

interface ProductPageProps {
  params: Promise<{
    product: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const queryClient = new QueryClient();

  const productData = await queryClient.fetchQuery(getProductQueryOptions(product));
  await queryClient.ensureQueryData(getGlobalBenefitsQueryOptions);

  // fetchQuery returns raw data without select transformation
  // Check for product existence directly
  if (!productData?.product) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetails handle={product} />
    </HydrationBoundary>
  );
}
