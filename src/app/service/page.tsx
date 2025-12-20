import { PageWrapper } from '@/components/common/PageWrapper';
import { Typography } from '@/components/ui/Typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default function ServicePage() {
  return (
    <PageWrapper>
      <Typography variant='h1'>Service Page</Typography>
    </PageWrapper>
  );
}
