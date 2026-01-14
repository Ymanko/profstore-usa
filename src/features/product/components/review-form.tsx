'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { useState } from 'react';

import { createReview } from '@/shared/actions/create-review';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';
import { getProductReviewsQueryOptions } from '@/shared/queries/reviews/get-product-reviews';

import type { FormEvent } from 'react';

interface ReviewFormProps {
  productId: string;
  className?: string;
}

export function ReviewForm({ productId, className }: ReviewFormProps) {
  const queryClient = useQueryClient();

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; rating: number; title: string; body: string }) => {
      await createReview({
        productId,
        ...data,
      });
    },
    onSuccess: async () => await queryClient.invalidateQueries(getProductReviewsQueryOptions(productId)),
    onError: error => setError(error.message || 'Failed to submit review'),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      throw new Error('Please select a rating');
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    if (!name || !email || !body) {
      throw new Error('Please fill in all required fields');
    }

    mutation.mutate({
      name,
      email,
      rating,
      title,
      body,
    });
  };

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
    <form onSubmit={handleSubmit} className={cn('space-y-5', className)}>
      <Typography variant='h3' className='text-xl font-bold'>
        Leave a Review
      </Typography>

      {/* Rating */}
      <div className='space-y-2'>
        <Typography className='text-sm font-medium'>Rating *</Typography>
        <div className='flex gap-1'>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type='button'
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className='transition-transform hover:scale-110'
            >
              <Star
                className={cn(
                  'size-7',
                  (hoverRating || rating) >= star ? 'fill-accent text-accent' : 'fill-muted-primary text-muted-primary',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name & Email */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Typography className='text-sm font-medium'>Name *</Typography>
          <Input name='name' placeholder='Your name' required />
        </div>
        <div className='space-y-2'>
          <Typography className='text-sm font-medium'>Email *</Typography>
          <Input name='email' type='email' placeholder='your@email.com' required />
        </div>
      </div>

      {/* Title */}
      <div className='space-y-2'>
        <Typography className='text-sm font-medium'>Title</Typography>
        <Input name='title' placeholder='Review title (optional)' />
      </div>

      {/* Body */}
      <div className='space-y-2'>
        <Typography className='text-sm font-medium'>Review *</Typography>
        <textarea
          name='body'
          placeholder='Write your review...'
          required
          rows={4}
          className={cn(
            'border-input placeholder:text-muted-foreground w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          )}
        />
      </div>

      {/* Error */}
      {error && <Typography className='text-sm text-rose-500'>{error}</Typography>}

      {/* Submit */}
      <Button type='submit' disabled={mutation.isPending} className='w-full sm:w-auto'>
        {mutation.isPending ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
