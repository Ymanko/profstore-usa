import type { BaseProduct } from '@/shared/queries/products/types';
import type { WishlistProduct } from '@/shared/queries/wishlist/types';

export function transformWishlistToProduct(item: WishlistProduct): BaseProduct {
  return {
    id: item.id,
    handle: item.handle,
    title: item.title,
    availableForSale: item.availableForSale,
    featuredImage: item.featuredImage
      ? {
          url: item.featuredImage, // API returns string, not object
          altText: item.title,
        }
      : null,
    priceRange: {
      minVariantPrice: {
        amount: item.variant.price,
        currencyCode: 'USD',
      },
    },
    compareAtPriceRange: {
      minVariantPrice: {
        amount: item.variant.compareAtPrice || '0',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: item.variant.id,
            title: item.variant.title,
          },
        },
      ],
    },
  };
}
