interface CollectionItem {
  id: string;
  title: string;
  handle: string;
}

interface ImageNode {
  url: string;
  altText: string;
}

interface ProductNode {
  id: string;
  handle: string;
  title: string;
  featuredImage?: ImageNode | null;
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
