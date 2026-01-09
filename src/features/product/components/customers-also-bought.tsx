'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { ProductsCarouselWithHeader } from '@/shared/components/common/products-carousel';
import { ProductCardsSkeleton } from '@/shared/components/skeletons/product-cards-skeleton';
import { getPopularCollectionProductsQueryOptions } from '@/shared/queries/collections/get-popular-collection-products';

export function CustomersAlsoBought() {
  const { subcategory } = useParams();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(getPopularCollectionProductsQueryOptions(subcategory as string));

  if (isLoading) return <ProductCardsSkeleton />;
  if (error || !products || products.length === 0) return null;

  return (
    <div className='pt-8 md:pt-12.5'>
      <ProductsCarouselWithHeader
        title={<ProductTitle id={ProductDetailsAnchor.CustomersAlsoBought}>Customers also bought</ProductTitle>}
        products={products}
      />
    </div>
  );
}
