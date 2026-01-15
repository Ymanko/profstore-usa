import { useEffect, useRef, useState } from 'react';

export function useHash() {
  // Always start with empty string to match SSR, then sync on client
  const [hash, setHash] = useState('');
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onHashChanged = () => {
      setHash(window.location.hash);
    };

    // Initialize hash from current location on first effect run
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      onHashChanged(); // Call via the handler to keep it consistent
    }

    const { pushState, replaceState } = window.history;

    window.history.pushState = function (...args) {
      pushState.apply(window.history, args);
      setTimeout(() => setHash(window.location.hash));
    };

    window.history.replaceState = function (...args) {
      replaceState.apply(window.history, args);
      setTimeout(() => setHash(window.location.hash));
    };

    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
      window.history.pushState = pushState;
      window.history.replaceState = replaceState;
    };
  }, []);

  return {
    hash,
    setHash,
  };
}
