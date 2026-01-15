import { useMemo } from 'react';

import type { ReactImageGalleryItem } from 'react-image-gallery';

export interface GalleryImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

export function useGalleryImages(images: GalleryImage[]): ReactImageGalleryItem[] {
  return useMemo(
    () =>
      images.map(image => ({
        original: image.url,
        thumbnail: image.url,
        originalClass: 'object-contain object-center w-full h-auto max-w-full',
        thumbnailClass:
          'object-cover object-center md:aspect-[120/102] md:w-[118px] md:h-[102px] xl:h-[136px] xl:w-[162px] xl:aspect-[162/136] mr-2.5 mt-5 md:mt-0 md:mr-0 md:mb-4 md:mr-5',
        originalAlt: image?.altText || 'Product image',
      })),
    [images],
  );
}
