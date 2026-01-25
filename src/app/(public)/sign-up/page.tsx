import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - ProfStore',
  description: 'Create your ProfStore account',
};

export default function SignUpPage() {
  return (
    <PageWrapper>
      <div className='container flex flex-col items-center py-10'>
        <Typography variant='h1' className='mb-8'>
          Create Account
        </Typography>
        <SignUpForm />
      </div>
    </PageWrapper>
  );
}
