'use client';

import { useQuery } from '@tanstack/react-query';

import { List } from '@/shared/components/common/list';
import { ProductCard } from '@/shared/components/common/product-card';
import { Typography } from '@/shared/components/ui/typography';
import { getDiscountedProductsQueryOptions } from '@/shared/queries/products/get-discounted-products';
import { buildProductUrl } from '@/shared/utils/build-product-url';

export function DiscountedProduct() {
  const { data: products, isLoading, error } = useQuery(getDiscountedProductsQueryOptions);

  if (isLoading) {
    return (
      <div className='hidden space-y-4 xl:block'>
        <div className='bg-muted-primary/50 h-9 animate-pulse rounded-lg' />
        <div className='bg-muted-primary/50 h-96 animate-pulse rounded-lg' />
      </div>
    );
  }

  if (error || !products || products.length === 0) return null;

  return (
    <div className='hidden space-y-4 xl:block'>
      <Typography variant='h2' as='h2'>
        Discounted products
      </Typography>

      <List
        data={products}
        renderItem={product => (
          <ProductCard href={buildProductUrl(product)} product={product} variant='discount' showDiscountBadge />
        )}
        keyExtractor={product => product.id}
      />
    </div>
  );
}
