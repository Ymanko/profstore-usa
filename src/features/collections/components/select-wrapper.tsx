import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

interface SelectWrapperProps extends ComponentProps<'div'> {
  label: string;
}

export function SelectWrapper({ children, className, label, ...props }: SelectWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-x-4 xl:flex-row xl:items-center', className)} {...props}>
      <Typography variant='bold'>{label}</Typography>
      {children}
    </div>
  );
}
