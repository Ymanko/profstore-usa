'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signInSchema } from '@/features/auth/schemas/auth-schemas';
import { login } from '@/shared/actions/auth/login';
import { Button } from '@/shared/components/ui/button';
import { FormField, PasswordField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import type { SignInFormValues } from '@/features/auth/schemas/auth-schemas';

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: result => {
      if (!result.success) throw new Error(result.error || 'Login failed');

      const redirectTo = searchParams.get('redirect') || '/profile';
      router.push(redirectTo);
      router.refresh();
    },
    onError: error => {
      setServerError((error as Error).message);
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setServerError(null);
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-5'>
      <FormField label='Email' name='email' errors={errors}>
        <Input type='email' placeholder='your@email.com' {...register('email')} />
      </FormField>

      <PasswordField
        name='password'
        label='Password'
        registration={register('password')}
        error={errors.password}
        isTouched={touchedFields.password}
      />

      {serverError && <Typography className='text-destructive text-center text-sm'>{serverError}</Typography>}

      <Button type='submit' options='gradient' size='lg' disabled={loginMutation.isPending} className='w-full'>
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>

      <div className='flex justify-between text-sm'>
        <Link href='/sign-up' className='text-primary hover:underline'>
          Create account
        </Link>

        <Link href='/forgot-password' className='text-primary hover:underline'>
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
