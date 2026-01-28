'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addToWishlist } from '@/shared/actions/wishlist/add-to-wishlist';
import { removeFromWishlist } from '@/shared/actions/wishlist/remove-from-wishlist';
import { Icon } from '@/shared/components/common/icon';
import { useWishlist } from '@/shared/hooks/use-wishlist';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/shared/providers/auth-provider';
import { getWishlistWithUrlsQueryOptions } from '@/shared/queries/wishlist/get-wishlist-with-urls';
import { extractNumericId } from '@/shared/utils/extract-numeric-id';

import type { ComponentProps } from 'react';

interface WishlistBtnProps extends ComponentProps<'button'> {
  productId: string;
  variantId?: string;
}

export function WishlistBtn({ className, productId, variantId, ...props }: WishlistBtnProps) {
  const { customer } = useAuth();
  const queryClient = useQueryClient();
  const { isInWishlist } = useWishlist();

  const isInList = isInWishlist(productId);

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: async () => {
      const queryKey = getWishlistWithUrlsQueryOptions(customer?.id ?? '').queryKey;
      await queryClient.invalidateQueries({ queryKey });
      alert('Added to wishlist!');
    },
    onError: error => {
      alert(error.message);
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: async () => {
      const queryKey = getWishlistWithUrlsQueryOptions(customer?.id ?? '').queryKey;
      await queryClient.invalidateQueries({ queryKey });
      alert('Removed from wishlist!');
    },
    onError: error => {
      alert(error.message);
    },
  });

  const isLoading = addMutation.isPending || removeMutation.isPending;

  function handleClick() {
    if (!customer?.id) {
      alert('Please sign in to add items to wishlist');
      return;
    }

    if (!variantId) {
      alert('Product variant not available');
      return;
    }

    if (isInList) {
      removeMutation.mutate({
        customer_id: extractNumericId(customer.id),
        variant_id: extractNumericId(variantId),
      });
    } else {
      addMutation.mutate({
        customer_id: extractNumericId(customer.id),
        product_id: extractNumericId(productId),
        variant_id: extractNumericId(variantId),
      });
    }
  }

  return (
    <button
      className={cn(
        'flex size-10 items-center justify-center rounded-lg transition-colors duration-200',
        isInList ? 'text-accent pointer-events-none' : 'text-muted-foreground hover:text-accent',
        isLoading && 'pointer-events-none opacity-50',
        className,
      )}
      onClick={handleClick}
      type='button'
      disabled={isLoading}
      aria-label={isInList ? 'Remove from wishlist' : 'Add to wishlist'}
      {...props}
    >
      <Icon name='heart' width={18} height={18} fill={isInList ? 'currentColor' : 'none'} />
    </button>
  );
}
