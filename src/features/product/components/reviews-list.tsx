import { Rating } from '@/features/product/components/rating';
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
    <div className={cn('space-y-7.5', className)}>
      {/* Header */}
      <Typography variant='h2' as='h2' className='text-[40px] font-bold leading-tight'>
        Reviews ({reviews.length})
      </Typography>

      {/* Reviews */}
      <List
        data={reviews}
        renderItem={review => (
          <div className='bg-sidebar rounded-xl p-5 md:p-7.5'>
            {/* Author and Company */}
            <Typography className='mb-3 text-lg'>
              Review by <span className='font-bold'>{review.author}</span>
              {review.company && (
                <>
                  {' '}
                  from <span className='font-bold'>{review.company}</span>
                </>
              )}
            </Typography>

            {/* Date */}
            <Typography className='text-muted-foreground mb-4 text-sm'>Posted on {review.date}</Typography>

            {/* Rating */}
            <div className='mb-5'>
              <Rating rating={review.rating} />
            </div>

            {/* Review Content */}
            <Typography className='whitespace-pre-line leading-relaxed'>{review.content}</Typography>
          </div>
        )}
        keyExtractor={review => review.id}
        className='space-y-5'
      />
    </div>
  );
}
