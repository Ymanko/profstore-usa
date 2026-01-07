'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { List } from '@/shared/components/common/list';
import { ProductCard } from '@/shared/components/common/product-card';
import { Typography } from '@/shared/components/ui/typography';
import { getDiscountedProductsQueryOptions } from '@/shared/queries/products/get-discounted-products';

export function DiscountedProduct() {
  const { category, subcategory } = useParams();
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
          <ProductCard
            href={`/${category}/${subcategory}/${product.handle}`}
            product={product}
            variant='discount'
            showDiscountBadge
          />
        )}
        keyExtractor={product => product.id}
      />
    </div>
  );
}
