import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_CATEGORY } from '@/shared/queries/categories/query';
import { parseContentBlocks } from '@/shared/utils/parsers/parse-content-blocks';

import type { CategoryData } from '@/shared/queries/categories/types';

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
    select: data => parseBlockData(data),
  });

function parseBlockData(data: CategoryData) {
  if (!data.metaobject) return null;

  const node = data.metaobject;
  const titleField = node.fields.find(f => f.key === 'title');
  const handleField = node.fields.find(f => f.key === 'handle');
  const descriptionField = node.fields.find(f => f.key === 'description');
  const imageField = node.fields.find(f => f.key === 'collection_image');
  const subCollectionsField = node.fields.find(f => f.key === 'sub_collections');
  const contentField = node.fields.find(f => f.key === 'content');

  // Parse content metaobjects
  const contentMetaobjects = parseContentBlocks(contentField?.references);

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
}
