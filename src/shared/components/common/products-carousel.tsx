'use client';

import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';

import type { Product } from '@/shared/queries/collections/get-subcategory-products';
import type { FC } from 'react';

interface ProductsCarouselProps {
  title?: string;
  products: Product[];
}

export const ProductsCarousel: FC<ProductsCarouselProps> = ({ title = '', products }) => {
  return (
    <div className='relative'>
      <Show when={!!title}>
        <Typography variant='h2' as='h2' className='mb-5'>
          {title}
        </Typography>
      </Show>

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
          {products.map(product => (
            <CarouselItem key={product.id} className='sm:basis-1/2 lg:basis-1/4'>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
