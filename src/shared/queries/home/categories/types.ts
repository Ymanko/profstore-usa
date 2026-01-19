export type MetaobjectField = {
  key: string;
  value: string;
  reference?: {
    image?: { url: string; altText?: string };
  } | null;
  references?: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        image?: { url: string; altText?: string } | null;
      };
    }>;
  } | null;
};

export type MetaobjectNode = {
  id: string;
  handle: string;
  fields: MetaobjectField[];
};

export type CategoryData = {
  metaobjects: {
    edges: Array<{
      node: MetaobjectNode;
    }>;
  };
};
