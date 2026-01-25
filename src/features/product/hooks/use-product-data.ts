import {
  calculateReviewStats,
  transformCharacteristics,
  transformFiles,
  transformReviews,
  transformVideos,
} from '@/features/product/utils/helpers';
import { parseContentBlocks } from '@/shared/utils/parsers/parse-content-blocks';

import type { JudgeMeReview } from '@/shared/actions/review/get-reviews';
import type { ProductData } from '@/shared/queries/products/types';

export function useProductData(product: ProductData['product'], reviews: JudgeMeReview[]) {
  const images = product?.images.edges.map(edge => edge.node) || [];
  const reviewStats = calculateReviewStats(reviews);
  const formattedReviews = transformReviews(reviews);
  const productFiles = transformFiles(product?.files);
  const descriptionBlocks = parseContentBlocks(product?.fullDescription?.references);
  const characteristics = transformCharacteristics(product);
  const videos = transformVideos(product);

  return {
    images,
    videos,
    reviewStats,
    productFiles,
    characteristics,
    formattedReviews,
    descriptionBlocks,
  };
}
