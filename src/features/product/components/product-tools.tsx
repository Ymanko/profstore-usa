import Image from 'next/image';

import { Badge } from '@/shared/components/ui/badge';
import { Typography, type TypographyProps } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ImageProps } from 'next/image';
import type { ComponentProps } from 'react';

function ProductWrapper({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('bg-sidebar rounded-xl', className)} data-slot='product-wrapper' {...props} />;
}

function ProductArticle({ article }: { article: string }) {
  return (
    <Typography className='text-muted-foreground font-inter' data-slot='product-article'>
      Article: <span className='text-foreground'>{article}</span>
    </Typography>
  );
}

function ProductTitle({ className, ...props }: TypographyProps) {
  return (
    <Typography
      className={cn('scroll-mt-20 text-[25px] leading-6.5 font-bold xl:scroll-mt-30 xl:text-3xl', className)}
      data-slot='product-description-title'
      {...props}
    />
  );
}

function ProductPrice({ newPrice, oldPrice, discount }: { newPrice: string; oldPrice: string; discount: string }) {
  return (
    <div className='flex items-center gap-x-4 md:gap-x-10'>
      <Typography className='text-secondary text-3xl font-black md:text-[40px] md:leading-10'>{newPrice}</Typography>
      <Typography className='text-muted-foreground font-semibold md:text-xl'>{oldPrice}</Typography>
      <Badge className='bg-secondary ml-auto rounded-md px-5 py-1.5 text-sm font-semibold md:ml-0 md:text-base'>
        {discount}
      </Badge>
    </div>
  );
}

function ProductBrand({ title, ...props }: ImageProps & { title: string }) {
  return (
    <div className='flex items-center gap-x-4 md:gap-x-5'>
      <Image className='h-18.75 w-40 md:h-21.5 md:w-45.5' {...props} />

      <div className='space-y-1'>
        <Typography className='font-bold'>Manufacturer:</Typography>
        <Typography className='font-light'>{title}</Typography>
      </div>
    </div>
  );
}

export { ProductArticle, ProductTitle, ProductWrapper, ProductPrice, ProductBrand };
