'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateCustomer } from '@/shared/actions/auth/update-customer';
import { Button } from '@/shared/components/ui/button';
import { FormField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useAuth } from '@/shared/providers/auth-provider';

const ContactInfoFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{6,14}$/, 'Use E.164 format, e.g. +14592868272')
    .optional()
    .or(z.literal('')),
});

export type ContactInfoFormType = z.infer<typeof ContactInfoFormSchema>;

export function ContactInfoForm() {
  const { customer } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<ContactInfoFormType>({
    resolver: zodResolver(ContactInfoFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    values: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
    },
  });

  async function onSubmit(data: ContactInfoFormType) {
    // Only include fields that were changed
    const changedFields: Parameters<typeof updateCustomer>[0] = {};

    if (dirtyFields.firstName) changedFields.firstName = data.firstName;
    if (dirtyFields.lastName) changedFields.lastName = data.lastName;
    if (dirtyFields.email) changedFields.email = data.email;
    if (dirtyFields.phone) changedFields.phone = data.phone || undefined;

    // If no fields changed, don't submit
    if (Object.keys(changedFields).length === 0) {
      alert('No changes to save');
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateCustomer(changedFields);

      if (result.success) {
        alert('Profile updated successfully!');
        router.refresh();
      } else {
        alert(result.error || 'Failed to update profile');
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
        <FormField label='Name' name='firstName' errors={errors}>
          <Input
            placeholder='Name'
            {...register('firstName')}
            aria-invalid={!!errors.firstName}
            data-valid={touchedFields.firstName && !errors.firstName}
          />
        </FormField>

        <FormField label='Last Name' name='lastName' errors={errors}>
          <Input
            placeholder='Last Name'
            {...register('lastName')}
            aria-invalid={!!errors.lastName}
            data-valid={touchedFields.lastName && !errors.lastName}
          />
        </FormField>

        <FormField label='E-mail / Login' name='email' errors={errors}>
          <Input
            type='email'
            placeholder='your@email.com'
            {...register('email')}
            aria-invalid={!!errors.email}
            data-valid={touchedFields.email && !errors.email}
          />
        </FormField>

        <FormField label='Phone' name='phone' errors={errors}>
          <Input
            type='tel'
            placeholder='+10000000000'
            {...register('phone')}
            aria-invalid={!!errors.phone}
            data-valid={touchedFields.phone && !errors.phone}
          />
        </FormField>

        <Button type='submit' options='gradient' size='lg' className='mt-8 px-10' disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save information'}
        </Button>
      </div>
    </form>
  );
}
