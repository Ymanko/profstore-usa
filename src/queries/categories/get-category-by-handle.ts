import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

const GET_CATEGORY_BY_HANDLE = `
  query GetCategoryByHandle($handle: String!) {
    metaobject(handle: { type: "category", handle: $handle }) {
      id
      handle
      fields {
        key
        value
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
            }
          }
        }
      }
    }
  }
`;

type MetaobjectField = {
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
        description?: string;
        image?: { url: string; altText?: string } | null;
      };
    }>;
  } | null;
};

type MetaobjectNode = {
  id: string;
  handle: string;
  fields: MetaobjectField[];
};

type CategoryByHandleData = {
  metaobject: MetaobjectNode | null;
};

export const getCategoryByHandleQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['category', handle],
    queryFn: () => {
      return serverGraphqlFetcher<CategoryByHandleData>(
        GET_CATEGORY_BY_HANDLE,
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
          subCollectionsField?.references?.edges.map(edge => ({
            id: edge.node.id,
            handle: edge.node.handle,
            title: edge.node.title,
            description: edge.node.description || '',
            image: edge.node.image,
          })) || [],
      };
    },
  });
