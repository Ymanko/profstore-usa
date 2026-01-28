'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useAuth } from '@/shared/providers/auth-provider';
import { getWishlistWithUrlsQueryOptions } from '@/shared/queries/wishlist/get-wishlist-with-urls';

export function useWishlist() {
  const { customer } = useAuth();
  const { data, isLoading } = useQuery(getWishlistWithUrlsQueryOptions(customer?.id ?? ''));

  const wishlistItems = useMemo(() => data?.result || [], [data?.result]);

  // Create a Set of product IDs for O(1) lookup
  const wishlistProductIds = useMemo(() => new Set(wishlistItems.map(item => item.id)), [wishlistItems]);

  // Create a Set of variant IDs for O(1) lookup
  const wishlistVariantIds = useMemo(
    () => new Set(wishlistItems.map(item => item.variant.id)),
    [wishlistItems],
  );

  const isInWishlist = (productId: string) => {
    // Check by numeric ID (iWish format)
    if (wishlistProductIds.has(productId)) return true;

    // Check by extracting numeric ID from Shopify global ID
    const numericId = productId.split('/').pop();
    if (numericId && wishlistProductIds.has(numericId)) return true;

    return false;
  };

  const isVariantInWishlist = (variantId: string) => {
    // Check by full ID
    if (wishlistVariantIds.has(variantId)) return true;

    // Check by extracting numeric ID from Shopify global ID
    const numericId = variantId.split('/').pop();
    if (numericId && wishlistVariantIds.has(numericId)) return true;

    return false;
  };

  return {
    items: wishlistItems,
    count: wishlistItems.length,
    isLoading,
    isInWishlist,
    isVariantInWishlist,
  };
}
