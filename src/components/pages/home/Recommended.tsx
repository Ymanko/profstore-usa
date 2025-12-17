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
    <Section className='pb-10.5 md:pb-12.5'>
      <div className='relative'>
        <Typography variant='h2' as='h2' className='mb-5'>
          {title}
        </Typography>

        <Carousel className="w-full">
          <CarouselContent>
            {products.map((item, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4'>

                <ProductCard item={item} />

              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='absolute top-0 right-0 hidden md:flex gap-3'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

      </div>
    </Section>
  );
};
