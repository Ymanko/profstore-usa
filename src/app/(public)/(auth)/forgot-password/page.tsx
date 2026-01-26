import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password - ProfStore',
  description: 'Reset your ProfStore account password',
};

export default function ForgotPasswordPage() {
  return (
    <PageWrapper>
      <div className='container flex flex-col items-center py-10'>
        <Typography variant='h1' className='mb-8'>
          Forgot Password
        </Typography>
        <ForgotPasswordForm />
      </div>
    </PageWrapper>
  );
}
