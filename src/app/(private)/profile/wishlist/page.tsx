'use client';

import { useQuery } from '@tanstack/react-query';

import { NotFound } from '@/features/layout/not-found';
import { List } from '@/shared/components/common/list';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { useAuth } from '@/shared/providers/auth-provider';
import { getWishlistQueryOptions } from '@/shared/queries/wishlist/get-wishlist';
import { transformWishlistToProduct } from '@/shared/utils/transform-wishlis-to-product';

export default function WishlistPage() {
  const { customer } = useAuth();
  const { data, isLoading } = useQuery(getWishlistQueryOptions(customer?.id ?? ''));

  const wishlistItems = data?.result || [];
  const hasItems = wishlistItems.length > 0;

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
          renderItem={item => (
            <ProductCard product={transformWishlistToProduct(item)} href={`/${item.handle}`} showDiscountBadge />
          )}
          keyExtractor={item => item.id}
          className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        />
      </Show>
    </div>
  );
}
