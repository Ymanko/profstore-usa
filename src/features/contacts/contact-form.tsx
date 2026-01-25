'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { FormField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // TODO: Implement contact form submission
    console.log('Contact form:', data);
    reset();
  };

  if (isSubmitSuccessful) {
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

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='space-y-5'>
          <FormField label='Your Name' name='name' errors={errors}>
            <Input {...register('name')} placeholder='Your Name' />
          </FormField>

          <FormField label='E-Mail for communication' name='email' errors={errors}>
            <Input {...register('email')} type='email' placeholder='E-Mail' />
          </FormField>
        </div>

        <FormField label='Message' name='message' errors={errors}>
          <textarea
            {...register('message')}
            placeholder='Message'
            rows={5}
            className={cn(
              'border-input w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none md:text-sm',
              'placeholder:text-muted-foreground shadow-xs transition-[color,box-shadow]',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'h-full min-h-32 resize-none',
            )}
          />
        </FormField>
      </div>

      <div className='mt-8 flex justify-center'>
        <Button type='submit' options='gradient' size='lg' disabled={isSubmitting} className='px-16'>
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
}
