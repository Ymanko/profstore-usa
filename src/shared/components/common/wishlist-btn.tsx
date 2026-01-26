'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addToWishlist } from '@/shared/actions/wishlist/add-to-wishlist';
import { Icon } from '@/shared/components/common/icon';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/shared/providers/auth-provider';
import { getWishlistQueryOptions } from '@/shared/queries/wishlist/get-wishlist';
import { extractNumericId } from '@/shared/utils/extract-numeric-id';

import type { ComponentProps } from 'react';

interface WishlistBtnProps extends ComponentProps<'button'> {
  productId: string;
  variantId?: string;
}

export function WishlistBtn({ className, productId, variantId, ...props }: WishlistBtnProps) {
  const { customer } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: async () => {
      const queryKey = getWishlistQueryOptions(customer?.id ?? '').queryKey;
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: error => {
      alert(error.message);
    },
  });

  function onAddToWishList() {
    if (!customer?.id) {
      alert('Please sign in to add items to wishlist');
      return;
    }

    if (!variantId) {
      alert('Product variant not available');
      return;
    }

    mutation.mutate({
      customer_id: extractNumericId(customer.id),
      product_id: extractNumericId(productId),
      variant_id: extractNumericId(variantId),
    });
  }

  return (
    <button
      className={cn(
        'text-muted-foreground flex size-10 items-center justify-center rounded-lg',
        'hover:text-accent transition-colors duration-200',
        className,
      )}
      onClick={onAddToWishList}
      type='button'
      aria-label='Add to wishlist'
      {...props}
    >
      <Icon name='heart' width={18} height={18} />
    </button>
  );
}
