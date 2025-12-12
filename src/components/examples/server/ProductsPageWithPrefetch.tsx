import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getServerProducts } from '@/lib/graphql/server-fetchers';

import { ProductsList } from '../ProductsList';

/**
 * ПРИКЛАД 2: Server Component з Tanstack Query Prefetch + Hydration
 *
 * Цей підхід дозволяє:
 * - ✅ Завантажити дані на сервері (SSR)
 * - ✅ Передати дані в клієнтський компонент через hydration
 * - ✅ Клієнтський компонент може використовувати той самий hook (useProducts)
 * - ✅ Дані вже в кеші, не потрібен повторний запит
 * - ✅ Можна робити refetch, mutations тощо на клієнті
 *
 * Використання:
 * app/products-prefetch/page.tsx
 */
export default async function ProductsPageWithPrefetch() {
  // Створюємо QueryClient для сервера
  const queryClient = new QueryClient();

  // Prefetch даних на сервері
  await queryClient.prefetchQuery({
    queryKey: ['products', { first: 10 }],
    queryFn: () => getServerProducts({ first: 10 }, { revalidate: 60 }),
  });

  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Каталог продуктів (Server Prefetch + Client Hydration)</h1>

      {/* HydrationBoundary передає дані з сервера на клієнт */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Цей компонент Client Component, але дані вже завантажені на сервері */}
        <ProductsList />
      </HydrationBoundary>
    </div>
  );
}
