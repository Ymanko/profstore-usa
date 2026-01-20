import { Icon } from '@/shared/components/common/icon';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

export function BasketBtn({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <Button
      size='lg'
      className={cn(
        'hover:text-accent h-13.5 gap-3.5 bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)] py-3 has-[>svg]:pr-7.5',
        className,
      )}
      {...props}
    >
      <Icon name='shopping-cart' className='size-6 shrink-0' />
      <span className='h-full w-px bg-[#FFFFFF66]' />
      <Typography variant='h3' as='span' className='font-medium'>
        Basket
      </Typography>
    </Button>
  );
}
