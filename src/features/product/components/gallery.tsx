'use client';

import { Search, ZoomOut } from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import { useMedia } from 'react-use';

import { CompareButton, ControlButton, ZoomButton } from '@/features/product/components/gallery-controls';
import 'react-image-gallery/styles/css/image-gallery.css';

import { GalleryItem } from '@/features/product/gallery-item';
import { useGallery } from '@/features/product/hooks/use-gallery';
import { useGalleryImages } from '@/features/product/hooks/use-gallery-images';
import { useZoomImage } from '@/features/product/hooks/use-zoom-image';
import { Show } from '@/shared/components/common/show';
import { WishlistBtn } from '@/shared/components/common/wishlist-btn';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { cn } from '@/shared/lib/utils';

import type { GalleryImage } from '@/features/product/hooks/use-gallery-images';
import type { ComponentPropsWithoutRef } from 'react';

interface GalleryProps extends ComponentPropsWithoutRef<'div'> {
  items: GalleryImage[];
  productId: string;
  variantId?: string;
}

export function Gallery({ items, productId, variantId, className, ...props }: GalleryProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  const isMounted = useIsMounted();
  const images = useGalleryImages(items);

  const { canGoNext, galleryRef, handleNext, setCurrentIndex, currentIndex } = useGallery(images.length, true);
  const { on, transformRefs, setOn, handleZoomIn, handleZoomOut } = useZoomImage(currentIndex);

  return (
    <Show
      when={isMounted}
      fallback={<div className='bg-muted-primary/50 h-96 w-full animate-pulse rounded-md xl:col-span-10 xl:h-152' />}
    >
      <div className={cn('relative overflow-hidden px-0.5', className)} {...props}>
        <div className='absolute top-2.5 left-2.5 z-20 md:top-3 md:left-37.5 xl:left-50'>
          <Show
            when={on}
            fallback={
              <ZoomButton isZoomIn={false} onClick={handleZoomIn}>
                <Search className='size-6' />
              </ZoomButton>
            }
          >
            <ZoomButton isZoomIn onClick={handleZoomOut}>
              <ZoomOut className='size-6' />
            </ZoomButton>
          </Show>
        </div>

        <ImageGallery
          infinite
          items={images}
          showNav={false}
          ref={galleryRef}
          showPlayButton={false}
          showFullscreenButton={false}
          additionalClass='rounded-md'
          thumbnailPosition={isMobile ? 'bottom' : 'left'}
          onSlide={index => {
            setCurrentIndex(index);
            setOn(false);
          }}
          renderItem={item => (
            <GalleryItem item={item} index={images.indexOf(item)} transformRefs={transformRefs} isZoomEnabled={on} />
          )}
        />

        {!isMobile && <ControlButton disabled={!canGoNext} onClick={handleNext} />}

        <div className='absolute top-2.5 right-2.5 z-20 grid gap-y-3.5 md:top-5 md:right-5'>
          <WishlistBtn className='bg-surface/50' productId={productId} variantId={variantId} />
          <CompareButton className='bg-surface/50' />
        </div>
      </div>
    </Show>
  );
}
