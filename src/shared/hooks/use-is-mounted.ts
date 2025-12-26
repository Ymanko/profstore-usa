import { useEffect } from 'react';
import { useBoolean } from 'react-use';

/**
 * Hook to detect if component is mounted on client-side.
 * Useful for avoiding hydration mismatches when using browser APIs.
 *
 * @returns boolean - false during SSR and initial render, true after mount
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useBoolean(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return isMounted;
}
