'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { ProductsCarouselWithHeader } from '@/shared/components/common/products-carousel';
import { ProductCardsSkeleton } from '@/shared/components/skeletons/product-cards-skeleton';
import { getRelatedProductsQueryOptions } from '@/shared/queries/products/get-product-recommendations';

import type { ProductIdProps } from '@/shared/types/common';

export function RelatedProduct({ productId }: ProductIdProps) {
  const { data: products, isLoading, error } = useQuery(getRelatedProductsQueryOptions(productId));

  if (isLoading) return <ProductCardsSkeleton />;
  if (error || !products || products.length === 0) return null;

  return (
    <ProductsCarouselWithHeader
      title={<ProductTitle id={ProductDetailsAnchor.RelatedProducts}>Related products</ProductTitle>}
      products={products}
    />
  );
}
