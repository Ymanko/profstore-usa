import { PageWrapper } from '@/components/common/PageWrapper';
import { RichText } from '@/components/common/RichText';
import { Section } from '@/components/common/Section';
import { Banner } from '@/components/pages/home/Banner';
import { Categories } from '@/components/pages/home/Categories';
import { OurBrands } from '@/components/pages/home/OurBrands';
import { ProductTabs } from '@/components/pages/home/ProductTabs';
import { Recommended } from '@/components/pages/home/Recommended';
import { Typography } from '@/components/ui/Typography';
import { getQueryClient } from '@/lib/tanstack/get-query-client';
import { getCategoriesQueryOptions } from '@/queries/home/get-categories';
import { getHomePageContentQueryOptions } from '@/queries/home/get-home-page-content';
import { getNewProductsQueryOptions } from '@/queries/home/get-new-products';
import { getPopularProductsQueryOptions } from '@/queries/home/get-popular-products';
import { getRecommendedQueryOptions } from '@/queries/home/get-recommended';
import { getSaleHitsQueryOptions } from '@/queries/home/get-sale-hits';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default async function Home() {
  const queryClient = getQueryClient();

  // Prefetch all home page data
  await Promise.all([
    queryClient.ensureQueryData(getHomePageContentQueryOptions),
    queryClient.ensureQueryData(getCategoriesQueryOptions),
    queryClient.ensureQueryData(getRecommendedQueryOptions),
    queryClient.ensureQueryData(getPopularProductsQueryOptions),
    queryClient.ensureQueryData(getNewProductsQueryOptions),
    queryClient.ensureQueryData(getSaleHitsQueryOptions),
  ]);

  const getHomePageContent = queryClient.getQueryData(getHomePageContentQueryOptions.queryKey);

  console.log('getHomePageContent', getHomePageContent);

  return (
    <PageWrapper className='pt-4.5'>
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
      <Section className='pb-10.5 md:pb-12.5'>
        {getHomePageContent?.descriptionTitle && (
          <Typography variant='h2' as='h2' className='mb-4 text-[27px] md:mb-[18px] md:text-3xl lg:mb-6'>
            {getHomePageContent?.descriptionTitle}
          </Typography>
        )}

        {getHomePageContent?.descriptionContent && <RichText content={getHomePageContent.descriptionContent} />}
      </Section>

      {/*Our Brands*/}
      <OurBrands brands={getHomePageContent?.brands} />
      {/* <Section className='bg-border py-12.5 xl:pt-8 xl:pb-13'>
        OurBrands
        <Typography variant='h2' as='h2'>
          Our Brands
        </Typography>
      </Section> */}
    </PageWrapper>
  );
}
