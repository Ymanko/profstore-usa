import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const AppContainer: FC<ComponentPropsWithoutRef<'div'>> = ({ children, className, ...props }) => {
  return (
    <div className={cn('container', className)} {...props}>
      {children}
    </div>
  );
};
