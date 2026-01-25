'use server';

import type { WishlistItem } from '@/shared/queries/wishlist/types';

export async function addToWishlist(data: WishlistItem) {
  const url = `${process.env.WISHLIST_API_URL}/addToWishlist`;
  const options = {
    method: 'POST',
    headers: {
      xtoken: process.env.NEXT_PUBLIC_WISHLIST_APP_TOKEN!,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      customer_id: String(data.customer_id),
      product_id: String(data.product_id),
      variant_id: String(data.variant_id),
      category_id: String(data.category_id || 0),
      product_qty: String(data.product_qty || 1),
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to add to wishlist:', error);
    throw error;
  }
}
