'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUpSchema } from '@/features/auth/schemas/auth-schemas';
import { login } from '@/shared/actions/auth/login';
import { register as registerAction } from '@/shared/actions/auth/register';
import { Button } from '@/shared/components/ui/button';
import { FormField, PasswordField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Typography } from '@/shared/components/ui/typography';
import type { SignUpFormValues } from '@/features/auth/schemas/auth-schemas';

export function SignUpForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const registerMutation = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      const registerResult = await registerAction(data);

      if (!registerResult.success) {
        throw new Error(registerResult.error || 'Registration failed');
      }
      const loginResult = await login({ email: data.email, password: data.password });

      if (!loginResult.success) {
        throw new Error('Registration successful but login failed');
      }

      return { registerResult, loginResult };
    },
    onSuccess: () => {
      router.push('/profile');
      router.refresh();
    },
    onError: (error: Error) => {
      setServerError(error.message);
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    setServerError(null);
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-5'>
      <FormField label='First name' name='firstName' errors={errors}>
        <Input placeholder='First name' {...register('firstName')} />
      </FormField>

      <FormField label='Last name' name='lastName' errors={errors}>
        <Input placeholder='Last name' {...register('lastName')} />
      </FormField>

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

      {serverError && <Typography className='text-destructive text-sm'>{serverError}</Typography>}

      <Button type='submit' options='gradient' size='lg' disabled={registerMutation.isPending} className='w-full'>
        {registerMutation.isPending ? 'Creating account...' : 'Create account'}
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
