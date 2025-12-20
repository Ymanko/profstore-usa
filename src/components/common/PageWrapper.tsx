import React from 'react';

import { PageBreadcrumb } from '@/components/common/PageBreadcrumb';
import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const PageWrapper: FC<ComponentPropsWithoutRef<'section'>> = ({ children, className, ...props }) => {
  return (
    <section className={cn(className)} {...props}>
      <div className='container'>
        <PageBreadcrumb />
      </div>
      {children}
    </section>
  );
};
