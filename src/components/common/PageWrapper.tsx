import React from 'react';

import { PageBreadcrumb } from '@/components/common/PageBreadcrumb';
import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const PageWrapper: FC<ComponentPropsWithoutRef<'section'>> = ({ children, className, ...props }) => {
  return (
    <section className={cn('py-4.5', className)} {...props}>
      <div className='container'>
        <PageBreadcrumb />
        {children}
      </div>
    </section>
  );
};
