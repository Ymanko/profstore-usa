'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useCounter } from 'react-use';

import { BasketBtn } from '@/shared/components/common/basket-btn';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';

export function ProductActions() {
  const [value, { inc, dec }] = useCounter(0, null, 0);

  return (
    <div className='grid grid-cols-2 gap-5 md:grid-cols-3'>
      <div
        aria-label='Quantity selector'
        className='border-border col-span-2 mx-auto flex w-full max-w-43 items-center justify-between rounded-xl border px-1.5 py-1.25 md:col-span-1 md:mx-0 md:max-w-full'
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

      <Button className='h-13.5 bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)] text-xl' size='lg'>
        Buy
      </Button>
    </div>
  );
}
