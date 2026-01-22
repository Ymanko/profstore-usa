import { Loader2 } from 'lucide-react';

import { Show } from '@/shared/components/common/show';
import { Button } from '@/shared/components/ui/button';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface LoadMoreProps extends ComponentPropsWithoutRef<'button'> {
  isLoading: boolean;
}

export const LoadMore: FC<LoadMoreProps> = ({ isLoading, className, ...props }) => {
  return (
    <Button type='button' options='gradient' size='lg' className='h-13.75 w-40.5 text-xl font-medium' {...props}>
      <Show when={isLoading} fallback='Load More'>
        <>
          <Loader2 className='size-4 animate-spin' />
          Loading...
        </>
      </Show>
    </Button>
  );
};
