'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { BrandCard } from '@/shared/components/common/brand-card';
import { Section } from '@/shared/components/common/section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { getHomePageContentQueryOptions } from '@/shared/queries/home/get-home-page-content';

export function OurBrands() {
  const {
    data: { brands },
  } = useSuspenseQuery(getHomePageContentQueryOptions);

  if (!brands) return null;

  return (
    <Section className='bg-brand-section-bg py-5'>
      <div className='relative'>
        <Typography variant='h2' as='h2' className='mb-5'>
          Our Brands
        </Typography>

        <Carousel
          className='w-full'
          opts={{
            align: 'start',
            slidesToScroll: 'auto',
          }}
        >
          <div className='absolute top-0 right-0 flex gap-3'>
            <CarouselPrevious />
            <CarouselNext />
          </div>

          <CarouselContent>
            {brands.map((brand, index) => (
              <CarouselItem key={index} className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
                <BrandCard brand={brand} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
}
