export type ContentMetaobjectField = {
  key: string;
  value?: string | null;
  type: string;
  reference?: {
    image?: {
      url: string;
      altText?: string | null;
      width?: number | null;
      height?: number | null;
    } | null;
    sources?: Array<{
      url: string;
      mimeType: string;
    }>;
  } | null;
};

export type ContentBlock = {
  id: string;
  title?: string | null;
  text?: string | null;
  media?:
    | { url: string; altText?: string | null; width?: number | null; height?: number | null }
    | Array<{ url: string; mimeType: string }>
    | null;
  poster?: { url: string; altText?: string | null; width?: number | null; height?: number | null } | null;
  mediaPosition?: string | null;
};

export function parseContentMetaobject(fields: ContentMetaobjectField[]): Omit<ContentBlock, 'id'> {
  const getFieldValue = (key: string) => fields.find(f => f.key === key)?.value ?? null;
  const getFieldImage = (key: string) => fields.find(f => f.key === key)?.reference?.image ?? null;
  const getFieldVideo = (key: string) => fields.find(f => f.key === key)?.reference?.sources ?? null;

  return {
    title: getFieldValue('title'),
    text: getFieldValue('text'),
    media: getFieldImage('media') || getFieldVideo('media'),
    poster: getFieldImage('poster'),
    mediaPosition: getFieldValue('media_position'),
  };
}

export const CONTENT_BLOCK_FIELDS_FRAGMENT = `
  id
  fields {
    key
    value
    type
    reference {
      ... on MediaImage {
        image {
          url
          altText
          width
          height
        }
      }
      ... on Video {
        sources {
          url
          mimeType
        }
      }
    }
  }
`;

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
