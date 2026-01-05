import { TransitionLayout } from '@/features/layout/transition-layout';
import { PageBreadcrumb } from '@/shared/components/common/page-breadcrumb';
import { cn } from '@/shared/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

export function PageWrapper({ children, className, ...props }: ComponentPropsWithoutRef<'section'>) {
  return (
    <TransitionLayout>
      <section className={cn('py-4', className)} {...props}>
        <div className='container space-y-7.5'>
          <PageBreadcrumb />
        </div>

        {children}
      </section>
    </TransitionLayout>
  );
}
