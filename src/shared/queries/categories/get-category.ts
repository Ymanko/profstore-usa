import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

const GET_CATEGORY = `
  query GetCategory($handle: String!) {
    metaobject(handle: { type: "category", handle: $handle }) {
      id
      handle
      fields {
        key
        value
        type
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
        references(first: 20) {
          edges {
            node {
              ... on Collection {
                id
                handle
                title
                description
                image {
                  url
                  altText
                }
              }
              ... on Metaobject {
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
              }
            }
          }
        }
      }
    }
  }
`;

type ContentMetaobjectField = {
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

type MetaobjectField = {
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

type MetaobjectNode = {
  id: string;
  handle: string;
  fields: MetaobjectField[];
};

type CategoryData = {
  metaobject: MetaobjectNode | null;
};

// Helper function to parse content metaobjects
const parseContentMetaobject = (fields: ContentMetaobjectField[]) => {
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
};

export const getCategoryQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['category', handle],
    queryFn: () => {
      return serverGraphqlFetcher<CategoryData>(
        GET_CATEGORY,
        { handle },
        {
          tags: ['category', handle],
        },
      );
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: data => {
      if (!data.metaobject) return null;

      const node = data.metaobject;
      const titleField = node.fields.find(f => f.key === 'title');
      const handleField = node.fields.find(f => f.key === 'handle');
      const descriptionField = node.fields.find(f => f.key === 'description');
      const imageField = node.fields.find(f => f.key === 'collection_image');
      const subCollectionsField = node.fields.find(f => f.key === 'sub_collections');
      const contentField = node.fields.find(f => f.key === 'content');

      // Parse content metaobjects
      const contentMetaobjects =
        contentField?.references?.edges
          .filter(edge => edge.node.fields) // Only nodes with fields (metaobjects)
          .map(edge => ({
            id: edge.node.id,
            ...parseContentMetaobject(edge.node.fields!),
          })) || [];

      return {
        id: node.id,
        handle: handleField?.value || node.handle,
        title: titleField?.value || '',
        description: descriptionField?.value || '',
        image: imageField?.reference?.image
          ? {
              url: imageField.reference.image.url,
              altText: imageField.reference.image.altText || titleField?.value || '',
            }
          : null,
        subCollections:
          subCollectionsField?.references?.edges
            .filter(edge => edge.node.handle) // Only Collection nodes
            .map(edge => ({
              id: edge.node.id,
              handle: edge.node.handle!,
              title: edge.node.title!,
              description: edge.node.description || '',
              image: edge.node.image,
            })) || [],
        content: contentMetaobjects,
      };
    },
  });
