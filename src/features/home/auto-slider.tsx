'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Fragment, useCallback, useEffect, useState } from 'react';

import { List } from '@/shared/components/common/list';
import { cn } from '@/shared/lib/utils';

type AutoSliderProps<T> = {
  slides: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;
  className?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;
};

export function AutoSlider<T>({
  slides,
  className,
  renderSlide,
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
        <List
          data={slides}
          renderItem={(item, index) => <Fragment key={index}>{renderSlide(item, index)}</Fragment>}
          keyExtractor={(_, index) => index.toString()}
          className='flex h-full gap-4'
          itemClassName='h-full w-full shrink-0'
        />
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
              'size-2.5 rounded-full transition-all',
              dotClassName || 'bg-primary/50',
              index === selectedIndex && (activeDotClassName || 'bg-primary'),
              index === selectedIndex && 'size-3.5',
            )}
          />
        ))}
      </div>
    </div>
  );
}
