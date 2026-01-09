import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { ProductsCarousel } from '@/shared/components/common/products-carousel';
import { ProductCardsSkeleton } from '@/shared/components/skeletons/product-cards-skeleton';
import { getPopularCollectionProductsQueryOptions } from '@/shared/queries/collections/get-popular-collection-products';

export function RelatedProduct() {
  const { subcategory } = useParams();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(getPopularCollectionProductsQueryOptions(subcategory as string));

  if (isLoading) return <ProductCardsSkeleton />;
  if (error || !products || products.length === 0) return null;

  return (
    <div className='space-y-6.25'>
      <ProductTitle id={ProductDetailsAnchor.RelatedProducts}>Related products</ProductTitle>
      <ProductsCarousel products={products} />
    </div>
  );
}
