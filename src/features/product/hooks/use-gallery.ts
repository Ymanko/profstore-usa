import { useRef, useState } from 'react';

import type ImageGallery from 'react-image-gallery';

export function useGallery(count: number, infinite = false) {
  const galleryRef = useRef<ImageGallery>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function handleNext() {
    galleryRef.current?.slideToIndex(currentIndex + 1);
  }

  const canGoPrev = infinite || currentIndex > 0;
  const canGoNext = infinite || currentIndex < count - 1;

  return {
    canGoNext,
    canGoPrev,
    currentIndex,
    galleryRef,
    handleNext,
    setCurrentIndex,
  };
}
