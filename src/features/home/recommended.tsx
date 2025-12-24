'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ProductCard } from '@/shared/components/common/product-card';
import { Section } from '@/shared/components/common/section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { getRecommendedQueryOptions } from '@/shared/queries/home/get-recommended';

import type { FC } from 'react';

export const Recommended: FC = () => {
  const {
    data: { title, products },
  } = useSuspenseQuery(getRecommendedQueryOptions);

  return (
    <Section className='py-2.5'>
      <div className='border-accent border-t-3 pt-3.5'>
        <div className='relative'>
          <Typography variant='h2' as='h2' className='mb-5'>
            {title}
          </Typography>

          <Carousel
            className='m-auto w-full max-w-87 md:max-w-167 lg:max-w-full'
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
              {products.map((product, index) => (
                <CarouselItem key={index} className='sm:basis-1/2 lg:basis-1/4'>
                  <ProductCard
                    item={{
                      id: product.id,
                      title: product.title,
                      featuredImage: product.featuredImage,
                      oldPrice: product.priceRange.minVariantPrice.amount,
                      price: product.compareAtPriceRange.minVariantPrice.amount,
                      availableForSale: product.availableForSale,
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};
