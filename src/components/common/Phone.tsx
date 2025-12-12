import Link from 'next/link';
import React from 'react';

import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const Phone: FC<ComponentPropsWithoutRef<'a'>> = ({ className }) => {
  return (
    <Link
      href='tel:5555551234'
      className={cn('text-primary-foreground hover:text-accent transition-colors duration-300', className)}
    >
      <Icon name='callReceive' width='24' height='24' />
      <Typography variant='body-lg' className='font-bold'>
        (555) 555-1234
      </Typography>
    </Link>
  );
};
