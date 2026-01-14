import { Star } from 'lucide-react';

import { useRating } from '@/features/product/hooks/use-rating';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

interface RatingProps extends ComponentProps<'div'> {
  rating: number;
  commentsCount?: number;
}

export function Rating({ className, rating, commentsCount, ...props }: RatingProps) {
  const DEFAULT_STYLES = 'size-5 text-accent';
  const stars = useRating(rating);

  return (
    <div className={cn('inline-flex items-center gap-1.75', className)} {...props}>
      <List
        data={stars}
        renderItem={star => (
          <>
            {star === 'full' && <Star className={cn(DEFAULT_STYLES, 'fill-accent')} />}
            {star === 'empty' && <Star className='fill-muted-primary/70 text-muted-primary/70 size-5' />}
            {star === 'half' && (
              <>
                <Star className={cn(DEFAULT_STYLES, 'fill-muted-primary text-muted-primary')} />
                <Star
                  className={cn(DEFAULT_STYLES, 'fill-accent absolute top-0 left-0')}
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                />
              </>
            )}
          </>
        )}
        keyExtractor={(_, i) => i.toString()}
        className='flex items-center gap-1.75'
        itemClassName='relative'
      />

      <Typography className='text-muted-foreground font-inter'>
        {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
      </Typography>
    </div>
  );
}
