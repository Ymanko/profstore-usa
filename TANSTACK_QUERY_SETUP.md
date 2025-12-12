# Tanstack Query + GraphQL Codegen Setup

Це документація по налаштуванню та використанню Tanstack Query з GraphQL Codegen для роботи з Shopify Storefront API.

## 📦 Встановлені пакети

```json
{
  "@tanstack/react-query": "^5.90.12",
  "@tanstack/react-query-devtools": "^5.91.1",
  "@graphql-codegen/cli": "^6.1.0",
  "@graphql-codegen/client-preset": "^5.2.1",
  "dotenv": "^17.2.3"
}
```

## 🏗️ Структура проекту

```
src/
├── lib/
│   ├── tanstack/
│   │   └── get-query-client.ts       # Конфігурація QueryClient
│   └── graphql/
│       ├── client.ts                  # GraphQL fetcher
│       ├── hooks/
│       │   └── use-products.ts        # Hooks для продуктів
│       ├── queries/
│       │   └── products.graphql.ts    # GraphQL queries (не використовується поки)
│       └── generated/                 # Згенеровані типи
│           ├── graphql.ts             # Всі типи з Shopify API
│           ├── gql.ts                 # graphql() функція
│           └── index.ts
├── constants/
│   └── stale-time.ts                  # Константи для кешування
└── components/
    └── examples/
        ├── ProductsList.tsx           # Приклад списку продуктів
        └── ProductDetail.tsx          # Приклад деталей продукту

codegen.ts                             # Конфігурація GraphQL Codegen
```

## ⚙️ Конфігурація

### 1. GraphQL Codegen (`codegen.ts`)

```typescript
import { config as dotenvConfig } from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenvConfig();

const config: CodegenConfig = {
  schema: {
    [`${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
      },
    },
  },
  documents: ['src/**/*.graphql.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/graphql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        skipTypename: false,
      },
    },
  },
};

export default config;
```

### 2. Tanstack Query Client (`src/lib/tanstack/get-query-client.ts`)

- SSR-ready конфігурація
- Автоматичний singleton для браузера
- Stale time: 15 хвилин за замовчуванням
- Підтримка dehydration для Server Components

## 🚀 Використання

### Скрипти

```bash
# Генерація типів з Shopify schema
npm run codegen

# Watch mode для автоматичної регенерації
npm run codegen:watch
```

### Створення нового query

#### 1. Додайте GraphQL query в hook:

```typescript
// src/lib/graphql/hooks/use-collections.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlFetcher } from '../client';
import type { QueryRoot } from '../graphql';

const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

type GetCollectionsResponse = Pick<QueryRoot, 'collections'>;

export function useCollections(variables: { first: number }) {
  return useQuery({
    queryKey: ['collections', variables],
    queryFn: () => graphqlFetcher<GetCollectionsResponse, typeof variables>(GET_COLLECTIONS_QUERY, variables),
  });
}
```

#### 2. Використайте hook в компоненті:

```tsx
'use client';

import { useCollections } from '@/lib/graphql/hooks/use-collections';

export function CollectionsList() {
  const { data, isLoading, error } = useCollections({ first: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const collections = data?.collections?.edges.map(edge => edge.node) || [];

  return (
    <ul>
      {collections.map(collection => (
        <li key={collection.id}>{collection.title}</li>
      ))}
    </ul>
  );
}
```

## 📝 Приклади використання

### Список продуктів

```tsx
import { useProducts } from '@/lib/graphql/hooks/use-products';

export function ProductsPage() {
  const { data, isLoading, error } = useProducts({ first: 10 });

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

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

### Деталі продукту

```tsx
import { useProductByHandle } from '@/lib/graphql/hooks/use-products';

export function ProductPage({ handle }: { handle: string }) {
  const { data, isLoading } = useProductByHandle({ handle });

  if (isLoading) return <div>Завантаження...</div>;

  const product = data?.productByHandle;
  if (!product) return <div>Продукт не знайдено</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      {/* ... */}
    </div>
  );
}
```

## 🎯 Переваги над Apollo Client

### 1. **Менший bundle size**

- Apollo Client: ~135KB
- Tanstack Query: ~12KB
- **Економія: ~123KB**

### 2. **Гнучкість**

- Не прив'язані до GraphQL (можна використовувати REST, WebSocket тощо)
- Простіше додавати custom логіку
- Краща типізація з codegen

### 3. **Server Components підтримка**

- Можна використовувати на сервері без проблем
- Apollo потребує 'use client' скрізь

### 4. **DevTools**

- Відмінні React Query DevTools з коробки
- Візуалізація кешу та запитів

### 5. **Ecosystem**

- Велика спільнота
- Регулярні оновлення
- Багато плагінів та розширень

## 🔄 Міграція з Apollo Client

### Поки що залишаємо Apollo

Apollo Client залишається в проекті паралельно. Нова логіка пишеться на Tanstack Query, стара поступово мігрує.

### План міграції

1. ✅ Налаштувати Tanstack Query + Codegen
2. ✅ Створити перші hooks
3. ⏳ Переписати компоненти на Tanstack Query
4. ⏳ Видалити Apollo Client коли всі компоненти мігровані

### Приклад міграції

**Було (Apollo):**

```tsx
'use client';
import { useQuery } from '@apollo/client';

export function Products() {
  const { data } = useQuery(GET_PRODUCTS_QUERY, {
    variables: { first: 10 },
  });
  // ...
}
```

**Стало (Tanstack):**

```tsx
'use client';
import { useProducts } from '@/lib/graphql/hooks/use-products';

export function Products() {
  const { data } = useProducts({ first: 10 });
  // ...
}
```

## 📚 Додаткові ресурси

- [Tanstack Query Docs](https://tanstack.com/query/latest)
- [GraphQL Codegen Docs](https://the-guild.dev/graphql/codegen)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)

## 🐛 Troubleshooting

### Типи не генеруються

```bash
# Перевірте .env файл
cat .env

# Запустіть codegen з verbose
npm run codegen -- --verbose
```

### Помилки типізації

```bash
# Перегенеруйте типи
npm run codegen

# Перезапустіть TypeScript server в IDE
```

### Cache issues

```tsx
// Інвалідуйте cache вручну
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['products'] });
```

## 🖥️ Server Components (РЕКОМЕНДОВАНО)

### Навіщо Server Components?

- ✅ **Bundle size -90%** (замість 500KB → ~50KB)
- ✅ **SEO** - контент рендериться на сервері
- ✅ **Швидкість** - First Contentful Paint <1s
- ✅ **Безпека** - токени не витікають на клієнт

### Приклади Server Components

Всі приклади знаходяться в `src/components/examples/server/`:

1. **ProductsPageServer.tsx** - Simple Server Component
2. **ProductsPageWithPrefetch.tsx** - Prefetch + Hydration (рекомендовано)
3. **ProductsPageWithStreaming.tsx** - Suspense + Streaming
4. **ProductPageDynamic.tsx** - Dynamic Routes + SSG/ISR

### Швидкий приклад:

```tsx
// app/products/page.tsx (Server Component)
import { getServerProducts } from '@/lib/graphql/server-fetchers';

export default async function ProductsPage() {
  // Запит на СЕРВЕРІ - не на клієнті!
  const data = await getServerProducts(
    { first: 10 },
    { revalidate: 60 }, // ISR кеш на 60 секунд
  );

  const products = data?.products?.edges.map(e => e.node) || [];

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

**📚 Детальна документація:** `SERVER_COMPONENTS_GUIDE.md`

---

## ✨ Наступні кроки

- [x] ✅ Налаштувати GraphQL Codegen
- [x] ✅ Створити hooks для Tanstack Query
- [x] ✅ Додати Server Components приклади
- [ ] Додати mutations (створення замовлення, додавання в кошик)
- [ ] Створити hooks для collections, cart, customer
- [ ] Додати оптимістичні оновлення
- [ ] Мігрувати існуючі компоненти з Apollo на Tanstack
