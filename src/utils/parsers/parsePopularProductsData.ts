import { getLastSegment } from './getLastSegment';

import type { MediaImage, ProductEdge } from '@/lib/graphql/graphql';

function isMediaImage(ref: any): ref is MediaImage {
  return ref?.__typename === 'MediaImage' || ref?.image !== undefined;
}

export function parsePopularProductsData(products: ProductEdge[]) {
  return products.map(product => {
    const node = product.node;
    const imageMetafield = node.metafields?.find(m => m?.key === 'custom_product_image');
    const imageRef = imageMetafield?.reference;

    return {
      productId: getLastSegment(node.id),
      title: node.title,
      image: (imageRef && isMediaImage(imageRef) ? imageRef.image?.url : null) ?? null,
      price: node.compareAtPriceRange?.minVariantPrice.amount ?? null,
      oldPrice: node.priceRange.minVariantPrice.amount,
      description: node.metafields?.find(m => m?.key === 'short_description')?.value ?? null,
    };
  });
}
