'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type AutoSliderProps<T> = {
  slides: T[];
  children: (item: T, index: number) => React.ReactNode;
  className?: string; // Клас для обгортки самого слайдера
  dotsContainerClassName?: string; // Клас для позиціонування контейнера точок
  dotClassName?: string; // Базовий клас для кожної точки
  activeDotClassName?: string; // Клас для активної точки
};

export function AutoSlider<T>({
  slides,
  className,
  children,
  dotsContainerClassName,
  dotClassName,
  activeDotClassName,
}: AutoSliderProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn('group relative h-full w-full max-w-full overflow-hidden', className)}>
      <div ref={emblaRef} className='h-full overflow-hidden'>
        <div className='flex h-full'>
          {slides.map((item, index) => (
            <div key={index} className='h-full w-full shrink-0'>
              {children(item, index)}
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'absolute z-10 flex items-center gap-3.5',
          dotsContainerClassName || 'bottom-5 left-1/2 -translate-x-1/2',
        )}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-all',
              dotClassName || 'bg-primary/50',
              index === selectedIndex && (activeDotClassName || 'bg-primary'),
              index === selectedIndex && 'h-3.5 w-3.5',
            )}
          />
        ))}
      </div>
    </div>
  );
}
