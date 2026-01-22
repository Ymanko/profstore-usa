'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useCounter } from 'react-use';

import { BasketBtn } from '@/shared/components/common/basket-btn';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

export function ProductActions() {
  const [value, { inc, dec }] = useCounter(0, null, 0);

  return (
    <div className='grid grid-cols-2 gap-5 md:grid-cols-3'>
      <div
        aria-label='Quantity selector'
        className={cn(
          'border-border rounded-xl border px-1.5 py-1.25',
          'mx-auto flex items-center justify-between',
          'col-span-2 w-full max-w-43 md:col-span-1 md:mx-0 md:max-w-full',
        )}
      >
        <Button
          className='bg-accent hover:bg-accent/70 size-11.25 text-black'
          onClick={() => dec()}
          disabled={value <= 0}
        >
          <MinusIcon strokeWidth={6} size={40} />
        </Button>

        <Typography className='text-muted-foreground text-[17px] leading-4.5'>{value}</Typography>

        <Button className='bg-accent hover:bg-accent/70 size-11.25 text-black' onClick={() => inc()}>
          <PlusIcon strokeWidth={6} size={40} />
        </Button>
      </div>

      <BasketBtn />

      <Button className='h-13.5 text-xl' size='lg' options='gradient'>
        Buy
      </Button>
    </div>
  );
}
