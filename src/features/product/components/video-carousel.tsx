'use client';

import { ProductTitle } from '@/features/product/components/product-tools';
import { BaseCarousel, CarouselControls } from '@/shared/components/common/base-carousel';
import { VideoPlayer } from '@/shared/components/common/video-player';
import { CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
}

export function ProductVideoCarousel({ videos, className }: ComponentProps<'div'> & { videos: Video[] }) {
  if (videos.length === 0) return null;

  return (
    <>
      <BaseCarousel className='mx-0'>
        <div className={cn('mb-7.5 flex items-center justify-between', className)}>
          <ProductTitle>Video</ProductTitle>
          <CarouselControls />
        </div>

        <CarouselContent>
          {videos.map(video => (
            <CarouselItem key={video.id} className='basis-full sm:basis-1/2'>
              <div className='space-y-5.75'>
                <VideoPlayer src={video.url} />

                <div className='space-y-5 text-[17px] leading-4.5'>
                  <Typography className='font-bold'>{video.title}</Typography>
                  <Typography className='font-light'>{video.description}</Typography>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </BaseCarousel>
    </>
  );
}
