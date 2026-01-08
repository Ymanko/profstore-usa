'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { NotFound } from '@/features/layout/not-found';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';

export function ProductDetails({ handle }: { handle: string }) {
  const { data: product } = useSuspenseQuery(getProductQueryOptions(handle));

  const images = product?.images.edges.map(edge => edge.node) || [];

  console.log('Product Details:', product);

  return (
    <div className='container'>
      <Show when={product} fallback={<NotFound>Product not found</NotFound>}>
        <Typography variant='h1' as='h1'>
          {product?.title}
        </Typography>
      </Show>
    </div>
  );
}
