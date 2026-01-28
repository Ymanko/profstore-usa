'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { NotFound } from '@/features/layout/not-found';
import { removeFromWishlist } from '@/shared/actions/wishlist/remove-from-wishlist';
import { List } from '@/shared/components/common/list';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { useAuth } from '@/shared/providers/auth-provider';
import { getWishlistWithUrlsQueryOptions } from '@/shared/queries/wishlist/get-wishlist-with-urls';
import { extractNumericId } from '@/shared/utils/extract-numeric-id';
import { transformWishlistToProduct } from '@/shared/utils/transform-wishlis-to-product';

export default function WishlistPage() {
  const { customer } = useAuth();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getWishlistWithUrlsQueryOptions(customer?.id ?? ''));
  const [removingId, setRemovingId] = useState<string | null>(null);

  const wishlistItems = useMemo(() => data?.result || [], [data?.result]);
  const hasItems = wishlistItems.length > 0;

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: async () => {
      const queryKey = getWishlistWithUrlsQueryOptions(customer?.id ?? '').queryKey;
      await queryClient.invalidateQueries({ queryKey });
      setRemovingId(null);
    },
    onError: () => {
      setRemovingId(null);
    },
  });

  const handleRemove = (variantId: string) => {
    if (!customer?.id) return;

    setRemovingId(variantId);
    removeMutation.mutate({
      customer_id: extractNumericId(customer.id),
      variant_id: extractNumericId(variantId),
    });
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <Show when={hasItems}>
          <Typography className='text-muted-foreground text-sm'>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </Typography>
        </Show>
      </div>

      {/* Loading State */}
      <Show when={isLoading}>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='bg-muted h-96 animate-pulse rounded-lg' />
          ))}
        </div>
      </Show>

      {/* Empty State */}
      <Show when={!isLoading && !hasItems}>
        <NotFound>Your wishlist is empty</NotFound>
      </Show>

      {/* Wishlist Grid */}
      <Show when={!isLoading && hasItems}>
        <List
          data={wishlistItems}
          renderItem={item => {
            const isRemoving = removingId === item.variant.id;

            return (
              <>
                <ProductCard
                  product={transformWishlistToProduct(item)}
                  href={item.productUrl}
                  showDiscountBadge
                  onRemove={() => handleRemove(item.variant.id)}
                  className={isRemoving ? 'pointer-events-none opacity-50' : ''}
                />
                <Show when={isRemoving}>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='border-primary size-8 animate-spin rounded-full border-2 border-t-transparent' />
                  </div>
                </Show>
              </>
            );
          }}
          keyExtractor={item => item.id}
          className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          itemClassName='h-full relative'
        />
      </Show>
    </div>
  );
}
