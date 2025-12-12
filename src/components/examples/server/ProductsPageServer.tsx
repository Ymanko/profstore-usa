import Image from 'next/image';

import { getServerProducts } from '@/lib/graphql/server-fetchers';

/**
 * ПРИКЛАД 1: Простий Server Component
 * Найпростіший підхід - просто використовуємо async/await на сервері
 *
 * Переваги:
 * - ✅ SSR out of the box
 * - ✅ SEO friendly
 * - ✅ Менший JavaScript bundle
 * - ✅ Швидкий First Contentful Paint
 *
 * Використання:
 * app/products/page.tsx
 */
export default async function ProductsPageServer() {
  // Запит виконується на сервері
  const data = await getServerProducts(
    { first: 10 },
    {
      // Next.js cache options
      revalidate: 60, // Кешувати на 60 секунд (ISR)
      // cache: 'no-store', // Або вимкнути кеш для dynamic data
      tags: ['products'], // Для revalidateTag()
    },
  );

  const products = data?.products?.edges.map(edge => edge.node) || [];

  if (products.length === 0) {
    return <div>Продукти не знайдені</div>;
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Каталог продуктів (Server Component)</h1>

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
    </div>
  );
}
