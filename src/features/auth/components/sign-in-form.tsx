'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signInSchema } from '@/features/auth/schemas/auth-schemas';
import { login } from '@/shared/actions/auth/login';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Typography } from '@/shared/components/ui/typography';
import { useAuth } from '@/shared/providers/auth-provider';

import type { SignInFormValues } from '@/features/auth/schemas/auth-schemas';

export function SignInForm() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setServerError(null);
    setIsLoading(true);

    const result = await login(data);

    if (result.success) {
      setIsAuthenticated(true);
      router.push('/profile');
      router.refresh();
    } else {
      setServerError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' placeholder='your@email.com' {...register('email')} />
        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' placeholder='Enter your password' {...register('password')} />
        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      {serverError && <Typography className='text-destructive text-sm'>{serverError}</Typography>}

      <Button type='submit' options='gradient' size='lg' disabled={isLoading} className='w-full'>
        {isLoading ? 'Signing in...' : 'Sign in'}
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
