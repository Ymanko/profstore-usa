'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ProductCard } from '@/components/common/ProductCard';
import { Section } from '@/components/common/Section';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';
import { Typography } from '@/components/ui/Typography';
import { getRecommendedQueryOptions } from '@/queries/home/get-recommended';

import type { FC } from 'react';

export const Recommended: FC = () => {
  const {
    data: { title, products },
  } = useSuspenseQuery(getRecommendedQueryOptions);

  return (
    <Section className='md: pb - 12.5 pb-10.5'>
      <div className='border-accent border-t-3 pt-10.5 md:pt-12.5 lg:pt-15'>
        <div className='relative'>
          <Typography variant='h2' as='h2' className='mb-5'>
            {title}
          </Typography>

          <Carousel
            className='m-auto w-full max-w-100 sm:max-w-[100%]'
            opts={{
              align: 'start',
              slidesToScroll: 'auto',
            }}
          >
            <div className='absolute top-0 right-0 hidden gap-3 md:flex'>
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <CarouselContent>
              {products.map((item, index) => (
                <CarouselItem key={index} className='sm:basis-1/2 lg:basis-1/4'>
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};
