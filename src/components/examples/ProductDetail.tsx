'use client';

import Image from 'next/image';

import { useProductByHandle } from '@/lib/graphql/hooks/use-products';

/**
 * Приклад компонента для відображення деталей продукту
 * Використовує Tanstack Query + GraphQL Codegen
 */
export function ProductDetail({ handle }: { handle: string }) {
  const { data, isLoading, error } = useProductByHandle({ handle });

  if (isLoading) {
    return <div>Завантаження продукту...</div>;
  }

  if (error) {
    return <div>Помилка: {error.message}</div>;
  }

  const product = data?.productByHandle;

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  const images = product.images.edges.map(edge => edge.node);
  const variants = product.variants.edges.map(edge => edge.node);
  const price = product.priceRange.minVariantPrice;

  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* Зображення */}
        <div className='space-y-4'>
          {images.map((image, index) => (
            <Image key={index} src={image.url} alt={image.altText || product.title} className='w-full rounded-lg' />
          ))}
        </div>

        {/* Інформація про продукт */}
        <div>
          <h1 className='text-3xl font-bold'>{product.title}</h1>

          <p className='mt-4 text-2xl font-semibold'>
            {price.amount} {price.currencyCode}
          </p>

          {product.description && (
            <div className='mt-6'>
              <h2 className='text-lg font-semibold'>Опис</h2>
              <p className='mt-2 text-gray-700'>{product.description}</p>
            </div>
          )}

          {/* Варіанти */}
          {variants.length > 0 && (
            <div className='mt-6'>
              <h2 className='text-lg font-semibold'>Варіанти</h2>
              <div className='mt-4 space-y-2'>
                {variants.map(variant => (
                  <div key={variant.id} className='flex items-center justify-between rounded border p-3'>
                    <span>{variant.title}</span>
                    <div className='flex items-center gap-4'>
                      <span className='font-semibold'>
                        {variant.priceV2.amount} {variant.priceV2.currencyCode}
                      </span>
                      {variant.availableForSale ? (
                        <span className='text-sm text-green-600'>В наявності</span>
                      ) : (
                        <span className='text-sm text-red-600'>Немає в наявності</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className='mt-8 w-full rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700'>
            Додати в кошик
          </button>
        </div>
      </div>
    </div>
  );
}
