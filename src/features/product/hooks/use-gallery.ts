import { useRef, useState } from 'react';

import type ImageGallery from 'react-image-gallery';

export function useGallery(count: number, isMobile: boolean) {
  const galleryRef = useRef<ImageGallery>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevious() {
    if (currentIndex > 0) {
      galleryRef.current?.slideToIndex(currentIndex - 1);
    }
  }

  function handleNext() {
    if (currentIndex < count - 1) {
      galleryRef.current?.slideToIndex(currentIndex + 1);
    }
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < count - 1;
  const showThumbnailControls = !isMobile && count > 4;

  return {
    canGoNext,
    canGoPrev,
    currentIndex,
    galleryRef,
    handleNext,
    handlePrevious,
    setCurrentIndex,
    showThumbnailControls,
  };
}
