import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getServerProductByHandle } from '@/lib/graphql/server-fetchers';

/**
 * ПРИКЛАД 4: Dynamic Route з generateMetadata та generateStaticParams
 *
 * Використання:
 * app/products/[handle]/page.tsx
 */

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

/**
 * Генерація metadata для SEO
 * Next.js автоматично викличе цю функцію
 */
export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params;
  const data = await getServerProductByHandle({ handle }, { revalidate: 3600 });

  const product = data?.productByHandle;

  if (!product) {
    return {
      title: 'Продукт не знайдено',
    };
  }

  const image = product.images.edges[0]?.node;

  return {
    title: `${product.title} | ProfStore`,
    description: product.description || `Купити ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || '',
      images: image ? [{ url: image.url, alt: image.altText || product.title }] : [],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description || '',
      images: image ? [image.url] : [],
    },
  };
}

/**
 * (Опціонально) Генерація статичних сторінок для популярних продуктів
 * Розкоментуйте якщо хочете SSG для певних продуктів
 */
// export async function generateStaticParams() {
//   // Отримати топ 100 продуктів для статичної генерації
//   const data = await getServerProducts({ first: 100 });
//   const products = data?.products?.edges.map(edge => edge.node) || [];
//
//   return products.map(product => ({
//     handle: product.handle,
//   }));
// }

/**
 * Server Component для сторінки продукту
 */
export default async function ProductPageDynamic({ params }: ProductPageProps) {
  const { handle } = await params;

  // Завантажуємо продукт на сервері
  const data = await getServerProductByHandle(
    { handle },
    {
      revalidate: 3600, // Кешувати на 1 годину
      tags: [`product-${handle}`], // Для ручного revalidation
    },
  );

  const product = data?.productByHandle;

  // Якщо продукт не знайдено - показуємо 404
  if (!product) {
    notFound();
  }

  const images = product.images.edges.map(edge => edge.node);
  const variants = product.variants.edges.map(edge => edge.node);
  const price = product.priceRange.minVariantPrice;

  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* Зображення */}
        <div className='space-y-4'>
          {images.length > 0 ? (
            images.map((image, index) => (
              <Image key={index} src={image.url} alt={image.altText || product.title} className='w-full rounded-lg' />
            ))
          ) : (
            <div className='flex h-96 w-full items-center justify-center rounded-lg bg-gray-100'>
              <span className='text-gray-400'>Немає зображення</span>
            </div>
          )}
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

          {/* Додаткова інформація для розробників */}
          <div className='mt-8 rounded bg-gray-50 p-4 text-xs text-gray-500'>
            <p>
              <strong>Режим рендерингу:</strong> Server Component (SSR/ISR)
            </p>
            <p>
              <strong>Кеш:</strong> Revalidate every 3600 seconds (1 hour)
            </p>
            <p>
              <strong>SEO:</strong> Metadata згенерована через generateMetadata()
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
