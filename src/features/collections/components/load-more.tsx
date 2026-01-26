import { Loader2 } from 'lucide-react';

import { Show } from '@/shared/components/common/show';
import { Button } from '@/shared/components/ui/button';

import type { ComponentProps } from 'react';

interface LoadMoreProps extends ComponentProps<'button'> {
  isLoading: boolean;
}

export function LoadMore({ isLoading, className, ...props }: LoadMoreProps) {
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
}
