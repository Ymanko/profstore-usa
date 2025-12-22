'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MainBannerSlide } from '@/components/common/BannerSlide';
import { PopularProductBanner } from '@/components/common/PopularCard';
import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';
import { getHomePageContentQueryOptions } from '@/queries/home/get-home-page-content';
import { getPopularProductsQueryOptions } from '@/queries/home/get-popular-products';

import { AutoSlider } from './AutoSlider';

export function Banner() {
  const { data: popularProducts } = useSuspenseQuery(getPopularProductsQueryOptions);
  const {
    data: { bannerSlides },
  } = useSuspenseQuery(getHomePageContentQueryOptions);

  return (
    <Section className='pb-7.5 md:pt-7.5 md:pb-7.5'>
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
