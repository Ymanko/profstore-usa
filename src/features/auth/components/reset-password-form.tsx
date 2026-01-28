'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { resetPasswordSchema } from '@/features/auth/schemas/auth-schemas';
import { resetPassword } from '@/shared/actions/auth/reset-password';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Typography } from '@/shared/components/ui/typography';

import type { ResetPasswordFormValues } from '@/features/auth/schemas/auth-schemas';

interface ResetPasswordFormProps {
  customerId: string;
  resetToken: string;
}

export function ResetPasswordForm({ customerId, resetToken }: ResetPasswordFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setServerError(null);
    setIsLoading(true);

    const result = await resetPassword({
      customerId,
      resetToken,
      password: data.password,
    });

    if (result.success) {
      setIsSuccess(true);
      // Redirect to profile after 2 seconds
      setTimeout(() => {
        router.push('/profile');
        router.refresh();
      }, 2000);
    } else {
      setServerError(result.error || 'Failed to reset password');
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className='w-full max-w-md space-y-4 text-center'>
        <Typography variant='h3'>Password reset successful!</Typography>
        <Typography className='text-muted-foreground'>
          Your password has been reset. Redirecting to your profile...
        </Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-5'>
      <Typography className='text-muted-foreground text-sm'>Enter your new password below.</Typography>

      <div className='space-y-2'>
        <Label htmlFor='password'>New Password</Label>
        <Input id='password' type='password' placeholder='Enter new password' {...register('password')} />
        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input
          id='confirmPassword'
          type='password'
          placeholder='Confirm new password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className='text-destructive text-sm'>{errors.confirmPassword.message}</p>}
      </div>

      {serverError && <Typography className='text-destructive text-sm'>{serverError}</Typography>}

      <Button type='submit' options='gradient' size='lg' disabled={isLoading} className='w-full'>
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </Button>

      <div className='text-center text-sm'>
        <Link href='/sign-in' className='text-primary hover:underline'>
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
