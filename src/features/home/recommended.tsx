'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ProductsCarousel } from '@/shared/components/common/products-carousel';
import { Section } from '@/shared/components/common/section';
import { getRecommendedQueryOptions } from '@/shared/queries/home/get-recommended';

import type { FC } from 'react';

export const Recommended: FC = () => {
  const {
    data: { title, products },
  } = useSuspenseQuery(getRecommendedQueryOptions);

  return (
    <Section className='py-2.5'>
      <ProductsCarousel title={title} products={products} />
    </Section>
  );
};
