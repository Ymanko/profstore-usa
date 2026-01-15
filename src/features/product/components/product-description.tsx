import { ContentBlock } from '@/features/categories/components/content-block';
import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { Show } from '@/shared/components/common/show';

import type { ContentBlockProps } from '@/shared/types/content-block.types';

export function ProductDescription({ description }: { description: ContentBlockProps[] }) {
  return (
    <Show when={!!description.length}>
      <ProductTitle className='mb-5' id={ProductDetailsAnchor.Description}>
        Detailed description
      </ProductTitle>

      <div className='space-y-5'>
        {description.map((block, index) => (
          <ContentBlock
            key={index}
            text={block.text}
            media={block.media}
            poster={block.poster}
            mediaPosition={block.mediaPosition}
          />
        ))}
      </div>
    </Show>
  );
}
