import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default function AccountPage() {
  return (
    <PageWrapper>
      <Typography variant='h1'>Account Page</Typography>
    </PageWrapper>
  );
}
