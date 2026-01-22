import Link from 'next/link';
import React from 'react';

import { Icon } from '@/shared/components/common/icon';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export function Phone({ className }: ComponentProps<'a'>) {
  return (
    <Link
      href='tel:5555551234'
      className={cn('text-primary-foreground hover:text-accent transition-colors duration-300', className)}
    >
      <Icon name='call-receive' />

      <Typography variant='body-lg' className='font-bold'>
        (555) 555-1234
      </Typography>
    </Link>
  );
}
