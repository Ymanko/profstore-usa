'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { BaseCarousel, CarouselControls } from '@/shared/components/common/base-carousel';
import { BrandCard } from '@/shared/components/common/brand-card';
import { Section } from '@/shared/components/common/section';
import { CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { getHomePageContentQueryOptions } from '@/shared/queries/home/content/get-home-page-content';

export function OurBrands() {
  const {
    data: { brands },
  } = useSuspenseQuery(getHomePageContentQueryOptions);

  if (!brands) return null;

  return (
    <Section className='bg-brand-section-bg py-5'>
      <BaseCarousel className='w-full'>
        <div className='mb-5 flex items-center justify-between'>
          <Typography variant='h2' as='h2'>
            Our Brands
          </Typography>
          <CarouselControls />
        </div>

        <CarouselContent>
          {brands.map((brand, index) => (
            <CarouselItem key={index} className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
              <BrandCard brand={brand} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </BaseCarousel>
    </Section>
  );
}
