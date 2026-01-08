import { useRef, useState } from 'react';

import type ImageGallery from 'react-image-gallery';

export function useGallery(count: number, isMobile: boolean, infinite = false) {
  const galleryRef = useRef<ImageGallery>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevious() {
    galleryRef.current?.slideToIndex(currentIndex - 1);
  }

  function handleNext() {
    galleryRef.current?.slideToIndex(currentIndex + 1);
  }

  const canGoPrev = infinite || currentIndex > 0;
  const canGoNext = infinite || currentIndex < count - 1;
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
