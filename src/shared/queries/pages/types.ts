import type { StoreContactField } from '@/shared/queries/contacts/types';
import type { ContentMetaobjectField } from '@/shared/utils/parsers/parse-content-blocks';

export type PageData = {
  page?: {
    id: string;
    title: string;
    handle: string;
    seo?: {
      title?: string | null;
      description?: string | null;
    } | null;
    content?: {
      references?: {
        edges: Array<{
          node: {
            id?: string;
            fields?: ContentMetaobjectField[];
          };
        }>;
      } | null;
    } | null;
    contact?: {
      reference?: {
        fields: StoreContactField[];
      } | null;
    } | null;
  } | null;
};
