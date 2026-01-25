'use server';

import type { WishlistGetData } from '@/shared/queries/wishlist/types';

export async function getWishlistData(customer_id: number): Promise<WishlistGetData> {
  const url = `${process.env.WISHLIST_API_URL}/fetchWishlistData/${customer_id}`;
  const options = {
    method: 'GET',
    headers: {
      xtoken: process.env.NEXT_PUBLIC_WISHLIST_APP_TOKEN!,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch wishlist data:', error);
    return {
      total_records: 0,
      current_page: 1,
      prev_page: 0,
      next_page: 0,
      result: [],
    };
  }
}
