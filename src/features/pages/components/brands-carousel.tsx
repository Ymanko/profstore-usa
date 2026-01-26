'use client';

import Image from 'next/image';

import { BaseCarousel, CarouselControls } from '@/shared/components/common/base-carousel';
import { CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';

import type { ImageProps } from '@/shared/types/content-block.types';

type BrandsCarouselProps = {
  logos: ImageProps[];
};

export function BrandsCarousel({ logos }: BrandsCarouselProps) {
  if (!logos || logos.length === 0) return null;

  return (
    <div className='my-8'>
      <BaseCarousel className='w-full'>
        <div className='mb-5 flex items-center justify-end'>
          <CarouselControls />
        </div>

        <CarouselContent>
          {logos.map((logo, index) => (
            <CarouselItem key={index} className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
              <div className='relative flex aspect-auto h-full max-h-27.5 w-full rounded-[10px] bg-white px-6 py-5'>
                <Image
                  src={logo.url}
                  alt={logo.altText || `Brand logo ${index + 1}`}
                  width={logo.width || 220}
                  height={logo.height || 100}
                  className='h-auto w-full object-contain'
                  sizes='220px'
                  quality={90}
                  loading='lazy'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </BaseCarousel>
    </div>
  );
}
