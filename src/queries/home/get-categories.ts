import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

const GET_CATEGORIES = `
  query GetCategories {
    metaobjects(type: "category", first: 20) {
      edges {
        node {
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
            references(first: 10) {
              edges {
                node {
                  ... on Collection {
                    id
                    handle
                    title
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

type CategoryData = {
  metaobjects: {
    edges: Array<{
      node: MetaobjectNode;
    }>;
  };
};

export const getCategoriesQueryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: () => {
    return serverGraphqlFetcher<CategoryData>(
      GET_CATEGORIES,
      {},
      {
        tags: ['categories'],
      },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: data => {
    return (
      data.metaobjects?.edges.map(({ node }) => {
        const titleField = node.fields.find(f => f.key === 'title');
        const handleField = node.fields.find(f => f.key === 'handle');
        const imageField = node.fields.find(f => f.key === 'collection_image');
        const subCollectionsField = node.fields.find(f => f.key === 'sub_collections');

        return {
          node: {
            id: node.id,
            handle: handleField?.value || node.handle,
            title: titleField?.value || '',
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
                image: edge.node.image,
              })) || [],
          },
        };
      }) ?? []
    );
  },
});
