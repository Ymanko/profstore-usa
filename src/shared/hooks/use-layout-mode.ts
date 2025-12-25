'use client';

import { useLocalStorage } from 'react-use';

export type LayoutMode = 'grid' | 'list';

const LAYOUT_MODE_KEY = 'product-layout-mode';

export function useLayoutMode(defaultMode: LayoutMode = 'grid') {
  const [layoutMode, setLayoutMode] = useLocalStorage<LayoutMode>(LAYOUT_MODE_KEY, defaultMode);

  const setMode = (mode: LayoutMode) => {
    setLayoutMode(mode);
  };

  const toggleMode = () => {
    const newMode = layoutMode === 'grid' ? 'list' : 'grid';
    setLayoutMode(newMode);
  };

  const isGrid = layoutMode === 'grid';
  const isList = layoutMode === 'list';

  return {
    layoutMode,
    setMode,
    toggleMode,
    isGrid,
    isList,
  };
}
