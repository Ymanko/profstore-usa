'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ProductWrapper } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { List } from '@/shared/components/common/list';
import { cn } from '@/shared/lib/utils';

export function ProductNavigation() {
  const pathname = usePathname();

  return (
    <ProductWrapper className='p-3.5'>
      <List
        data={Object.values(ProductDetailsAnchor)}
        renderItem={item => (
          <Link
            className={cn(
              'border-accent block rounded-lg border px-2.5 py-2 md:px-5.75 md:py-2.5',
              'text-muted-foreground text-[15px] leading-3.75 font-bold md:text-[17px] md:leading-4.25',
              'hover:bg-accent transition-colors duration-200 first-letter:uppercase hover:text-black',
              pathname?.includes(item) && 'bg-accent text-black',
            )}
            href={`#${item}`}
          >
            {item.split('_').join(' ')}
          </Link>
        )}
        keyExtractor={item => item}
        className='flex flex-wrap items-center justify-center gap-2.5 md:justify-start'
      />
    </ProductWrapper>
  );
}
