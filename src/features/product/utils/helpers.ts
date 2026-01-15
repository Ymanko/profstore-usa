import type { ProductFile } from '@/features/product/components/product-files';
import type { JudgeMeReview } from '@/shared/actions/get-reviews';
import type { ProductData } from '@/shared/queries/products/get-product';

type FilesMetafield = NonNullable<NonNullable<ProductData['product']>['files']>;

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

export function transformFiles(filesMetafield: FilesMetafield | null | undefined): ProductFile[] {
  if (!filesMetafield?.references?.edges) return [];

  return filesMetafield.references.edges.map(edge => {
    const fields = edge.node.fields;
    const getField = (key: string) => fields.find(f => f.key === key);

    return {
      handle: edge.node.handle,
      title: getField('title')?.value || 'Untitled',
      category: (getField('category')?.value as 'file' | 'manual') || 'file',
      url: getField('file')?.reference?.url || '',
      fileSize: getField('file')?.reference?.originalFileSize || 0,
      mimeType: getField('file')?.reference?.mimeType || '',
    };
  });
}

export function getPrice(currencyCode: string, amount: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function transformCharacteristics(product: ProductData['product']) {
  return product?.characteristics?.references.edges.map(edge => ({
    title: edge.node.fields.find(f => f.key === 'name')?.value,
    description: edge.node.fields.find(f => f.key === 'value')?.value,
  }));
}

export function transformVideos(product: ProductData['product']) {
  return (
    product?.videos?.references.edges.map(edge => ({
      id: edge.node.handle,
      title: edge.node.fields.find(f => f.key === 'title')?.value || 'Untitled',
      description: edge.node.fields.find(f => f.key === 'description')?.value || '',
      url: edge.node.fields.find(f => f.key === 'url')?.value || '',
    })) || []
  );
}
