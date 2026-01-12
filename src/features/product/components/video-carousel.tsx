'use client';

import Image from 'next/image';
import { useMedia } from 'react-use';

import { ProductTitle } from '@/features/product/components/product-tools';
import { BaseCarousel, CarouselControls } from '@/shared/components/common/base-carousel';
import { CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { FC } from 'react';

export interface Video {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  url?: string;
}

interface ProductVideoCarouselProps {
  videos: Video[];
  className?: string;
}

export const ProductVideoCarousel: FC<ProductVideoCarouselProps> = ({ videos, className }) => {
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
                <div className='overflow-hidden rounded'>
                  <Image src={video.thumbnail} alt={video.title} width={434} height={245} className='w-full' />
                </div>

                <div className='space-y-5 text-[17px] leading-4.5'>
                  <Typography className='font-bold'>{video.title}</Typography>
                  <Typography className='font-light'>{video.description}</Typography>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/*{isMobile && <CarouselControls className='mt-5 justify-end' />}*/}
      </BaseCarousel>
    </>
  );
};
