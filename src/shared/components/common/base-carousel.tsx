'use client';

import { Carousel, CarouselNext, CarouselPrevious } from '@/shared/components/ui/carousel';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export function CarouselControls({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex gap-3', className)} {...props}>
      <CarouselPrevious />
      <CarouselNext />
    </div>
  );
}

export function BaseCarousel({ opts, ...props }: ComponentProps<typeof Carousel>) {
  return (
    <Carousel
      className={cn('mx-auto w-full max-w-87 md:max-w-167 lg:max-w-full', props.className)}
      opts={{
        align: 'start',
        slidesToScroll: 'auto',
        ...opts,
      }}
      {...props}
    />
  );
}
