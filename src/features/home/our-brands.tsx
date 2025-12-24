'use client';

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

import type { FC } from 'react';

type Brand = {
  name: string;
  logo: string;
  logoAlt: string;
};

type OurBrandsProps = {
  brands: Brand[] | undefined;
};

export const OurBrands: FC<OurBrandsProps> = ({ brands }: OurBrandsProps) => {
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
            {brands &&
              brands.map((brand, index) => (
                <CarouselItem key={index} className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
                  <BrandCard brand={brand} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
};
