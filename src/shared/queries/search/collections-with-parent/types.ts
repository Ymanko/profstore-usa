export interface CollectionWithParent {
  id: string;
  handle: string;
  title: string;
  parentCategoryHandle: string | null;
}

export interface CollectionNode {
  id: string;
  handle: string;
  title: string;
  metafield: {
    reference: {
      handle: string;
    } | null;
  } | null;
}

export interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: CollectionNode;
    }>;
  };
}
