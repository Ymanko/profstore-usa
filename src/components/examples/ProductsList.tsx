'use client';

import Image from 'next/image';

import { useProducts } from '@/lib/graphql/hooks/use-products';

/**
 * Приклад компонента який використовує Tanstack Query + GraphQL Codegen
 * Цей компонент демонструє як працювати з новим підходом замість Apollo Client
 */
export function ProductsList() {
  // Використовуємо hook з повною типізацією
  const { data, isLoading, error } = useProducts({ first: 10 });

  if (isLoading) {
    return <div>Завантаження продуктів...</div>;
  }

  if (error) {
    return <div>Помилка: {error.message}</div>;
  }

  // Отримуємо products з edges (Shopify connection pattern)
  const products = data?.products?.edges.map(edge => edge.node) || [];

  if (products.length === 0) {
    return <div>Продукти не знайдені</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {products.map(product => {
        const image = product.images.edges[0]?.node;
        const price = product.priceRange.minVariantPrice;

        return (
          <div key={product.id} className='rounded-lg border p-4'>
            {image && (
              <Image src={image.url} alt={image.altText || product.title} className='h-48 w-full object-cover' />
            )}
            <h3 className='mt-4 text-lg font-semibold'>{product.title}</h3>
            {product.description && (
              <p className='mt-2 text-sm text-gray-600'>{product.description.slice(0, 100)}...</p>
            )}
            <p className='mt-4 text-xl font-bold'>
              {price.amount} {price.currencyCode}
            </p>
            <a
              href={`/products/${product.handle}`}
              className='mt-4 block rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700'
            >
              Переглянути
            </a>
          </div>
        );
      })}
    </div>
  );
}
