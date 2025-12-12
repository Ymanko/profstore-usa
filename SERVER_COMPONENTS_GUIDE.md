# Server Components з Tanstack Query - Повний Гайд

Це детальна документація по використанню Server Components з Tanstack Query для Shopify Storefront API.

## 🎯 Навіщо використовувати Server Components?

### Проблеми з Client Components ('use client'):

- ❌ Весь JavaScript завантажується на клієнт (~500KB+)
- ❌ Немає SSR/SSG - контент не індексується Google
- ❌ Повільний First Contentful Paint (2-3 секунди)
- ❌ Поганий SEO
- ❌ Більше навантаження на клієнтський пристрій

### Переваги Server Components:

- ✅ JavaScript bundle **~90% менший**
- ✅ Повний SSR/SSG - відмінний SEO
- ✅ Швидкий FCP (<1 секунди)
- ✅ Дані завантажуються на сервері (ближче до БД/API)
- ✅ Безпека - токени не витікають на клієнт

---

## 📊 Порівняння підходів

| Підхід                         | Bundle Size | SEO        | Складність | Інтерактивність | Коли використовувати         |
| ------------------------------ | ----------- | ---------- | ---------- | --------------- | ---------------------------- |
| **1. Simple Server Component** | Мінімальний | ⭐⭐⭐⭐⭐ | Низька     | Немає           | Статичні сторінки, списки    |
| **2. Prefetch + Hydration**    | Середній    | ⭐⭐⭐⭐⭐ | Середня    | ⭐⭐⭐⭐⭐      | Інтерактивні сторінки з SSR  |
| **3. Suspense + Streaming**    | Мінімальний | ⭐⭐⭐⭐⭐ | Середня    | Обмежена        | Швидкий UI, parallel loading |
| **4. Dynamic Routes + SSG**    | Мінімальний | ⭐⭐⭐⭐⭐ | Низька     | Немає           | Сторінки продуктів, блогу    |
| **Client Component (old)**     | Великий     | ⭐         | Низька     | ⭐⭐⭐⭐⭐      | Legacy код                   |

---

## 🔥 Приклад 1: Simple Server Component

**Найпростіший підхід - просто async/await на сервері**

### Коли використовувати:

- Статичні або відносно статичні дані
- Сторінки без інтерактивності
- Списки продуктів, категорії тощо

### Файл: `app/products/page.tsx`

```tsx
import { getServerProducts } from '@/lib/graphql/server-fetchers';

export default async function ProductsPage() {
  // Запит виконується на СЕРВЕРІ
  const data = await getServerProducts(
    { first: 10 },
    {
      revalidate: 60, // ISR - перегенерувати кожні 60 секунд
    },
  );

  const products = data?.products?.edges.map(edge => edge.node) || [];

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.priceRange.minVariantPrice.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

### Переваги:

- ✅ Супер простий код
- ✅ Відмінний SEO
- ✅ Мінімальний JavaScript
- ✅ Підтримка ISR (Incremental Static Regeneration)

### Недоліки:

- ❌ Немає client-side interactivity
- ❌ Не можна використовувати useState, useEffect тощо

---

## 🚀 Приклад 2: Prefetch + Hydration (РЕКОМЕНДОВАНО)

**Server Component завантажує дані → передає їх Client Component**

### Коли використовувати:

- Потрібна інтерактивність (фільтри, сортування, mutations)
- Хочете SSR + client-side features
- Складні UI з багато інтерактивності

### Файл: `app/products-interactive/page.tsx`

```tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerProducts } from '@/lib/graphql/server-fetchers';
import { ProductsList } from '@/components/ProductsList';

export default async function ProductsInteractivePage() {
  const queryClient = new QueryClient();

  // Prefetch на сервері
  await queryClient.prefetchQuery({
    queryKey: ['products', { first: 10 }],
    queryFn: () => getServerProducts({ first: 10 }),
  });

  return (
    // Передаємо дані з сервера на клієнт
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Client Component з повною інтерактивністю */}
      <ProductsList />
    </HydrationBoundary>
  );
}
```

### Client Component: `components/ProductsList.tsx`

```tsx
'use client';

import { useProducts } from '@/lib/graphql/hooks/use-products';

export function ProductsList() {
  // Дані вже в кеші після hydration!
  const { data, isLoading, refetch } = useProducts({ first: 10 });

  return (
    <div>
      <button onClick={() => refetch()}>Оновити</button>
      {/* ... */}
    </div>
  );
}
```

### Як це працює:

1. **На сервері:**
   - `prefetchQuery()` завантажує дані
   - `dehydrate()` серіалізує кеш
   - HTML відправляється з даними

2. **На клієнті:**
   - `HydrationBoundary` десеріалізує кеш
   - `useProducts()` знаходить дані в кеші
   - **Повторний запит НЕ робиться!**

3. **Після hydration:**
   - Client Component працює як звичайно
   - Можна робити `refetch()`, mutations тощо

### Переваги:

- ✅ Найкраще з обох світів (SSR + interactivity)
- ✅ Відмінний SEO
- ✅ Немає повторних запитів
- ✅ Повна підтримка Tanstack Query features

### Недоліки:

- ⚠️ Трохи більше коду
- ⚠️ Більший bundle (але все одно менший ніж з Apollo)

---

## ⚡ Приклад 3: Suspense + Streaming

**Паралельне завантаження + streaming HTML**

### Коли використовувати:

- Хочете показати skeleton одразу
- Є кілька незалежних блоків які можна завантажувати паралельно
- Важлива швидкість відгуку UI

### Файл: `app/products-streaming/page.tsx`

```tsx
import { Suspense } from 'react';

async function ProductsContent() {
  const data = await getServerProducts({ first: 10 });
  // ... render products
}

function ProductsSkeleton() {
  return <div>Loading...</div>;
}

export default function ProductsStreamingPage() {
  return (
    <div>
      <h1>Продукти</h1>

      {/* Показуємо skeleton поки завантажуються дані */}
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
```

### Як це працює:

1. Next.js одразу відправляє HTML з `<ProductsSkeleton />`
2. Поки `ProductsContent` завантажується на сервері
3. Коли дані готові - Next.js stream'ить готовий HTML
4. React автоматично замінює skeleton на контент

### Паралельне завантаження:

```tsx
export default function Page() {
  return (
    <div>
      {/* Ці блоки завантажуються ПАРАЛЕЛЬНО */}
      <Suspense fallback={<Skeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <PopularProducts />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <NewArrivals />
      </Suspense>
    </div>
  );
}
```

### Переваги:

- ✅ Миттєвий UI response
- ✅ Паралельне завантаження
- ✅ Прогресивний рендеринг
- ✅ Відмінний UX

---

## 🎨 Приклад 4: Dynamic Routes + SSG/ISR

**Статична генерація + on-demand revalidation**

### Коли використовувати:

- Сторінки продуктів, блогу
- Контент змінюється рідко
- Хочете максимальну швидкість

### Файл: `app/products/[handle]/page.tsx`

```tsx
import { getServerProductByHandle } from '@/lib/graphql/server-fetchers';

// SEO metadata
export async function generateMetadata({ params }) {
  const { handle } = await params;
  const data = await getServerProductByHandle({ handle });
  const product = data?.productByHandle;

  return {
    title: `${product.title} | Store`,
    description: product.description,
    openGraph: {
      images: [product.images.edges[0]?.node.url],
    },
  };
}

// (Опціонально) Генерація статичних сторінок
export async function generateStaticParams() {
  const data = await getServerProducts({ first: 100 });

  return data.products.edges.map(edge => ({
    handle: edge.node.handle,
  }));
}

export default async function ProductPage({ params }) {
  const { handle } = await params;

  const data = await getServerProductByHandle(
    { handle },
    {
      revalidate: 3600, // ISR - кеш на 1 годину
      tags: [`product-${handle}`],
    },
  );

  const product = data?.productByHandle;

  return <div>{/* ... */}</div>;
}
```

### On-Demand Revalidation (Server Actions):

```tsx
// app/actions.ts
'use server';

import { revalidateTag } from 'next/cache';

export async function updateProduct(handle: string) {
  // ... update in Shopify

  // Invalidate cache
  revalidateTag(`product-${handle}`);
}
```

### Переваги:

- ✅ Максимальна швидкість (CDN cache)
- ✅ Ідеальний SEO
- ✅ Майже нульове навантаження на сервер
- ✅ On-demand revalidation

---

## 🔧 Cache Strategies

### 1. No Cache (Dynamic)

```tsx
const data = await getServerProducts({ first: 10 }, { cache: 'no-store' });
```

### 2. ISR (Incremental Static Regeneration)

```tsx
const data = await getServerProducts(
  { first: 10 },
  { revalidate: 60 }, // Кеш на 60 секунд
);
```

### 3. Static (Build Time)

```tsx
const data = await getServerProducts({ first: 10 }, { cache: 'force-cache' });
```

### 4. Tagged Cache (On-Demand Revalidation)

```tsx
const data = await getServerProducts(
  { first: 10 },
  {
    revalidate: 3600,
    tags: ['products'],
  },
);

// Потім:
revalidateTag('products');
```

---

## 🎯 Який підхід обрати?

### Прості статичні сторінки:

→ **Simple Server Component** (Приклад 1)

### Інтерактивні сторінки з SSR:

→ **Prefetch + Hydration** (Приклад 2) ⭐ РЕКОМЕНДОВАНО

### Dashboard з багатьма блоками:

→ **Suspense + Streaming** (Приклад 3)

### Сторінки продуктів:

→ **Dynamic Routes + SSG** (Приклад 4)

---

## 📁 Структура файлів

```
app/
├── products/
│   ├── page.tsx                    # Simple Server Component
│   └── [handle]/
│       └── page.tsx                # Dynamic Route + SSG
├── products-interactive/
│   └── page.tsx                    # Prefetch + Hydration
└── products-streaming/
    └── page.tsx                    # Suspense + Streaming

src/
├── lib/
│   └── graphql/
│       ├── server-fetchers.ts      # Server-side fetchers
│       └── hooks/
│           └── use-products.ts     # Client hooks
└── components/
    ├── ProductsList.tsx            # Client Component
    └── examples/
        └── server/                 # Всі приклади тут
```

---

## 🚨 Частіhelpers Помилки

### 1. Використання 'use client' на Server Component

```tsx
// ❌ НЕПРАВИЛЬНО
'use client';
export default async function Page() { ... }

// ✅ ПРАВИЛЬНО
export default async function Page() { ... }
```

### 2. Виклик hooks в Server Component

```tsx
// ❌ НЕПРАВИЛЬНО
export default async function Page() {
  const { data } = useProducts(); // Error!
}

// ✅ ПРАВИЛЬНО
export default async function Page() {
  const data = await getServerProducts({ first: 10 });
}
```

### 3. Передача неserializable props

```tsx
// ❌ НЕПРАВИЛЬНО
<ClientComponent onLoad={() => {}} />

// ✅ ПРАВИЛЬНО
<ClientComponent onLoad={serverAction} />
```

---

## 📚 Додаткові ресурси

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Tanstack Query SSR](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- [React Suspense](https://react.dev/reference/react/Suspense)

---

## ✅ Checklist для міграції

- [ ] Визначити які сторінки можуть бути Server Components
- [ ] Створити server-fetchers для GraphQL queries
- [ ] Замінити Client Components на Server де можливо
- [ ] Використовувати Prefetch + Hydration для інтерактивних сторінок
- [ ] Додати generateMetadata для SEO
- [ ] Налаштувати cache strategies (ISR, SSG)
- [ ] Протестувати bundle size (повинен зменшитись ~90%)
- [ ] Перевірити Core Web Vitals

---

**Результат:** Швидший сайт, кращий SEO, менший bundle, щасливіші користувачі! 🚀
