import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <Typography variant='h1'>Contact Page</Typography>
    </PageWrapper>
  );
}
