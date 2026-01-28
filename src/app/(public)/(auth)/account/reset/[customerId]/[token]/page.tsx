import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password - ProfStore',
  description: 'Reset your ProfStore account password',
};

interface ResetPasswordPageProps {
  params: Promise<{
    customerId: string;
    token: string;
  }>;
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { customerId, token } = await params;

  return (
    <PageWrapper>
      <div className='container flex flex-col items-center py-10'>
        <Typography variant='h1' className='mb-8'>
          Reset Password
        </Typography>
        <ResetPasswordForm customerId={customerId} resetToken={token} />
      </div>
    </PageWrapper>
  );
}
