'use server';

export interface JudgeMeReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: {
    id: number;
    email: string;
    name: string;
    phone: string | null;
  };
  created_at: string;
  updated_at: string;
  verified: string;
  source: string;
  curated: string;
  published: boolean;
  hidden: boolean;
  featured: boolean;
  has_published_pictures: boolean;
  has_published_videos: boolean;
  pictures: Array<{
    urls: {
      original: string;
      small: string;
      compact: string;
      huge: string;
    };
  }>;
}

interface JudgeMeReviewsResponse {
  reviews: JudgeMeReview[];
}

export async function getProductReviews(productId: string): Promise<JudgeMeReview[]> {
  // Judge.me requires private token for reading reviews
  const privateToken = process.env.JUDGEME_PRIVATE_TOKEN;
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace('https://', '');

  if (!privateToken || !shopDomain) {
    console.warn('Judge.me private token or shop domain not configured');
    return [];
  }

  const numericProductId = productId.split('/').pop();

  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.set('api_token', privateToken);
  url.searchParams.set('shop_domain', shopDomain);
  url.searchParams.set('external_id', numericProductId || '');
  url.searchParams.set('per_page', '50');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Failed to fetch reviews:', response.status, error);
      return [];
    }

    const data = await response.json();
    return data.reviews || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}
