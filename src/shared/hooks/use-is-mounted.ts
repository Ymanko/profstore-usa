import { useEffect } from 'react';
import { useBoolean } from 'react-use';

export function useIsMounted() {
  const [isMounted, setIsMounted] = useBoolean(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return isMounted;
}
