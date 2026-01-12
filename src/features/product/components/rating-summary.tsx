import { Star } from 'lucide-react';

import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

interface RatingBreakdown {
  stars: number;
  count: number;
}

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  className?: string;
}

export function RatingSummary({ averageRating, totalReviews, breakdown, className }: RatingSummaryProps) {
  const maxCount = Math.max(...breakdown.map(b => b.count));

  return (
    <div className={cn('bg-sidebar-inactive space-y-5.75 rounded-xl px-5 py-8 md:p-7.5', className)}>
      <div className='flex items-center justify-between'>
        {/* Average Rating */}

        <Typography className='inline-flex items-end gap-x-1 text-[50px] leading-none font-bold'>
          {averageRating.toFixed(1)}
          <span className='text-3xl'>/</span>
          <span className='text-3xl'>5</span>
        </Typography>

        {/* Stars and Comments */}
        <div className='text-center'>
          <div className='mb-2 flex gap-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={cn(
                  'size-5',
                  star <= Math.round(averageRating)
                    ? 'fill-accent text-accent'
                    : 'fill-muted-primary text-muted-primary',
                )}
              />
            ))}
          </div>

          <Typography className='font-inter'>
            {totalReviews} {totalReviews === 1 ? 'comment' : 'comments'}
          </Typography>
        </div>
      </div>

      {/* Rating Breakdown */}
      <List
        data={breakdown}
        renderItem={item => (
          <>
            {/* Stars */}
            <div className='flex items-center gap-1.25'>
              {[...Array(item.stars)].map((_, i) => (
                <Star key={i} className='fill-accent text-accent size-3.25' />
              ))}
            </div>

            {/* Count */}
            <Typography className='font-inter text-right'>{item.count}</Typography>

            {/* Progress Bar */}
            <div className='bg-muted-primary relative col-span-2 h-1.25 overflow-hidden rounded-full'>
              <div
                className='bg-accent absolute top-0 left-0 h-full rounded-full transition-all'
                style={{ width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%' }}
              />
            </div>
          </>
        )}
        keyExtractor={item => item.stars.toString()}
        className='space-y-3'
        itemClassName='grid grid-cols-2 gap-y-2.5'
      />
    </div>
  );
}
