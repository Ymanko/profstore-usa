import { getLastSegment } from './getLastSegment';

import type { ProductEdge } from '@/lib/graphql/graphql';

export function parsePopularProductsData(products: ProductEdge[]) {
  return products.map(product => {
    const node = product.node;
    return {
      productId: getLastSegment(node.id),
      title: node.title,
      image: node.metafields?.find(m => m?.key === 'custom_product_image')?.reference?.image?.url ?? null,
      price: node.priceRange.minVariantPrice.amount,
      oldPrice: node.compareAtPriceRange?.minVariantPrice.amount ?? null,
      description: node.metafields?.find(m => m?.key === 'short_description')?.value ?? null,
    };
  });
}
