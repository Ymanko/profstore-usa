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
    <div className={cn('bg-sidebar rounded-xl p-5 md:p-7.5', className)}>
      <div className='mb-7.5 flex items-start justify-between'>
        {/* Average Rating */}
        <div>
          <Typography className='text-[64px] font-bold leading-none'>
            {averageRating.toFixed(1)}
            <span className='text-muted-foreground text-4xl'>/5</span>
          </Typography>
        </div>

        {/* Stars and Comments */}
        <div className='text-right'>
          <div className='mb-2 flex gap-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={cn(
                  'size-6',
                  star <= Math.round(averageRating) ? 'fill-accent text-accent' : 'fill-muted-primary text-muted-primary',
                )}
              />
            ))}
          </div>
          <Typography className='text-muted-foreground'>
            {totalReviews} {totalReviews === 1 ? 'comment' : 'comments'}
          </Typography>
        </div>
      </div>

      {/* Rating Breakdown */}
      <List
        data={breakdown}
        renderItem={item => (
          <div className='flex items-center gap-3'>
            {/* Stars */}
            <div className='flex gap-0.5'>
              {[...Array(item.stars)].map((_, i) => (
                <Star key={i} className='size-5 fill-accent text-accent' />
              ))}
            </div>

            {/* Progress Bar */}
            <div className='bg-muted-primary relative h-2 flex-1 overflow-hidden rounded-full'>
              <div
                className='bg-accent absolute left-0 top-0 h-full rounded-full transition-all'
                style={{ width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%' }}
              />
            </div>

            {/* Count */}
            <Typography className='w-4 text-right font-bold'>{item.count}</Typography>
          </div>
        )}
        keyExtractor={item => item.stars.toString()}
        className='space-y-3'
      />
    </div>
  );
}
