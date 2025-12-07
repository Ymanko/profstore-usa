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

interface CollectionItem {
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
