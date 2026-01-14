'use server';

interface CreateReviewData {
  productId: string;
  name: string;
  email: string;
  rating: number;
  title?: string;
  body: string;
}

interface CreateReviewResponse {
  success: boolean;
  error?: string;
}

export async function createReview(data: CreateReviewData): Promise<CreateReviewResponse> {
  const privateToken = process.env.JUDGEME_PRIVATE_TOKEN;
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace('https://', '');

  if (!privateToken) {
    return { success: false, error: 'Judge.me token not configured' };
  }

  if (!shopDomain) {
    return { success: false, error: 'Shop domain not configured' };
  }

  const numericProductId = data.productId.split('/').pop();

  try {
    const response = await fetch('https://judge.me/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_domain: shopDomain,
        platform: 'shopify',
        id: numericProductId,
        email: data.email,
        name: data.name,
        rating: data.rating,
        title: data.title || '',
        body: data.body,
        api_token: privateToken,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed to create review: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
