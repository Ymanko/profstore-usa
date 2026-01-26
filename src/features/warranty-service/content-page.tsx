'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ContentBlock } from '@/features/categories/components/content-block';
import { getPageQueryOptions } from '@/shared/queries/pages';

import type { HandleProps } from '@/shared/types/common';

export function ContentPage({ handle }: HandleProps) {
  const { data } = useSuspenseQuery(getPageQueryOptions(handle));

  if (!data) return null;

  return (
    <div className='container'>
      {data.contentBlocks.map(block => (
        <ContentBlock
          key={block.id}
          title={block.title}
          text={block.text}
          media={block.media}
          poster={block.poster}
          mediaPosition={block.mediaPosition}
          logos={block.logos}
        />
      ))}
    </div>
  );
}
