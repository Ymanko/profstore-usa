'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateCustomer } from '@/shared/actions/auth/update-customer';
import { verifyPassword } from '@/shared/actions/auth/verify-password';
import { Button } from '@/shared/components/ui/button';
import { PasswordField } from '@/shared/components/ui/form';
import { useAuth } from '@/shared/providers/auth-provider';

const ChangePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(6, 'Old password must be at least 6 characters long'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });

export type ChangePasswordFormType = z.infer<typeof ChangePasswordFormSchema>;

export function ChangePasswordForm() {
  const { customer } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  async function onSubmit(data: ChangePasswordFormType) {
    if (!customer?.email) {
      alert('Unable to verify identity. Please try logging in again.');
      return;
    }

    setIsLoading(true);

    try {
      // Verify old password first
      const isValidPassword = await verifyPassword({
        email: customer.email,
        password: data.oldPassword,
      });

      if (!isValidPassword) {
        alert('Current password is incorrect');
        setIsLoading(false);
        return;
      }

      // Update to new password
      const result = await updateCustomer({
        password: data.newPassword,
      });

      if (result.success) {
        alert('Password changed successfully!');
        reset();
      } else {
        alert(result.error || 'Failed to change password');
      }
    } catch {
      alert('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-5'>
        <PasswordField
          name='oldPassword'
          label='Old Password'
          registration={register('oldPassword')}
          error={errors.oldPassword}
          isTouched={touchedFields.oldPassword}
        />
        <PasswordField
          name='newPassword'
          label='New Password'
          registration={register('newPassword')}
          error={errors.newPassword}
          isTouched={touchedFields.newPassword}
        />
        <PasswordField
          name='confirmPassword'
          label='Confirm password'
          registration={register('confirmPassword')}
          error={errors.confirmPassword}
          isTouched={touchedFields.confirmPassword}
        />

        <Button type='submit' options='gradient' size='lg' className='mt-8 px-10' disabled={isLoading}>
          {isLoading ? 'Changing...' : 'Change password'}
        </Button>
      </div>
    </form>
  );
}
