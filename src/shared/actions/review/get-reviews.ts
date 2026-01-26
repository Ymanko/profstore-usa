'use server';

export interface JudgeMeReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  product_external_id: number | string;
  product_title: string;
  product_handle: string;
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

const BASE_URL = 'https://judge.me/api/v1';

async function getJudgeMeProductId(
  externalId: string,
  privateToken: string,
  shopDomain: string,
): Promise<number | null> {
  const url = new URL(`${BASE_URL}/products/-1`);

  url.searchParams.set('api_token', privateToken);
  url.searchParams.set('shop_domain', shopDomain);
  url.searchParams.set('external_id', externalId);

  const response = await fetch(url.toString(), { cache: 'no-store' });

  if (!response.ok) return null;

  const data = await response.json();
  return data.product?.id || null;
}

export async function getProductReviews(productId: string): Promise<JudgeMeReview[]> {
  const privateToken = process.env.JUDGEME_PRIVATE_TOKEN;
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace('https://', '');

  if (!privateToken || !shopDomain) {
    throw new Error('Judge.me private token or Shopify store domain is not set in environment variables.');
  }

  const externalProductId = productId.split('/').pop() || '';

  const judgeMeProductId = await getJudgeMeProductId(externalProductId, privateToken, shopDomain);

  if (!judgeMeProductId) {
    return [];
  }

  const url = new URL(`${BASE_URL}/reviews`);
  url.searchParams.set('api_token', privateToken);
  url.searchParams.set('shop_domain', shopDomain);
  url.searchParams.set('product_id', judgeMeProductId.toString());
  url.searchParams.set('per_page', '50');

  try {
    const response = await fetch(url.toString(), { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
    }

    const data: JudgeMeReviewsResponse = await response.json();
    return data.reviews || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching product reviews:', error);
    return [];
  }
}
