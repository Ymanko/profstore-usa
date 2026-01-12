'use client';

import Image from 'next/image';

import { BasketBtn } from '@/shared/components/common/basket-btn';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

type PopularProductBanner = {
  title: string;
  image?: string;
  price: number;
  oldPrice: number;
  description: string | null;
  className?: string;
};

type PopularProductBannerProps = {
  product: PopularProductBanner;
};

export function PopularProductBanner({ product }: PopularProductBannerProps) {
  const { title, image, price, oldPrice, description: rawDescription, className } = product;

  const description =
    rawDescription ??
    'Bar blender Quamar CE/1 inox is a professional economy class equipment that combines the optimal...';
  const discount = price > 0 && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <div
      className={cn(
        'bg-surface-default relative flex h-full w-full flex-col gap-3 rounded-[20px] border-0 p-5',
        className,
      )}
    >
      {/*Card Header*/}
      <div className='flex items-center justify-between gap-4'>
        <Typography variant='h1' as='h3' className='text-foreground text-[25px] leading-tight'>
          {title}
        </Typography>

        {discount > 0 && (
          <button className='relative inline-flex items-center gap-6 rounded-[10px] bg-[linear-gradient(120deg,var(--foreground)_50%,var(--secondary)_50%)] px-4 py-3 text-xs font-semibold'>
            <Typography variant='small' as='span' className='text-center leading-4.25 font-medium text-white'>
              Sale
            </Typography>

            <Typography variant='small' as='span' className='text-center leading-4.25 font-medium text-white'>
              -{discount}%
            </Typography>
          </button>
        )}
      </div>

      {/*Card Content*/}
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <Image
            src={image ? image : 'https://cdn.shopify.com/s/files/1/0745/0886/1694/files/Group_2.png?v=1766223903'}
            alt={title}
            fill
            className='h-full w-full rounded-lg object-contain object-left'
            loading='lazy'
          />
        </div>

        <div className='relative col-span-2 ml-5 flex flex-col items-baseline gap-7'>
          {/*Price*/}
          <div className='flex items-baseline gap-3'>
            <Show
              when={discount > 0}
              fallback={
                <span className='text-foreground text-3xl leading-tight font-extrabold'>
                  {oldPrice.toLocaleString()}$
                </span>
              }
            >
              <span className='text-foreground text-3xl leading-tight font-extrabold'>{price.toLocaleString()}$</span>
              <span className='text-xl leading-[1.2] font-bold text-[#9f9f9f]'>{oldPrice.toLocaleString()}$</span>
            </Show>
          </div>

          {/*Description*/}
          <Typography variant='body' className='leading-tight font-light text-[#9f9f9f]'>
            {description}
          </Typography>

          {/*Button*/}
          <BasketBtn />
        </div>
      </div>
    </div>
  );
}
