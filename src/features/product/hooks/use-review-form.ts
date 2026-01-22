import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createReview } from '@/shared/actions/create-review';
import { getProductReviewsQueryOptions } from '@/shared/queries/reviews/get-product-reviews';

import type { ProductIdProps } from '@/shared/types/common';

const ReviewFormSchema = z.object({
  rating: z.number().min(1, 'Rating is required.').max(5, 'Rating must be at most 5.'),
  name: z.string().min(1, 'Name is required.'),
  email: z.email('Invalid email address.'),
  title: z.string().optional(),
  body: z.string().min(10, 'Review body must be at least 10 characters.'),
});

export type ReviewFormType = z.infer<typeof ReviewFormSchema>;

export function useReviewForm({ productId }: ProductIdProps) {
  const queryClient = useQueryClient();

  const [hoverRating, setHoverRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const form = useForm<ReviewFormType>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormType) => {
      await createReview({
        productId,
        ...data,
      });
    },
    onSuccess: async () => await queryClient.invalidateQueries(getProductReviewsQueryOptions(productId)),
  });

  function onSubmit(data: ReviewFormType) {
    mutation.mutate(data);
  }

  return {
    form,
    hoverRating,
    setHoverRating,
    rating,
    setRating,
    mutation,
    onSubmit,
  };
}
