'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { ProductsCarouselWithHeader } from '@/shared/components/common/products-carousel';
import { ProductCardsSkeleton } from '@/shared/components/skeletons/product-cards-skeleton';
import { getPopularCollectionProductsQueryOptions } from '@/shared/queries/collections/get-popular-collection-products';
import { getComplementaryProductsQueryOptions } from '@/shared/queries/products/get-product-recommendations';

import type { BaseProduct } from '@/shared/queries/products/types';

interface CustomersAlsoBoughtProps {
  productId: string;
}

export function CustomersAlsoBought({ productId }: CustomersAlsoBoughtProps) {
  const { subcategory } = useParams();

  const { data: complementaryProducts, isLoading: isLoadingComplementary } = useQuery(
    getComplementaryProductsQueryOptions(productId),
  );

  const { data: collectionProducts, isLoading: isLoadingCollection } = useQuery({
    ...getPopularCollectionProductsQueryOptions(subcategory as string),
    enabled: !isLoadingComplementary && (!complementaryProducts || complementaryProducts.length === 0),
  });

  const products = (complementaryProducts?.length ? complementaryProducts : collectionProducts) as
    | BaseProduct[]
    | undefined;
  const isLoading = isLoadingComplementary || (isLoadingCollection && !complementaryProducts?.length);

  // Debug
  console.log('CustomersAlsoBought - complementary:', complementaryProducts);
  console.log('CustomersAlsoBought - fallback (collection):', collectionProducts);
  console.log('CustomersAlsoBought - using:', products);

  if (isLoading) return <ProductCardsSkeleton />;
  if (!products || products.length === 0) return null;

  return (
    <div className='pt-8 md:pt-12.5 xl:pt-0'>
      <ProductsCarouselWithHeader
        title={<ProductTitle id={ProductDetailsAnchor.CustomersAlsoBought}>Customers also bought</ProductTitle>}
        products={products}
      />
    </div>
  );
}
