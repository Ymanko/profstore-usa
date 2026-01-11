'use client';

import ImageGallery from 'react-image-gallery';
import { useMedia } from 'react-use';
import 'react-image-gallery/styles/css/image-gallery.css';

import { CompareButton, ControlButton, ZoomButton } from '@/features/product/components/gallery-controls';
import { useGallery } from '@/features/product/hooks/use-gallery';
import { useGalleryImages } from '@/features/product/hooks/use-gallery-images';
import { AddToFavoritesBtn } from '@/shared/components/common/add-to favorites-btn';
import { Show } from '@/shared/components/common/show';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { cn } from '@/shared/lib/utils';

import type { GalleryImage } from '@/features/product/hooks/use-gallery-images';
import type { ComponentPropsWithoutRef } from 'react';

interface GalleryProps extends ComponentPropsWithoutRef<'div'> {
  items: GalleryImage[];
}

export function Gallery({ items, className, ...props }: GalleryProps) {
  const isMobile = useMedia('(max-width: 767px)');
  const isMounted = useIsMounted();
  const images = useGalleryImages(items);

  const { canGoNext, galleryRef, handleNext, setCurrentIndex } = useGallery(images.length, true);

  return (
    <Show when={isMounted} fallback={<div className='bg-muted-primary/50 h-96 w-full animate-pulse rounded-md' />}>
      <div className={cn('relative overflow-hidden px-0.5', className)} {...props}>
        <ImageGallery
          infinite
          items={images}
          showNav={false}
          ref={galleryRef}
          showPlayButton={false}
          additionalClass='rounded-md'
          thumbnailPosition={isMobile ? 'bottom' : 'left'}
          onSlide={index => setCurrentIndex(index)}
          renderFullscreenButton={(onClick, isFullscreen) => (
            <ZoomButton isFullscreen={isFullscreen} onClick={onClick} />
          )}
        />

        {!isMobile && <ControlButton disabled={!canGoNext} onClick={handleNext} />}
        <div className='absolute top-2.5 right-2.5 z-20 grid gap-y-3.5'>
          <AddToFavoritesBtn className='bg-surface/50' />
          <CompareButton className='bg-surface/50' />
        </div>
      </div>
    </Show>
  );
}
