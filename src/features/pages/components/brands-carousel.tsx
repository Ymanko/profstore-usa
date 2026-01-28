'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { BaseCarousel } from '@/shared/components/common/base-carousel';
import { CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';

import type { ImageProps } from '@/shared/types/content-block.types';

type BrandsCarouselProps = {
  logos: ImageProps[];
};

export function BrandsCarousel({ logos }: BrandsCarouselProps) {
  if (!logos || logos.length === 0) return null;

  return (
    <BaseCarousel
      className='md:w-full'
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {logos.map((logo, index) => (
          <CarouselItem key={index} className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <div className='relative flex h-20 w-full items-center justify-center rounded-[10px] bg-white px-4 py-3 md:h-27.5 md:px-6 md:py-5'>
              <Image
                src={logo.url}
                alt={logo.altText || `Brand logo ${index + 1}`}
                width={logo.width || 220}
                height={logo.height || 100}
                className='max-h-full max-w-full object-contain'
                quality={90}
                loading='lazy'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </BaseCarousel>
  );
}
