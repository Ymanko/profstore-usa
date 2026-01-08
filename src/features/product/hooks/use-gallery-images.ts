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
        originalAlt: image.altText || undefined,
        thumbnailAlt: image.altText || undefined,
        originalWidth: image.width || undefined,
        originalHeight: image.height || undefined,
      })),
    [images],
  );
}
