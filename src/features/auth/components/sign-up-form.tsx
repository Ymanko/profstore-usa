'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUpSchema } from '@/features/auth/schemas/auth-schemas';
import { login } from '@/shared/actions/auth/login';
import { register as registerAction } from '@/shared/actions/auth/register';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Typography } from '@/shared/components/ui/typography';
import { useAuth } from '@/shared/providers/auth-provider';

import type { SignUpFormValues } from '@/features/auth/schemas/auth-schemas';

export function SignUpForm() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setServerError(null);
    setIsLoading(true);

    const registerResult = await registerAction(data);

    if (!registerResult.success) {
      setServerError(registerResult.error || 'Registration failed');
      setIsLoading(false);
      return;
    }

    // Auto-login after registration
    const loginResult = await login({ email: data.email, password: data.password });
    if (loginResult.success) {
      setIsAuthenticated(true);
      router.push('/profile');
      router.refresh();
    } else {
      router.push('/sign-in');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor='firstName'>First name</Label>
        <Input id='firstName' placeholder='First name' {...register('firstName')} />
        {errors.firstName && <p className='text-destructive text-sm'>{errors.firstName.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='lastName'>Last name</Label>
        <Input id='lastName' placeholder='Last name' {...register('lastName')} />
        {errors.lastName && <p className='text-destructive text-sm'>{errors.lastName.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' placeholder='your@email.com' {...register('email')} />
        {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' placeholder='At least 5 characters' {...register('password')} />
        {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
      </div>

      {serverError && <Typography className='text-destructive text-sm'>{serverError}</Typography>}

      <Button type='submit' options='gradient' size='lg' disabled={isLoading} className='w-full'>
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>

      <div className='text-center text-sm'>
        Already have an account?{' '}
        <Link href='/sign-in' className='text-primary hover:underline'>
          Sign in
        </Link>
      </div>
    </form>
  );
}
