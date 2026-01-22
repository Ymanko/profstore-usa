import type { ContentMetaobjectField } from '@/shared/utils/parsers/parse-content-blocks';

export type MetaobjectField = {
  key: string;
  value: string;
  type: string;
  reference?: {
    image?: { url: string; altText?: string };
  } | null;
  references?: {
    edges: Array<{
      node: {
        id: string;
        handle?: string;
        title?: string;
        description?: string;
        image?: { url: string; altText?: string } | null;
        fields?: ContentMetaobjectField[];
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
  metaobject: MetaobjectNode | null;
};
