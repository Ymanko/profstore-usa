# Server Components Examples

Приклади використання Server Components з Tanstack Query для Shopify.

## 📁 Файли

### 1. `ProductsPageServer.tsx`

**Simple Server Component** - найпростіший підхід

- ✅ SSR/ISR з коробки
- ✅ Відмінний SEO
- ❌ Немає інтерактивності

**Використання:**

```tsx
// app/products/page.tsx
export { default } from '@/components/examples/server/ProductsPageServer';
```

---

### 2. `ProductsPageWithPrefetch.tsx`

**Prefetch + Hydration** - рекомендований підхід

- ✅ SSR + client-side interactivity
- ✅ Дані в кеші після hydration
- ✅ Можна використовувати Tanstack Query features

**Використання:**

```tsx
// app/products-interactive/page.tsx
export { default } from '@/components/examples/server/ProductsPageWithPrefetch';
```

---

### 3. `ProductsPageWithStreaming.tsx`

**Suspense + Streaming** - найкращий UX

- ✅ Миттєвий skeleton
- ✅ Streaming HTML
- ✅ Паралельне завантаження

**Використання:**

```tsx
// app/products-streaming/page.tsx
export { default } from '@/components/examples/server/ProductsPageWithStreaming';
```

---

### 4. `ProductPageDynamic.tsx`

**Dynamic Route + SSG/ISR** - для продуктів

- ✅ generateMetadata для SEO
- ✅ generateStaticParams для SSG
- ✅ On-demand revalidation

**Використання:**

```tsx
// app/products/[handle]/page.tsx
export {
  default,
  generateMetadata,
  // generateStaticParams, // Розкоментуйте для SSG
} from '@/components/examples/server/ProductPageDynamic';
```

---

## 🚀 Швидкий старт

### Створити нову Server Component сторінку:

```tsx
// app/my-page/page.tsx
import { getServerProducts } from '@/lib/graphql/server-fetchers';

export default async function MyPage() {
  const data = await getServerProducts({ first: 10 });

  return <div>{/* ... */}</div>;
}
```

### З інтерактивністю:

```tsx
// app/my-interactive-page/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerProducts } from '@/lib/graphql/server-fetchers';
import { ProductsList } from '@/components/ProductsList';

export default async function MyInteractivePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', { first: 10 }],
    queryFn: () => getServerProducts({ first: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  );
}
```

---

## 📖 Детальна документація

Дивіться **SERVER_COMPONENTS_GUIDE.md** в корені проекту для повної документації.
