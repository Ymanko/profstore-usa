import { ProductTitle } from '@/features/product/components/product-tools';
import { Rating } from '@/features/product/components/rating';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

export interface Review {
  id: string;
  author: string;
  company?: string;
  date: string;
  rating: number;
  content: string;
}

interface ReviewsListProps {
  reviews: Review[];
  className?: string;
}

export function ReviewsList({ reviews, className }: ReviewsListProps) {
  return (
    <div className={cn('space-y-5.5', className)}>
      <ProductTitle id={ProductDetailsAnchor.Reviews}>Reviews ({reviews.length})</ProductTitle>

      {/* Reviews */}
      <List
        data={reviews}
        renderItem={review => (
          <>
            <div className='space-y-2.5'>
              {/* Author and Company */}
              <Typography className='inline-flex gap-x-1'>
                Review by <span className='font-bold'>{review.author}</span>
                {review.company && (
                  <>
                    from <span className='font-bold'>{review.company}</span>
                  </>
                )}
              </Typography>

              {/* Date */}
              <Typography className='font-light'>Posted on {review.date}</Typography>
            </div>
            {/* Rating */}
            <Rating rating={review.rating} />s{/* Review Content */}
            <Typography className='leading-relaxed whitespace-pre-line'>{review.content}</Typography>
          </>
        )}
        keyExtractor={review => review.id}
        className='space-y-4'
        itemClassName='border rounded-xl p-5 md:p-7.5 space-y-3.5'
      />
    </div>
  );
}
