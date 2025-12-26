import { PageBreadcrumb } from '@/shared/components/common/page-breadcrumb';
import { cn } from '@/shared/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const PageWrapper: FC<ComponentPropsWithoutRef<'section'>> = ({ children, className, ...props }) => {
  return (
    <section className={cn('py-4', className)} {...props}>
      <div className='container space-y-7.5'>
        <PageBreadcrumb />
      </div>

      {children}
    </section>
  );
};
