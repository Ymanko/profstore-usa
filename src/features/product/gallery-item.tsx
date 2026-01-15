import Image from 'next/image';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import type { RefObject } from 'react';
import type { ReactImageGalleryItem } from 'react-image-gallery';
import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

interface RenderItemProps {
  item: ReactImageGalleryItem;
  index?: number;
  transformRefs: RefObject<(ReactZoomPanPinchContentRef | null)[]>;
  isZoomEnabled: boolean;
}

export function GalleryItem({ item, index = 0, transformRefs, isZoomEnabled }: RenderItemProps) {
  return (
    <TransformWrapper
      ref={ref => {
        // eslint-disable-next-line react-hooks/immutability
        transformRefs.current[index] = ref;
      }}
      initialScale={1}
      disabled={!isZoomEnabled}
      wheel={{ disabled: !isZoomEnabled }}
      doubleClick={{ disabled: true }}
    >
      {() => (
        <TransformComponent>
          <Image
            className='object-contain object-center md:h-128.5 xl:h-152'
            src={item.original}
            alt={item.originalAlt || 'Product image'}
            width={800}
            height={800}
          />
        </TransformComponent>
      )}
    </TransformWrapper>
  );
}
