interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

interface ProductPriceRange {
  minVariantPrice: MoneyV2;
  maxVariantPrice: MoneyV2;
}

interface ImageNode {
  url: string;
  altText: string;
}

interface ImageEdge {
  node: ImageNode;
}

interface ImageConnection {
  edges: ImageEdge[];
}

export interface CollectionItem {
  id: string;
  title: string;
  handle: string;
  priceRange: ProductPriceRange;
  images: ImageConnection;
}

interface ProductNode {
  id: string;
  handle: string;
  title: string;
  priceRange: ProductPriceRange;
  images: ImageConnection;
}

interface CollectionNode {
  id: string;
  handle: string;
  title: string;
  products: { edges: { node: ProductNode }[] };
}

export interface GetCollectionsData {
  collections: { edges: { node: CollectionNode }[] };
}

export interface SearchData {
  products: { edges: { node: CollectionItem }[] };
  collections: { edges: { node: CollectionItem }[] };
}

export interface SearchResults {
  products: CollectionItem[];
  collections: CollectionItem[];
}

export interface MenuItem {
  __typename: 'MenuItem';
  id: string; // gid://shopify/MenuItem/...
  title: string; // название пункта меню
  url: string | null; // ссылка, может быть null если не указано
  type: string; // тип (COLLECTION, PRODUCT, PAGE, HTTP, etc.)
  items: MenuItem[]; // дочерние пункты меню
}

export interface Menu {
  __typename: 'Menu';
  id: string; // gid://shopify/Menu/...
  title: string; // название меню
  items: MenuItem[]; // root items
}

export interface GetMenuData {
  menu: Menu | null;
}

export interface SubCategory {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  items: SubCategory[];
  title: string;
}
