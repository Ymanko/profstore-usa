'use client';

import { Star } from 'lucide-react';
import { useState, useTransition } from 'react';

import { createReview } from '@/shared/actions/create-review';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
  className?: string;
}

export function ReviewForm({ productId, onSuccess, className }: ReviewFormProps) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    if (!name || !email || !body) {
      setError('Please fill in all required fields');
      return;
    }

    startTransition(async () => {
      const result = await createReview({
        productId,
        name,
        email,
        rating,
        title,
        body,
      });

      if (result.success) {
        setSuccess(true);
        onSuccess?.();
      } else {
        setError(result.error || 'Failed to submit review');
      }
    });
  };

  if (success) {
    return (
      <div className={cn('rounded-xl border p-6 text-center', className)}>
        <Typography className='text-lg font-bold text-green-600'>Thank you for your review!</Typography>
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
      {error && <Typography className='text-sm text-red-500'>{error}</Typography>}

      {/* Submit */}
      <Button type='submit' disabled={isPending} className='w-full sm:w-auto'>
        {isPending ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
