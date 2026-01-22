import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_CATEGORIES } from '@/shared/queries/home/categories/query';

import type { CategoryData } from '@/shared/queries/home/categories/types';

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
  select: data => parseMetaobjectFields(data),
});

function parseMetaobjectFields(data: CategoryData) {
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
}
