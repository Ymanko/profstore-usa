import { useEffect, useRef, useState } from 'react';

const SEARCH_BLUR_DELAY_MS = 100;

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setIsFocus(false), SEARCH_BLUR_DELAY_MS);
  };

  const toggleCatalog = () => {
    setIsCatalogOpen(prev => !prev);
    setIsFocus(false);
  };

  const closeCatalog = () => {
    setIsCatalogOpen(false);
  };

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
