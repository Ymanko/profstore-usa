import { Icon } from '@/shared/components/ui/icon';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export function AddToFavoritesBtn({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type='button'
      aria-label='Add to favorites'
      className={cn(
        'text-muted-foreground flex size-10 items-center justify-center rounded-lg',
        'hover:text-accent transition-colors duration-200',
        className,
      )}
      {...props}
    >
      <Icon name='heart' width={18} height={18} />
    </button>
  );
}
