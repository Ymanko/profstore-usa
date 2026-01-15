import Image from 'next/image';

import { getPrice } from '@/features/product/utils/helpers';
import { Show } from '@/shared/components/common/show';
import { Badge } from '@/shared/components/ui/badge';
import { Typography, type TypographyProps } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';
import { calculateDiscountPercentage } from '@/shared/utils/calculate-discount-percentage';

import type { ProductData } from '@/shared/queries/products/get-product';
import type { ImageProps } from 'next/image';
import type { ComponentProps } from 'react';

function ProductWrapper({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('bg-sidebar rounded-xl', className)} data-slot='product-wrapper' {...props} />;
}

function ProductArticle({ article }: { article?: string }) {
  if (!article) return null;

  return (
    <Typography className='text-muted-foreground font-inter' data-slot='product-article'>
      Article: <span className='text-foreground'>{article}</span>
    </Typography>
  );
}

function ProductTitle({ className, ...props }: TypographyProps) {
  return (
    <Typography
      className={cn('scroll-mt-20 text-[25px] leading-6.5 font-bold md:scroll-mt-30 xl:text-3xl', className)}
      data-slot='product-description-title'
      {...props}
    />
  );
}

function ProductPrice({ product }: { product: ProductData['product'] }) {
  if (!product) return null;

  const currentPrice = product.compareAtPriceRange.minVariantPrice;
  const previousPrice = product.priceRange.minVariantPrice;

  const currentAmount = Number(currentPrice.amount);
  const previousAmount = Number(previousPrice.amount);

  // If compareAtPrice is 0 or not set, or if it's >= regular price, show only regular price
  const hasValidDiscount = currentAmount > 0 && previousAmount > currentAmount;

  const displayPrice = hasValidDiscount
    ? getPrice(currentPrice.currencyCode, currentPrice.amount)
    : getPrice(previousPrice.currencyCode, previousPrice.amount);

  const oldPrice = getPrice(previousPrice.currencyCode, previousPrice.amount);
  const discountPercentage = hasValidDiscount ? calculateDiscountPercentage(previousAmount, currentAmount) : 0;

  return (
    <div className='flex items-center gap-x-4 md:gap-x-10'>
      <Typography className='text-secondary text-3xl font-bold md:text-[40px] md:leading-10'>{displayPrice}</Typography>

      <Show when={hasValidDiscount}>
        <Typography className='text-muted-foreground font-semibold md:text-xl'>{oldPrice}</Typography>
      </Show>

      <Show when={hasValidDiscount && discountPercentage > 0}>
        <Badge className='bg-secondary ml-auto rounded-sm px-5 py-1.5 text-sm font-semibold md:ml-0 md:text-base'>
          -{discountPercentage}%
        </Badge>
      </Show>
    </div>
  );
}

function ProductBrand({ title, ...props }: ImageProps & { title?: string }) {
  return (
    <div className='flex items-center gap-x-4 md:gap-x-5'>
      <div className='flex h-18.75 w-40 items-center justify-center md:h-21.5 md:w-45.5'>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image className='h-auto w-40 object-cover object-center md:w-45.5' {...props} />
      </div>

      {title && (
        <div className='space-y-1'>
          <Typography className='font-bold'>Manufacturer:</Typography>
          <Typography className='font-light'>{title}</Typography>
        </div>
      )}
    </div>
  );
}

export const Product = {
  Article: ProductArticle,
  Title: ProductTitle,
  Wrapper: ProductWrapper,
  Price: ProductPrice,
  Brand: ProductBrand,
};

export { ProductArticle, ProductTitle, ProductWrapper, ProductPrice, ProductBrand };
