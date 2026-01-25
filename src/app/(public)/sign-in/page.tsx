import { SignInForm } from '@/features/auth/components/sign-in-form';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - ProfStore',
  description: 'Sign in to your ProfStore account',
};

export default function SignInPage() {
  return (
    <PageWrapper>
      <div className='container flex flex-col items-center py-10'>
        <Typography variant='h1' className='mb-8'>
          Sign In
        </Typography>

        <SignInForm />
      </div>
    </PageWrapper>
  );
}
