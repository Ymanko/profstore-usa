'use client';

// import { useSuspenseQuery } from '@tanstack/react-query';

import { BrandCard } from '@/components/common/BrandCard';
import { Section } from '@/components/common/Section';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';
import { Typography } from '@/components/ui/Typography';
// import { getOurBrandsQueryOptions } from '@/queries/home/get-our-brands';

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
  // const {
  //   data: { title, brands },
  // } = useSuspenseQuery(getOurBrandsQueryOptions);

  return (
    <Section className='bg-brand-section-bg py-10.5 md:py-12.5'>
      {/* <div className="pt-10.5 md:pt-12.5 lg:pt-15 border-t-3 border-accent"> */}
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
      {/* </div> */}
    </Section>
  );
};
