import React from 'react';

import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const PageWrapper: FC<ComponentPropsWithoutRef<'section'>> = ({ children, className, ...props }) => {
  return (
    <section className={cn('py-10', className)} {...props}>
      <div className='container'>{children}</div>
    </section>
  );
};
