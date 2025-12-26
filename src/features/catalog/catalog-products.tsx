'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { List } from '@/shared/components/common/list';
import { ProductCard } from '@/shared/components/common/product-card';
import { getProductsQueryOptions } from '@/shared/queries/get-products';

export function CatalogProducts() {
  const { data: products } = useSuspenseQuery(getProductsQueryOptions);

  return (
    <List
      data={products}
      renderItem={product => <ProductCard product={product} />}
      keyExtractor={product => product.id}
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    />
  );
}
