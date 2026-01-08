'use client';

import { ChevronDown, Search } from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import { useMedia } from 'react-use';

import { useGallery } from '@/features/product/hooks/use-gallery';
import { useGalleryImages } from '@/features/product/hooks/use-gallery-images';
import { Show } from '@/shared/components/common/show';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { cn } from '@/shared/lib/utils';

import type { GalleryImage } from '@/features/product/hooks/use-gallery-images';
import type { ComponentPropsWithoutRef } from 'react';

import 'react-image-gallery/styles/css/image-gallery.css';

interface GalleryProps extends ComponentPropsWithoutRef<'div'> {
  items: GalleryImage[];
}

export function Gallery({ items, className, ...props }: GalleryProps) {
  const isMobile = useMedia('(max-width: 767px)');
  const isMounted = useIsMounted();
  const images = useGalleryImages(items);

  const { canGoNext, galleryRef, handleNext, setCurrentIndex, showThumbnailControls } = useGallery(
    images.length,
    isMobile,
    true,
  );

  return (
    <Show when={isMounted} fallback={<div className='bg-muted-primary/50 h-96 w-full animate-pulse rounded-md' />}>
      <div className={cn('relative', className)} {...props}>
        <ImageGallery
          ref={galleryRef}
          items={images}
          infinite
          showPlayButton={false}
          showNav={false}
          thumbnailPosition={isMobile ? 'bottom' : 'left'}
          onSlide={index => setCurrentIndex(index)}
          renderFullscreenButton={(onClick, isFullscreen) => (
            <ZoomButton isFullscreen={isFullscreen} onClick={onClick} />
          )}
        />

        {/* Thumbnail control - only bottom button */}
        {showThumbnailControls && <ControlButton disabled={!canGoNext} onClick={handleNext} />}
      </div>
    </Show>
  );
}

function ControlButton(props: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type='button'
      className={cn(
        'absolute bottom-0 left-0 z-50',
        'flex h-10 items-center justify-center',
        'w-19.5 md:w-30 xl:w-40',
        'focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'text-muted-foreground hover:bg-background/70 bg-transparent transition duration-200',
      )}
      aria-label='Next image'
      {...props}
    >
      <ChevronDown className='text-foreground size-5' />
    </button>
  );
}

function ZoomButton({ isFullscreen, ...props }: ComponentPropsWithoutRef<'button'> & { isFullscreen: boolean }) {
  return (
    <button
      type='button'
      className={cn(
        'absolute top-3.5 left-3.5 z-10',
        'inline-flex size-9 items-center justify-center rounded-md',
        'focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'text-muted-foreground hover:bg-background/70 bg-transparent transition duration-200',
      )}
      aria-label={isFullscreen ? 'Close zoom' : 'Open zoom'}
      {...props}
    >
      <Search className='text-foreground size-5' />
    </button>
  );
}
