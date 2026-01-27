'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AutoSlider } from '@/features/home/auto-slider';
import { MainBannerSlide } from '@/shared/components/common/banner-slide';
import { PopularProductBanner } from '@/shared/components/common/popular-card';
import { Section } from '@/shared/components/common/section';
import { Typography } from '@/shared/components/ui/typography';
import { getHomePageContentQueryOptions } from '@/shared/queries/home/content/get-home-page-content';
import { getPopularProductsQueryOptions } from '@/shared/queries/home/popular/get-popular-products';

export function Banner() {
  const { data: popularProducts } = useSuspenseQuery(getPopularProductsQueryOptions);
  const {
    data: { bannerSlides },
  } = useSuspenseQuery(getHomePageContentQueryOptions);

  console.log('data', bannerSlides);

  return (
    <Section className='pt-5 pb-2.5'>
      <div className='flex gap-5'>
        <AutoSlider
          slides={bannerSlides}
          className='h-full max-w-245'
          dotClassName='bg-white/50'
          activeDotClassName='bg-white'
          dotsContainerClassName='bottom-2 left-1/2 -translate-x-1/2'
          renderSlide={data => <MainBannerSlide data={data} />}
        />

        <div className='relative hidden shrink-0 xl:block'>
          <AutoSlider
            slides={popularProducts}
            className='w-full max-w-108.75'
            renderSlide={product => <PopularProductBanner product={product} />}
            dotsContainerClassName='bottom-3 left-1/2 -translate-x-1/2'
          />
        </div>

        {popularProducts.length === 0 && (
          <Typography variant='body-lg' className='text-center text-gray-500'>
            No popular products found
          </Typography>
        )}
      </div>
    </Section>
  );
}
