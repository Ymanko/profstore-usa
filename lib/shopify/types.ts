// 🧠 Универсальные типы
export type Maybe<T> = T | null;

export type Edge<T> = {
  node: T;
};

export type Connection<T> = {
  edges: Edge<T>[];
};

// 💸 Деньги
export type Money = {
  amount: string;
  currencyCode: string;
};

// 📈 SEO
export type SEO = {
  title: string;
  description: string;
};

// 🖼️ Картинка
export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

// 🛒 Корзина
export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

// 📁 Коллекции
// 📁 Базовый тип коллекции из Shopify

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  metafields?: Connection<Metafield>;
};

// 📎 Метаполя (custom fields)
export type Metafield = {
  namespace: string;
  key: string;
  value: string;
  type?: string;
  reference?: {
    id: string;
    handle: string;
    title: string;
  };
};

// 📦 Тип Collection для фронтенда / API
export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  metafields: Metafield[];           // ✅ уже преобразовано из Connection<>
  path: string;                      // ✅ для маршрутизации: /collections/:handle
  parentId?: string | null;          // ✅ для построения дерева
  parentHandle?: string | null;      // ✅ используется в breadcrumbs или меню
  image?: string;                    // ✅ URL картинки, если есть
};

// 📦 Продукты
export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

// 📄 Страницы и меню
export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Menu = {
  title: string;
  path: string;
};

// 🧩 Операции GraphQL
export type ShopifyCartOperation = {
  data: { cart: ShopifyCart };
  variables: { cartId: string };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: { cartLinesAdd: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: { merchandiseId: string; quantity: number }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: { cartLinesRemove: { cart: ShopifyCart } };
  variables: { cartId: string; lineIds: string[] };
};

export type ShopifyUpdateCartOperation = {
  data: { cartLinesUpdate: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: { id: string; merchandiseId: string; quantity: number }[];
  };
};

export type ShopifyCollectionOperation = {
  data: { collection: ShopifyCollection };
  variables: { handle: string };
};

export type ShopifyCollectionsOperation = {
  data: { collections: Connection<ShopifyCollection> };
};

export type ShopifyCollectionProductsOperation = {
  data: { collection: { products: Connection<ShopifyProduct> } };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: { handle: string };
};

export type ShopifyProductsOperation = {
  data: { products: Connection<ShopifyProduct> };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: { productRecommendations: ShopifyProduct[] };
  variables: { productId: string };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: { pages: Connection<Page> };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: { title: string; url: string }[];
    };
  };
  variables: { handle: string };
};
