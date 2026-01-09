import { useQuery } from '@tanstack/react-query';

import { ProductsCarousel } from '@/shared/components/common/products-carousel';
import { ProductCardsSkeleton } from '@/shared/components/skeletons/product-cards-skeleton';
import { Separator } from '@/shared/components/ui/separator';
import { getPopularCollectionProductsQueryOptions } from '@/shared/queries/collections/get-popular-collection-products';



export function CustomersAlsoBought({ handle }: { handle: string }) {
  const { data: products, isLoading, error } = useQuery(getPopularCollectionProductsQueryOptions(handle));

  if (isLoading) return <ProductCardsSkeleton />;
  if (error || !products || products.length === 0) return null;

  return (
    <>
      <Separator className='border-accent mt-10 border-t-3 md:mt-12.5' />
      <ProductsCarousel title='Popular products in this category' products={products} />
    </>
  );
};
