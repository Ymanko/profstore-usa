'use client';

import { ContentBlock } from '@/features/categories/components/content-block';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';

import type { ContentBlock as ContentBlockType } from '@/shared/utils/parsers/parse-content-blocks';

interface PageContentProps {
  title: string;
  contentBlocks: ContentBlockType[];
}

export function PageContent({ title, contentBlocks }: PageContentProps) {
  return (
    <div className='container space-y-8 py-8'>
      <Typography variant='h1'>{title}</Typography>

      <Show when={contentBlocks?.length > 0}>
        <div className='space-y-12'>
          {contentBlocks.map(block => (
            <ContentBlock
              key={block.id}
              title={block.title}
              text={block.text}
              media={block.media}
              poster={block.poster}
              mediaPosition={block.mediaPosition}
            />
          ))}
        </div>
      </Show>
    </div>
  );
}
