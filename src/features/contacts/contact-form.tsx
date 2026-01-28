'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { sendContactForm } from '@/shared/actions/contact/send-contact-form';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { FormField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyPolicy: z.boolean().refine(val => val === true, 'You must agree to the Privacy Policy'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const result = await sendContactForm({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    if (result.success) {
      setIsSuccess(true);
      reset();
    } else {
      alert(result.error || 'Failed to send message');
    }
  };

  if (isSuccess) {
    return (
      <div className='rounded-xl border p-6 text-center'>
        <Typography className='text-secondary text-lg font-bold'>Thank you for your message!</Typography>
        <Typography className='text-muted-foreground mt-2'>We will get back to you soon.</Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h2' className='mb-8'>
        Contact form
      </Typography>

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-5'>
          <FormField label='Your Name' name='name' errors={errors}>
            <Input {...register('name')} placeholder='Your Name' />
          </FormField>

          <FormField label='E-Mail' name='email' errors={errors}>
            <Input {...register('email')} type='email' placeholder='E-Mail' />
          </FormField>

          <FormField label='Phone' name='phone' errors={errors}>
            <Input {...register('phone')} type='tel' placeholder='+10000000000' />
          </FormField>

          <FormField label='Subject' name='subject' errors={errors}>
            <Input {...register('subject')} placeholder='Subject' />
          </FormField>
        </div>

        <div>
          <FormField label='Message' name='message' errors={errors}>
            <textarea
              {...register('message')}
              placeholder='Message'
              className={cn(
                'border-input h-full min-h-29.5 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none',
                'placeholder:text-muted-foreground shadow-xs transition-[color,box-shadow]',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              )}
            />
          </FormField>
        </div>
      </div>

      <div className='mt-6'>
        <Controller
          name='privacyPolicy'
          control={control}
          render={({ field }) => (
            <label className='flex cursor-pointer items-start gap-3'>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} className='mt-0.5' />
              <span className='text-muted-foreground text-sm'>
                I agree to the{' '}
                <Link href='/privacy-policy' className='text-primary underline hover:no-underline'>
                  Privacy Policy
                </Link>
              </span>
            </label>
          )}
        />
        {errors.privacyPolicy && <p className='text-destructive mt-1 text-sm'>{errors.privacyPolicy.message}</p>}
      </div>

      <div className='mt-8 flex justify-center'>
        <Button type='submit' options='gradient' size='lg' disabled={isSubmitting} className='px-16'>
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
}
