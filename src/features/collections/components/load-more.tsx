import { Loader2 } from 'lucide-react';

import { Show } from '@/shared/components/common/show';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface LoadMoreProps extends ComponentPropsWithoutRef<'button'> {
  isLoading: boolean;
}

export const LoadMore: FC<LoadMoreProps> = ({ isLoading, className, ...props }) => {
  return (
    <button
      className='bg-secondary hover:bg-secondary/90 disabled:bg-muted-primary disabled:text-muted-foreground flex items-center gap-2 rounded-lg px-8 py-3 font-medium text-white transition-colors'
      type='button'
      {...props}
    >
      <Show when={isLoading} fallback='Load More'>
        <>
          <Loader2 className='size-4 animate-spin' />
          Loading...
        </>
      </Show>
    </button>
  );
};
