import React from 'react';

import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

interface SectionProps extends ComponentProps<'section'> {
  withoutContainer?: boolean;
}

export function Section({ children, className, withoutContainer, ...props }: SectionProps) {
  return (
    <section className={cn('bg-white', className)} {...props}>
      {withoutContainer ? children : <div className='container'>{children}</div>}
    </section>
  );
}
