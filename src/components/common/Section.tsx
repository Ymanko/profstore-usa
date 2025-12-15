import React from 'react';

import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  withoutContainer?: boolean;
}

export const Section: FC<SectionProps> = ({ children, className, withoutContainer, ...props }) => {
  return (
    <section className={cn('bg-white', className)} {...props}>
      {withoutContainer ? children : <div className='container'>{children}</div>}
    </section>
  );
};
