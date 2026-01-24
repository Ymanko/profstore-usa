'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ProductsCarouselWithHeader } from '@/shared/components/common/products-carousel';
import { Section } from '@/shared/components/common/section';
import { getRecommendedQueryOptions } from '@/shared/queries/home/reccomended/get-recommended';

export function Recommended() {
  const {
    data: { title, products },
  } = useSuspenseQuery(getRecommendedQueryOptions);

  return (
    <Section className='py-2.5'>
      <ProductsCarouselWithHeader title={title} products={products} />
    </Section>
  );
}
