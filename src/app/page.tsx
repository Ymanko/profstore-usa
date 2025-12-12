import { PageWrapper } from '@/components/common/PageWrapper';
import { Typography } from '@/components/ui/Typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default function Home() {
  return (
    <PageWrapper>
      <div className='space-y-5'>
        <Typography variant='h1'>Welcome to ProfStore</Typography>
        <Typography variant='body-lg'>Your one-stop shop for all your needs!</Typography>
      </div>
    </PageWrapper>
  );
}
