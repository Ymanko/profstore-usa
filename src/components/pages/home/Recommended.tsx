'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { List } from '@/components/common/List';
import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';
import { getRecommendedQueryOptions } from '@/queries/home/get-recommended';

import type { FC } from 'react';

export const Recommended: FC = () => {
  const {
    data: { title, products },
  } = useSuspenseQuery(getRecommendedQueryOptions);

  return (
    <Section className='pb-10.5 md:pb-12.5'>
      <Typography variant='h2' as='h2'>
        {title}
      </Typography>

      <List
        data={products}
        renderItem={item => (
          <div key={item.id} className='border p-4'>
            <Image
              src={item.featuredImage?.url}
              alt={item.featuredImage?.altText || item.title}
              className='mb-4 h-48 w-full object-cover'
              width={400}
              height={192}
            />
            <Typography variant='h3' as='h3' className='mb-2'>
              {item.title}
            </Typography>
            <Typography variant='body'>
              Price: {item.priceRange.minVariantPrice.amount} {item.priceRange.minVariantPrice.currencyCode}
            </Typography>
          </div>
        )}
        keyExtractor={item => item.id}
        className='flex gap-4 overflow-x-auto'
      />
    </Section>
  );
};
