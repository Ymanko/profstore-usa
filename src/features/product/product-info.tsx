'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';
import { getProductQueryOptions } from '@/shared/queries/get-product';

export const ProductView = ({ handle }: { handle: string }) => {
  const { data: product } = useSuspenseQuery(getProductQueryOptions(handle));

  if (!product) return <h1>Product not found</h1>;

  return (
    <PageWrapper>
      <div className='container'>
        <Typography variant='h1'>{product.title}</Typography>

        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            width={600}
            height={600}
          />
        )}

        <p>{product.description}</p>
      </div>
    </PageWrapper>
  );
};
