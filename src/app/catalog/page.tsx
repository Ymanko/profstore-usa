import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { CatalogProducts } from '@/features/catalog/catalog-products';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getProductsQueryOptions } from '@/shared/queries/get-products';

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
