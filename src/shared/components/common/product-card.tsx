import Image from 'next/image';

import { Show } from '@/shared/components/common/show';
import { Icon } from '@/shared/components/ui/icon';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { Product } from '@/shared/queries/collections/get-subcategory-products';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface ProductCardProps extends ComponentPropsWithoutRef<'div'> {
  product: Product;
  view?: 'grid' | 'list';
  onAddToCart?: (productId: string) => void;
  onAddToFavorites?: (productId: string) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  view = 'grid',
  onAddToCart,
  onAddToFavorites,
  className,
}) => {
  const { id, title, featuredImage, availableForSale, priceRange, compareAtPriceRange } = product;

  const currentPrice = parseFloat(compareAtPriceRange?.minVariantPrice.amount);
  const previousPrice = parseFloat(priceRange?.minVariantPrice.amount);
  const hasDiscount = currentPrice !== 0 && previousPrice > currentPrice;

  const isListView = view === 'list';

  return (
    <div
      className={cn(
        'gap-4 rounded-lg border p-4 transition-all duration-300',
        isListView ? 'flex h-auto' : 'grid h-full',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          isListView ? 'h-40 w-40 shrink-0' : 'h-60 w-full',
        )}
      >
        <Show when={featuredImage}>
          <Image
            src={featuredImage?.url ?? ''}
            alt={featuredImage?.altText ?? title}
            className='h-full w-full object-contain'
            width={isListView ? 160 : 304}
            height={isListView ? 160 : 240}
            loading='lazy'
          />
        </Show>

        <button
          onClick={() => (onAddToFavorites ? onAddToFavorites(id) : null)}
          className='text-muted-foreground hover:text-accent absolute top-0 right-0 flex size-10 items-center justify-center rounded-md transition-colors duration-200'
          aria-label='Add to favorites'
        >
          <Icon name='heart' width={18} height={18} />
        </button>
      </div>

      <div className={cn('flex flex-col', isListView ? 'flex-1' : 'space-y-2.5 border-t pt-3.75')}>
        <div className={cn(isListView && 'flex-1 space-y-2.5')}>
          <Typography variant='h3' as='h3' className='line-clamp-1 font-semibold'>
            {title}
          </Typography>

          <Typography
            variant='body'
            className={cn(
              'flex items-center gap-2 text-base',
              availableForSale ? 'text-muted-foreground' : 'text-rose-600',
            )}
          >
            <Icon name='checkmarkSmall' width={22} height={22} />
            {availableForSale ? 'In stock' : 'Out of stock'}
          </Typography>
        </div>

        <div className={cn('flex items-center justify-between gap-3', isListView ? 'mt-auto' : 'mt-auto')}>
          <div className='space-y-1'>
            <Show when={hasDiscount}>
              <Typography variant='body' className='text-muted-foreground text-base font-bold line-through'>
                {previousPrice}$
              </Typography>
            </Show>

            <Typography variant='body' className='text-foreground text-[22px] leading-tight font-extrabold'>
              {hasDiscount ? currentPrice : previousPrice} $
            </Typography>
          </div>

          <button
            onClick={() => (onAddToCart ? onAddToCart(id) : null)}
            className='hover:text-accent flex size-10 shrink-0 items-center justify-center rounded-md bg-linear-to-r from-[rgb(87,144,64)] to-[rgb(58,111,67)] text-white transition-colors duration-200 disabled:opacity-50'
            aria-label='Add to cart'
          >
            <Icon name='shoppingCart' width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
