'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { PasswordField } from '@/shared/components/ui/form';

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
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  function onSubmit(data: ChangePasswordFormType) {
    // TODO: call customerUpdate server action with password
    console.log('Change password:', data);
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

        <Button type='submit' options='gradient' size='lg' className='mt-8 px-10'>
          Change password
        </Button>
      </div>
    </form>
  );
}
