'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductsCarousel } from '@/shared/components/common/products-carousel';
import { getPopularCollectionProductsQueryOptions } from '@/shared/queries/collections/get-popular-collection-products';

import type { FC } from 'react';

interface PopularCollectionProductsProps {
  handle: string;
}

export const PopularCollectionProducts: FC<PopularCollectionProductsProps> = ({ handle }) => {
  const { data: products, isLoading, error } = useQuery(getPopularCollectionProductsQueryOptions(handle));

  if (isLoading) {
    return (
      <div className='container space-y-5 py-12'>
        <div className='bg-muted-primary/50 h-9 animate-pulse rounded-lg' />

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className='bg-muted-primary/50 h-96 animate-pulse rounded-lg' />
          ))}
        </div>
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return null;
  }

  return <ProductsCarousel title='Popular products in this category' products={products} />;
};
