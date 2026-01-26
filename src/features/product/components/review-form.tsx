'use client';

import { Star } from 'lucide-react';

import { useReviewForm } from '@/features/product/hooks/use-review-form';
import { Button } from '@/shared/components/ui/button';
import { ErrorMessage, FormField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ProductIdProps } from '@/shared/types/common';

export function ReviewForm({ productId, className }: ProductIdProps & { className?: string }) {
  const { form, hoverRating, setHoverRating, rating, setRating, mutation, onSubmit } = useReviewForm({ productId });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  if (mutation.isSuccess) {
    return (
      <div className={cn('rounded-xl border p-6 text-center', className)}>
        <Typography className='text-secondary text-lg font-bold'>Thank you for your review!</Typography>
        <Typography className='text-muted-foreground mt-2'>
          Your review has been submitted and is pending approval.
        </Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('space-y-5', className)}>
        <Typography variant='h3' className='text-xl font-bold'>
          Leave a Review
        </Typography>

        {/* Rating */}
        <FormField name='rating' label='Rating *' errors={errors}>
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type='button'
                onClick={() => {
                  setValue('rating', star, { shouldValidate: true });
                  setRating(star);
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className='transition-transform hover:scale-110'
              >
                <Star
                  className={cn(
                    'size-7',
                    (hoverRating || rating) >= star
                      ? 'fill-accent text-accent'
                      : 'fill-muted-primary text-muted-primary',
                  )}
                />
              </button>
            ))}
          </div>
        </FormField>

        {/* Name & Email */}
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField label='Name *' name='name' errors={errors}>
            <Input {...register('name')} placeholder='Your name' />
          </FormField>

          <FormField label='Email *' name='email' errors={errors}>
            <Input {...register('email')} type='email' placeholder='your@email.com' />
          </FormField>
        </div>

        {/* Title */}
        <FormField label='Title' name='title' errors={errors}>
          <Input {...register('title')} placeholder='Review title (optional)' />
        </FormField>

        {/* Body */}
        <FormField label='Review *' name='body' errors={errors}>
          <textarea
            {...register('body')}
            placeholder='Write your review...'
            rows={4}
            className={cn(
              'border-input w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none md:text-sm',
              'placeholder:text-muted-foreground shadow-xs transition-[color,box-shadow]',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            )}
          />
        </FormField>

        {/* Error */}
        {mutation.isError && <ErrorMessage>{mutation.error.message}</ErrorMessage>}

        {/* Submit */}
        <Button type='submit' disabled={mutation.isPending} className='w-full sm:w-auto'>
          {mutation.isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </form>
  );
}
