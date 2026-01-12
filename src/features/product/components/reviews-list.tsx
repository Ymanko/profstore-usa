'use client';

import { useMedia } from 'react-use';

import { ProductTitle } from '@/features/product/components/product-tools';
import { Rating } from '@/features/product/components/rating';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export interface Review {
  id: string;
  author: string;
  company?: string;
  date: string;
  rating: number;
  content: string;
}

interface ReviewsListProps extends ComponentProps<'div'> {
  reviews: Review[];
}

export function ReviewsList({ className, reviews, ...props }: ReviewsListProps) {
  const isMounted = useIsMounted();
  const isDesktop = useMedia('(min-width: 1280px)');

  return (
    <div className={cn('space-y-5.5', className)} {...props}>
      <ProductTitle id={ProductDetailsAnchor.Reviews}>Reviews ({reviews.length})</ProductTitle>

      {/* Reviews */}
      <List
        data={reviews}
        renderItem={review => (
          <>
            <div className='space-y-2.5'>
              {/* Author and Company */}
              <div className='xl:flex xl:items-center xl:justify-between'>
                <Typography className='inline-flex gap-x-1'>
                  Review by <span className='font-bold'>{review.author}</span>
                  {review.company && (
                    <>
                      from <span className='font-bold'>{review.company}</span>
                    </>
                  )}
                </Typography>

                <Show when={isMounted && isDesktop}>
                  <Rating rating={review.rating} />
                </Show>
              </div>

              {/* Date */}
              <Typography>Posted on {review.date}</Typography>
            </div>

            {/* Rating */}
            <Show when={isMounted && !isDesktop}>
              <Rating className='xl:hidden' rating={review.rating} />
            </Show>
            {/* Review Content */}
            <Typography className='leading-relaxed whitespace-pre-line'>{review.content}</Typography>
          </>
        )}
        keyExtractor={review => review.id}
        className='space-y-4'
        itemClassName='border rounded-xl p-3.75 xl:px-5 xl:py-6 space-y-3.5'
      />
    </div>
  );
}
