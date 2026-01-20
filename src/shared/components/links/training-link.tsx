import Link from 'next/link';

import { Icon } from '@/shared/components/common/icon';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export function TrainingLink({ className }: ComponentProps<'a'>) {
  return (
    <Link href='/training' className={cn('text-accent inline-flex items-center gap-x-3.75', className)}>
      <Icon name='mortarboard' width='24' height='24' />
      <Typography variant='link' as='span' className='-mb-1 font-bold'>
        Staff Training
      </Typography>
    </Link>
  );
}
