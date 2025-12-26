import { Banner } from '@/features/home/banner';
import { Categories } from '@/features/home/categories';
import { OurBrands } from '@/features/home/our-brands';
import { ProductTabs } from '@/features/home/product-tabs';
import { Recommended } from '@/features/home/recommended';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { RichText } from '@/shared/components/common/rich-text';
import { Section } from '@/shared/components/common/section';
import { Typography } from '@/shared/components/ui/typography';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getCategoriesQueryOptions } from '@/shared/queries/home/get-categories';
import { getHomePageContentQueryOptions } from '@/shared/queries/home/get-home-page-content';
import { getNewProductsQueryOptions } from '@/shared/queries/home/get-new-products';
import { getPopularProductsQueryOptions } from '@/shared/queries/home/get-popular-products';
import { getRecommendedQueryOptions } from '@/shared/queries/home/get-recommended';
import { getSaleHitsQueryOptions } from '@/shared/queries/home/get-sale-hits';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default async function Home() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.ensureQueryData(getHomePageContentQueryOptions),
    queryClient.ensureQueryData(getCategoriesQueryOptions),
    queryClient.ensureQueryData(getRecommendedQueryOptions),
    queryClient.ensureQueryData(getPopularProductsQueryOptions),
    queryClient.ensureQueryData(getNewProductsQueryOptions),
    queryClient.ensureQueryData(getSaleHitsQueryOptions),
  ]);

  const getHomePageContent = queryClient.getQueryData(getHomePageContentQueryOptions.queryKey);

  return (
    <PageWrapper>
      <Typography variant='h1' className='sr-only'>
        Welcome to ProfStore
      </Typography>

      {/*MainBanner*/}
      <Banner />
      {/*Category*/}
      <Categories />

      {/*Recommended*/}
      <Recommended />

      {/*NewAndSaleProducts*/}
      <ProductTabs />

      {/*Description*/}
      <Section className='pt-2.5 pb-5'>
        {getHomePageContent?.descriptionTitle && (
          <Typography variant='h2' as='h2' className='mb-5 text-[27px] md:mb-4.5 md:text-3xl'>
            {getHomePageContent?.descriptionTitle}
          </Typography>
        )}

        {getHomePageContent?.descriptionContent && <RichText content={getHomePageContent.descriptionContent} />}
      </Section>

      {/*Our Brands*/}
      <OurBrands brands={getHomePageContent?.brands} />
    </PageWrapper>
  );
}
