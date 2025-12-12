import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { PageWrapper } from '@/components/common/PageWrapper';
import { CatalogProducts } from '@/components/pages/catalog/CatalogProducts';
import { Typography } from '@/components/ui/Typography';
import { getQueryClient } from '@/lib/tanstack/get-query-client';
import { getProductsQueryOptions } from '@/queries/get-products';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog | ProfStore',
  description: 'All products in our shop',
};

export default async function CatalogPage() {
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getProductsQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageWrapper>
        <Typography variant='h1'>Catalog</Typography>

        <CatalogProducts />
      </PageWrapper>
    </HydrationBoundary>
  );
}
