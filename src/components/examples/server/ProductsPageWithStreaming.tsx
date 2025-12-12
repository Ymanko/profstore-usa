import Image from 'next/image';
import { Suspense } from 'react';

import { getServerProducts } from '@/lib/graphql/server-fetchers';

/**
 * Внутрішній компонент який завантажує дані
 */
async function ProductsContent() {
  // Запит на сервері
  const data = await getServerProducts({ first: 10 }, { revalidate: 60 });
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

/**
 * Loading fallback компонент
 */
function ProductsLoading() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='animate-pulse rounded-lg border p-4'>
          <div className='h-48 w-full rounded bg-gray-200' />
          <div className='mt-4 h-6 w-3/4 rounded bg-gray-200' />
          <div className='mt-2 h-4 w-full rounded bg-gray-200' />
          <div className='mt-4 h-8 w-1/2 rounded bg-gray-200' />
        </div>
      ))}
    </div>
  );
}

/**
 * ПРИКЛАД 3: Server Component з React Suspense + Streaming
 *
 * Переваги:
 * - ✅ Миттєве відображення skeleton
 * - ✅ Streaming HTML по мірі готовності
 * - ✅ Паралельне завантаження кількох компонентів
 * - ✅ Найкращий UX - користувач бачить щось одразу
 *
 * Як працює:
 * 1. Сервер одразу відправляє HTML з Loading state
 * 2. Поки ProductsContent завантажується, показується ProductsLoading
 * 3. Коли дані готові, Next.js stream'ить готовий HTML
 * 4. React автоматично замінює fallback на реальний контент
 *
 * Використання:
 * app/products-streaming/page.tsx
 */
export default function ProductsPageWithStreaming() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Каталог продуктів (React Suspense + Streaming)</h1>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
