import { PageWrapper } from '@/components/common/PageWrapper';
import { Typography } from '@/components/ui/Typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog | ProfStore',
  description: 'All products in our shop',
};

export default async function CollectionsPage() {
  return (
    <PageWrapper>
      <Typography variant='h1'>CollectionsPage</Typography>
    </PageWrapper>
  );
}
