import Image from 'next/image';

import { Show } from '@/shared/components/common/show';
import { Icon } from '@/shared/components/ui/icon';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { Product } from '@/shared/queries/collections/get-subcategory-products';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface DiscountedProductCardProps extends ComponentPropsWithoutRef<'div'> {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onAddToFavorites?: (productId: string) => void;
}

export function calculateDiscountPercentage(oldPrice: number, newPrice: number): number {
  const percentPerPrice = (newPrice * 100) / oldPrice;
  return Math.round(100 - percentPerPrice);
}

export const DiscountedProductCard: FC<DiscountedProductCardProps> = ({
  product,
  onAddToCart,
  onAddToFavorites,
  className,
}) => {
  const { id, title, featuredImage, availableForSale, priceRange, compareAtPriceRange } = product;

  const oldPrice = parseFloat(priceRange?.minVariantPrice.amount);
  const newPrice = parseFloat(compareAtPriceRange?.minVariantPrice.amount);

  return (
    <div className={cn('grid h-full gap-4 rounded-lg border p-4 transition-all duration-300', className)}>
      <div className='relative h-60 w-full overflow-hidden transition-all duration-300'>
        <Show when={featuredImage}>
          <Image
            src={featuredImage?.url ?? ''}
            alt={featuredImage?.altText ?? title}
            className='h-full w-full object-contain'
            width={304}
            height={240}
            loading='lazy'
          />
        </Show>

        {/* Badge in top left */}
        <span className='bg-secondary absolute top-0 left-0 flex items-center rounded-md px-3 text-lg font-bold text-white'>
          {calculateDiscountPercentage(oldPrice, newPrice)}%
        </span>

        {/* Heart in top right */}
        <button
          onClick={() => (onAddToFavorites ? onAddToFavorites(id) : null)}
          className='text-muted-foreground hover:text-accent absolute top-0 right-0 flex size-10 items-center justify-center rounded-md transition-colors duration-200'
          aria-label='Add to favorites'
        >
          <Icon name='heart' width={18} height={18} />
        </button>
      </div>

      <div className='flex flex-col space-y-2.5 border-t pt-3.75'>
        <div>
          <Typography variant='h3' as='h3' className='line-clamp-1 font-semibold'>
            {title}
          </Typography>

          <Typography variant='body' className={cn('text-muted-foreground flex items-center gap-2 text-base')}>
            <Icon
              name='checkmarkSmall'
              width={20}
              height={20}
              className={availableForSale ? 'text-muted-foreground' : 'text-rose-600'}
            />

            {availableForSale ? 'In stock' : 'Out of stock'}
          </Typography>
        </div>

        <div className='mt-auto flex items-center justify-between gap-3'>
          {/* Prices in row: old price left, new price right */}
          <div className='flex items-center gap-2'>
            <Typography variant='body' className='text-muted-foreground text-base line-through'>
              {Math.round(oldPrice)} $
            </Typography>

            <Typography variant='body' className='text-secondary text-[22px] leading-tight font-extrabold'>
              {Math.round(newPrice)} $
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
