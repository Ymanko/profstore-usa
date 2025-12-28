import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface SelectWrapperProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
}

export const SelectWrapper: FC<SelectWrapperProps> = ({ children, className, label, ...props }) => {
  return (
    <div className={cn('flex flex-col gap-x-4 xl:flex-row xl:items-center', className)} {...props}>
      <Typography variant='bold'>{label}</Typography>
      {children}
    </div>
  );
};
