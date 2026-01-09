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
import type { ReactNode } from 'react';

interface ProductsCarouselProps {
  products: Product[];
}

interface ProductsCarouselWithHeaderProps extends ProductsCarouselProps {
  title: string | ReactNode;
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  return (
    <CarouselWrapper>
      <CarouselBody products={products} />
    </CarouselWrapper>
  );
}

export function ProductsCarouselWithHeader({ title, products }: ProductsCarouselWithHeaderProps) {
  return (
    <CarouselWrapper>
      <div className='mb-5 flex items-center justify-between'>
        <Show
          when={title === 'string'}
          fallback={
            <Typography variant='h2' as='h2'>
              {title}
            </Typography>
          }
        >
          title
        </Show>

        <div className='hidden gap-3 md:flex'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselBody products={products} />
    </CarouselWrapper>
  );
}

function CarouselWrapper({ children }: { children: ReactNode }) {
  return (
    <Carousel
      className='m-auto w-full max-w-87 md:max-w-167 lg:max-w-full'
      opts={{
        align: 'start',
        slidesToScroll: 'auto',
      }}
    >
      {children}
    </Carousel>
  );
}

function CarouselBody({ products }: ProductsCarouselProps) {
  return (
    <>
      <CarouselContent>
        {products.map(product => (
          <CarouselItem key={product.id} className='sm:basis-1/2 lg:basis-1/4'>
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className='mt-5 flex justify-center gap-3 md:hidden'>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </>
  );
}
