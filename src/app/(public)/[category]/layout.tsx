import { TransitionLayout } from '@/features/layout/transition-layout';
import { PageWrapper } from '@/shared/components/common/page-wrapper';

import type { LayoutProps } from '@/shared/types/common';

export default function CategoryLayout({ children }: LayoutProps) {
  return (
    <TransitionLayout>
      <PageWrapper>{children}</PageWrapper>
    </TransitionLayout>
  );
}
