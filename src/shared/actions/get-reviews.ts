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

export async function getProductReviews(productId: string): Promise<JudgeMeReview[]> {
  // Judge.me requires private token for reading reviews
  const privateToken = process.env.JUDGEME_PRIVATE_TOKEN;
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace('https://', '');

  if (!privateToken || !shopDomain) {
    return [];
  }

  // Extract numeric ID from Shopify GID (e.g., "gid://shopify/Product/123" -> "123")
  const numericProductId = productId.split('/').pop();

  // First, try to get reviews using handle from product
  // We'll need to make a different API call structure
  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.set('api_token', privateToken);
  url.searchParams.set('shop_domain', shopDomain);
  url.searchParams.set('per_page', '100');

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return [];
    }

    const data: JudgeMeReviewsResponse = await response.json();
    const allReviews = data.reviews || [];

    // Filter reviews by product_external_id which matches Shopify numeric product ID
    return allReviews.filter(review => {
      return review.product_external_id?.toString() === numericProductId;
    });
  } catch (_error) {
    return [];
  }
}
