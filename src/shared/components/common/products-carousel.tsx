'use client';

import { useMedia } from 'react-use';

import { BaseCarousel, CarouselControls } from '@/shared/components/common/base-carousel';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';

import type { Product } from '@/shared/queries/collections/get-subcategory-products';
import type { FC, ReactNode } from 'react';

interface ProductsCarouselProps {
  products: Product[];
}

interface ProductsCarouselWithHeaderProps extends ProductsCarouselProps {
  title: string | ReactNode;
}

export const ProductsCarousel: FC<ProductsCarouselProps> = ({ products }) => {
  const isMounted = useIsMounted();
  const isMobile = useMedia('(max-width: 767px)');

  return (
    <BaseCarousel>
      <CarouselContent>
        {products.map(product => (
          <CarouselItem key={product.id} className='sm:basis-1/2 lg:basis-1/4'>
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <Show when={isMounted && isMobile}>
        <CarouselControls className='mt-5 justify-center' />
      </Show>
    </BaseCarousel>
  );
};

export const ProductsCarouselWithHeader: FC<ProductsCarouselWithHeaderProps> = ({ title, products }) => {
  const isMounted = useIsMounted();
  const isMobile = useMedia('(max-width: 767px)');
  const isTabletOrDesktop = useMedia('(min-width: 768px)');

  return (
    <BaseCarousel>
      <div className='mb-5 flex items-center justify-between'>
        {typeof title === 'string' ? (
          <Typography variant='h2' as='h2'>
            {title}
          </Typography>
        ) : (
          title
        )}

        <Show when={isMounted && isTabletOrDesktop}>
          <CarouselControls />
        </Show>
      </div>

      <CarouselContent>
        {products.map(product => (
          <CarouselItem key={product.id} className='sm:basis-1/2 lg:basis-1/4'>
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <Show when={isMounted && isMobile}>
        <CarouselControls className='mt-5 justify-end md:justify-center' />
      </Show>
    </BaseCarousel>
  );
};
