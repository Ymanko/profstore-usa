'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { forgotPasswordSchema } from '@/features/auth/schemas/auth-schemas';
import { recoverPassword } from '@/shared/actions/auth/recover-password';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Typography } from '@/shared/components/ui/typography';

import type { ForgotPasswordFormValues } from '@/features/auth/schemas/auth-schemas';

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);
    setIsLoading(true);

    const result = await recoverPassword(data.email);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setServerError(result.error || 'Failed to send recovery email');
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className='w-full max-w-md space-y-4 text-center'>
        <Typography variant='h3'>Check your email</Typography>
        <Typography className='text-muted-foreground'>
          We&apos;ve sent a password reset link to your email address.
        </Typography>
        <Link href='/sign-in' className='text-primary inline-block hover:underline'>
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-5'>
      <Typography className='text-muted-foreground text-sm'>
        Enter your email address and we&apos;ll send you a link to reset your password.
      </Typography>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' placeholder='your@email.com' {...register('email')} />
        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      {serverError && <Typography className='text-destructive text-sm'>{serverError}</Typography>}

      <Button type='submit' options='gradient' size='lg' disabled={isLoading} className='w-full'>
        {isLoading ? 'Sending...' : 'Send reset link'}
      </Button>

      <div className='text-center text-sm'>
        <Link href='/sign-in' className='text-primary hover:underline'>
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
