import { useEffect, useRef, useState } from 'react';

import { SEARCH_BLUR_DELAY_MS } from '@/constants/search';

/**
 * Custom hook для управління станом пошуку та каталогу
 *
 * Виправлення:
 * - Memory leak з setTimeout
 * - Централізована логіка фокусу
 * - Cleanup при unmount
 */
export function useSearchState() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleFocus = () => {
    setIsFocus(true);
    setIsCatalogOpen(false);
  };

  const handleBlur = () => {
    // Cleanup попереднього timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Delay для blur щоб спрацював onClick на результатах пошуку
    timeoutRef.current = setTimeout(() => setIsFocus(false), SEARCH_BLUR_DELAY_MS);
  };

  const toggleCatalog = () => {
    setIsCatalogOpen(prev => !prev);
    setIsFocus(false);
  };

  const closeCatalog = () => {
    setIsCatalogOpen(false);
  };

  // Cleanup при unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    searchValue,
    setSearchValue,
    isFocus,
    isCatalogOpen,
    handleFocus,
    handleBlur,
    toggleCatalog,
    closeCatalog,
  };
}
