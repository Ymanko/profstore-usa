import type { ImageProps } from '@/shared/types/content-block.types';

export type ContentMetaobjectField = {
  key: string;
  value?: string | null;
  type: string;
  reference?: {
    image?: ImageProps | null;
    sources?: Array<{
      url: string;
      mimeType: string;
    }>;
  } | null;
  references?: {
    edges: Array<{
      node: {
        image?: ImageProps | null;
      };
    }>;
  } | null;
};

export type ContentBlock = {
  id: string;
  title?: string | null;
  text?: string | null;
  media?: ImageProps | Array<{ url: string; mimeType: string }> | null;
  poster?: ImageProps | null;
  mediaPosition?: string | null;
  logos?: ImageProps[] | null;
};

export function parseContentMetaobject(fields: ContentMetaobjectField[]): Omit<ContentBlock, 'id'> {
  const getFieldValue = (key: string) => fields.find(f => f.key === key)?.value ?? null;
  const getFieldImage = (key: string) => fields.find(f => f.key === key)?.reference?.image ?? null;
  const getFieldVideo = (key: string) => fields.find(f => f.key === key)?.reference?.sources ?? null;
  const getFieldImages = (key: string): ImageProps[] | null => {
    const field = fields.find(f => f.key === key);
    if (!field?.references?.edges?.length) return null;

    return field.references.edges
      .map(edge => edge.node.image)
      .filter((img): img is ImageProps => img !== null && img !== undefined);
  };

  return {
    title: getFieldValue('title'),
    text: getFieldValue('text'),
    media: getFieldImage('media') || getFieldVideo('media'),
    poster: getFieldImage('poster'),
    mediaPosition: getFieldValue('media_position'),
    logos: getFieldImages('logos'),
  };
}

export function parseContentBlocks(
  references?: {
    edges: Array<{
      node: {
        id: string;
        fields?: ContentMetaobjectField[];
      };
    }>;
  } | null,
): ContentBlock[] {
  if (!references?.edges) return [];

  return references.edges
    .filter(edge => edge.node.fields) // Only nodes with fields (metaobjects)
    .map(edge => ({
      id: edge.node.id,
      ...parseContentMetaobject(edge.node.fields!),
    }));
}
