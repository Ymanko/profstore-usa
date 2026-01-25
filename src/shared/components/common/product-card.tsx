import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/shared/components/common/icon';
import { Show } from '@/shared/components/common/show';
import { WishlistBtn } from '@/shared/components/common/wishlist-btn';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';
import { calculateDiscountPercentage } from '@/shared/utils/calculate-discount-percentage';

import type { BaseProduct } from '@/shared/queries/products/types';
import type { LinkProps } from 'next/link';
import type { ComponentProps, PropsWithChildren } from 'react';

interface ProductCardProps extends ComponentProps<'div'> {
  product: BaseProduct;
  view?: 'grid' | 'list';
  variant?: 'default' | 'discount';
  showDiscountBadge?: boolean;
  href?: LinkProps['href'];
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({
  className,
  product,
  view = 'grid',
  variant = 'default',
  showDiscountBadge = false,
  href = '#',
  onAddToCart,
}: ProductCardProps) {
  const { id, title, featuredImage, availableForSale, priceRange, compareAtPriceRange, variants } = product;

  const currentPrice = parseFloat(compareAtPriceRange?.minVariantPrice.amount);
  const previousPrice = parseFloat(priceRange?.minVariantPrice.amount);
  const hasDiscount = currentPrice !== 0 && previousPrice > currentPrice;

  const isListView = view === 'list';
  const isDiscountVariant = variant === 'discount';
  const discountPercentage = hasDiscount ? calculateDiscountPercentage(previousPrice, currentPrice) : 0;

  // Get first variant ID for wishlist
  const firstVariantId = variants?.edges[0]?.node.id;

  return (
    <div
      className={cn(
        'relative gap-4 rounded-lg border p-4 transition-all duration-300',
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

        <Show when={showDiscountBadge && hasDiscount}>
          <DiscountBadge percentage={discountPercentage} />
        </Show>

        <WishlistBtn className='absolute top-0 right-0 z-20' productId={id} variantId={firstVariantId} />
      </div>

      <div className={cn('flex flex-col', isListView ? 'flex-1' : 'space-y-2.5 border-t pt-3.75')}>
        <div className={cn(isListView && 'flex-1 space-y-2.5')}>
          <Typography variant='h3' as='h3' className='line-clamp-1 font-semibold'>
            <Show when={href} fallback={title}>
              <CardLink href={href}>{title}</CardLink>
            </Show>
          </Typography>

          <AvailabilityIndicator isAvailable={availableForSale} />
        </div>

        <div className={cn('flex items-center justify-between gap-3', isListView ? 'mt-auto' : 'mt-auto')}>
          <Show when={isDiscountVariant && hasDiscount}>
            <PriceInRow previousPrice={previousPrice} currentPrice={currentPrice} />
          </Show>

          <Show when={!isDiscountVariant}>
            <PriceStacked currentPrice={hasDiscount ? currentPrice : previousPrice} previousPrice={previousPrice} />
          </Show>

          <AddToCartButton onClick={() => (onAddToCart ? onAddToCart(id) : null)} />
        </div>
      </div>
    </div>
  );
}

function DiscountBadge({ percentage }: { percentage: number }) {
  return (
    <span className='bg-secondary absolute top-0 left-0 flex items-center rounded-md px-3 text-lg font-bold text-white'>
      {percentage}%
    </span>
  );
}

function PriceInRow({ previousPrice, currentPrice }: { previousPrice: number; currentPrice: number }) {
  return (
    <div className='flex items-center gap-2'>
      <Typography variant='body' className='text-muted-foreground text-base line-through'>
        {Math.round(previousPrice)} $
      </Typography>
      <Typography variant='body' className='text-secondary text-[22px] leading-tight font-extrabold'>
        {Math.round(currentPrice)} $
      </Typography>
    </div>
  );
}

function PriceStacked({ previousPrice, currentPrice }: { previousPrice: number; currentPrice: number }) {
  return (
    <div className='space-y-1'>
      <Show when={previousPrice > currentPrice}>
        <Typography variant='body' className='text-muted-foreground text-base font-bold line-through'>
          {previousPrice}$
        </Typography>
      </Show>

      <Typography variant='body' className='text-foreground text-[22px] leading-tight font-extrabold'>
        {currentPrice} $
      </Typography>
    </div>
  );
}

function AddToCartButton({ ...props }: ComponentProps<'button'>) {
  return (
    <button
      type='button'
      className='hover:text-accent flex size-10 shrink-0 items-center justify-center rounded-md bg-linear-to-r from-[rgb(87,144,64)] to-[rgb(58,111,67)] text-white transition-colors duration-200 disabled:opacity-50'
      aria-label='Add to cart'
      {...props}
    >
      <Icon name='shopping-cart' width={18} height={18} />
    </button>
  );
}

function CardLink({ ...props }: LinkProps & PropsWithChildren) {
  return (
    <Link
      className={cn(
        'before:absolute before:inset-0 before:rounded-lg before:border before:border-transparent before:transition-[border-color] before:duration-200',
        'focus-visible:before:border-ring focus-visible:before:ring-ring/50 focus-visible:outline-none focus-visible:before:ring-[3px]',
        'hover:before:border-secondary hover:before:border-2',
      )}
      {...props}
    />
  );
}

function AvailabilityIndicator({ isAvailable }: { isAvailable: boolean }) {
  return (
    <div className='flex items-center gap-2'>
      <Icon
        name='checkmark-small'
        width={20}
        height={20}
        className={isAvailable ? 'text-secondary' : 'text-rose-600'}
      />
      <Typography variant='body' className='text-muted-foreground text-base'>
        {isAvailable ? 'In stock' : 'Out of stock'}
      </Typography>
    </div>
  );
}
