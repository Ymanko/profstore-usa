import type { JudgeMeReview } from '@/shared/actions/get-reviews';

export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function calculateReviewStats(reviews: JudgeMeReview[]) {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      breakdown: [
        { stars: 5, count: 0 },
        { stars: 4, count: 0 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 },
      ],
    };
  }

  const sumRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = sumRatings / totalReviews;

  const breakdown = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
  }));

  return { averageRating, totalReviews, breakdown };
}

export function transformReviews(reviews: JudgeMeReview[]) {
  return reviews.map(review => ({
    id: String(review.id),
    author: review.reviewer.name,
    date: formatReviewDate(review.created_at),
    rating: review.rating,
    content: review.body,
  }));
}
