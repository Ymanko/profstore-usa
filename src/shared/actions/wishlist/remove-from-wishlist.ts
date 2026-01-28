'use server';

interface RemoveFromWishlistParams {
  customer_id: number;
  variant_id: number;
  category_id?: number;
}

export async function removeFromWishlist(params: RemoveFromWishlistParams) {
  const searchParams = new URLSearchParams({
    customer_id: String(params.customer_id),
    variant_id: String(params.variant_id),
    category_id: String(params.category_id || 0),
  });

  const url = `${process.env.WISHLIST_API_URL}/removeWishlist?${searchParams.toString()}`;
  const options = {
    method: 'DELETE',
    headers: {
      xtoken: process.env.NEXT_PUBLIC_WISHLIST_APP_TOKEN!,
      Accept: 'application/json',
    },
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
    console.error('Failed to remove from wishlist:', error);
    throw error;
  }
}
