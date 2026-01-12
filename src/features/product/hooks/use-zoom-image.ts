import { useRef } from 'react';
import { useToggle } from 'react-use';

import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

export function useZoomImage(currentIndex: number) {
  const transformRefs = useRef<(ReactZoomPanPinchContentRef | null)[]>([]);
  const [on, setOn] = useToggle(false);

  const handleZoomIn = () => {
    const currentRef = transformRefs.current[currentIndex];

    if (currentRef) {
      currentRef.zoomIn();
      setOn(true);
    }
  };

  const handleZoomOut = () => {
    const currentRef = transformRefs.current[currentIndex];

    if (currentRef) {
      currentRef.resetTransform();
      setOn(false);
    }
  };

  return {
    on,
    transformRefs,
    setOn,
    handleZoomIn,
    handleZoomOut,
  };
}
