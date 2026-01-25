'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { FormField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

const ContactInfoFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email(),
  dateOfBirth: z.string().nonempty('Date of birth is required'),
  phone: z.string().nonempty('Phone number is required'),
});

export type ContactInfoFormType = z.infer<typeof ContactInfoFormSchema>;

export function ContactInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ContactInfoFormType>({
    resolver: zodResolver(ContactInfoFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  function onSubmit(data: ContactInfoFormType) {
    // TODO: call customerUpdate server action
    console.log('Contact info:', data);
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

        <FormField label='Date of birth' name='dateOfBirth' errors={errors}>
          <Input
            placeholder='YYYY - MM - DD'
            {...register('dateOfBirth')}
            aria-invalid={!!errors.dateOfBirth}
            data-valid={touchedFields.dateOfBirth && !errors.dateOfBirth}
          />
        </FormField>

        <FormField label='Phone' name='phone' errors={errors}>
          <Input
            type='tel'
            placeholder='+1 (000) 000-0000'
            {...register('phone')}
            aria-invalid={!!errors.phone}
            data-valid={touchedFields.phone && !errors.phone}
          />
        </FormField>

        <Button type='submit' options='gradient' size='lg' className='mt-8 px-10'>
          Save information
        </Button>
      </div>
    </form>
  );
}
