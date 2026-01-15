'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { ProductsCarouselWithHeader } from '@/shared/components/common/products-carousel';
import { ProductCardsSkeleton } from '@/shared/components/skeletons/product-cards-skeleton';
import { getComplementaryProductsQueryOptions } from '@/shared/queries/products/get-product-recommendations';

interface CustomersAlsoBoughtProps {
  productId: string;
}

export function CustomersAlsoBought({ productId }: CustomersAlsoBoughtProps) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(getComplementaryProductsQueryOptions(productId));

  // Debug
  console.log('CustomersAlsoBought (COMPLEMENTARY):', products);

  if (isLoading) return <ProductCardsSkeleton />;
  if (error || !products || products.length === 0) return null;

  return (
    <div className='pt-8 md:pt-12.5 xl:pt-0'>
      <ProductsCarouselWithHeader
        title={<ProductTitle id={ProductDetailsAnchor.CustomersAlsoBought}>Customers also bought</ProductTitle>}
        products={products}
      />
    </div>
  );
}
