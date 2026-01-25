'use client';

import Image from 'next/image';

import { BrandsCarousel } from '@/features/pages/components/brands-carousel';
import { RichText } from '@/shared/components/common/rich-text';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ContentBlockProps } from '@/shared/types/content-block.types';

export function ContentBlock({
  title,
  text,
  media,
  poster,
  mediaPosition = 'right',
  richTextClassName,
  logos,
}: ContentBlockProps) {
  const isMediaLeft = mediaPosition === 'left';
  const isVideo = Array.isArray(media);
  const hasMedia = media !== null && media !== undefined;

  return (
    <div className={cn('grid gap-8', hasMedia ? 'xl:grid-cols-2 xl:items-center' : 'xl:grid-cols-1')}>
      {/* Text Content */}
      <div className={cn('space-y-4', isMediaLeft && hasMedia && 'xl:order-2')}>
        <Show when={title}>
          <Typography variant='h2' as='h2'>
            {title}
          </Typography>
        </Show>

        <Show when={text}>
          <RichText schema={text || ''} className={cn(richTextClassName)} />
        </Show>

        {/* Brands Carousel */}
        <Show when={logos && logos.length > 0}>
          <BrandsCarousel logos={logos || []} />
        </Show>
      </div>

      {/* Media */}
      {hasMedia && (
        <div className={cn('relative w-full', isMediaLeft && 'xl:order-1')}>
          {isVideo ? (
            <video className='h-auto w-full rounded-lg' controls poster={poster?.url}>
              {(media as Array<{ url: string; mimeType: string }>).map((source, index) => (
                <source key={index} src={source.url} type={source.mimeType} />
              ))}
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className='relative h-auto w-full overflow-hidden rounded-lg'>
              <Image
                src={(media as { url: string }).url}
                alt={(media as { altText?: string | null }).altText || title || ''}
                width={(media as { width?: number | null }).width || 800}
                height={(media as { height?: number | null }).height || 600}
                className='h-auto w-full object-cover'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
