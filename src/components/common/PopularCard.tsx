'use client';

import Image from 'next/image';

import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Typography } from '../ui/Typography';

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
    // <div
    //   className={cn(
    //     'bg-surface-default relative flex h-full max-w-[435px] flex-col gap-3 rounded-[20px] border-0 p-5',
    //     className,
    //   )}
    // >
    //   <div className='absolute inset-0 h-full shrink-0 overflow-hidden rounded-lg'>
    //     <Image
    //       src={image ? image : 'https://cdn.shopify.com/s/files/1/0745/0886/1694/files/Group_2.png?v=1766223903'}
    //       alt={title}
    //       fill
    //       className='object-cover'
    //     />
    //   </div>
    //   <div className='relative flex items-center justify-between gap-4'>
    //     <Typography variant='h1' as='h3' className='text-foreground text-[25px] leading-tight'>
    //       {title}
    //     </Typography>
    //
    //     {discount > 0 && (
    //       <button className='relative inline-flex items-center gap-6 rounded-[10px] bg-[linear-gradient(120deg,var(--foreground)_50%,var(--secondary)_50%)] px-4 py-3 text-xs font-semibold'>
    //         <Typography variant='small' as='span' className='text-center leading-[17px] font-medium text-white'>
    //           Sale
    //         </Typography>
    //         <Typography variant='small' as='span' className='text-center leading-[17px] font-medium text-white'>
    //           -{discount}%
    //         </Typography>
    //       </button>
    //     )}
    //   </div>
    //
    //   <div className='relative flex flex-col items-start justify-between gap-5 pl-37.5'>
    //     <div className='mb-5 flex items-baseline gap-3'>
    //       {discount > 0 ? (
    //         <>
    //           <span className='text-foreground text-3xl leading-tight font-extrabold'>{price.toLocaleString()}$</span>
    //           <span className='text-xl leading-[1.2] font-bold text-[#9f9f9f]'>{oldPrice.toLocaleString()}$</span>
    //         </>
    //       ) : (
    //         <span className='text-foreground text-3xl leading-tight font-extrabold'>{oldPrice.toLocaleString()}$</span>
    //       )}
    //     </div>
    //
    //     {/* DESCRIPTION */}
    //     <Typography variant='body' className='mb-5 leading-tight font-light text-[#9f9f9f]'>
    //       {description}
    //     </Typography>
    //     <Button
    //       size='lg'
    //       className={cn(
    //         'hover:text-accent h-13.5 gap-3.5 bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)] py-3 has-[>svg]:pr-[30px]',
    //       )}
    //     >
    //       <Icon name='shoppingCart' className='size-6 shrink-0' width='24' height='24' />
    //       <span className='h-full w-[1px] bg-[#FFFFFF66]'></span>
    //       <Typography variant='h3' as='span' className='font-medium'>
    //         Basket
    //       </Typography>
    //     </Button>
    //   </div>
    // </div>
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
          />
        </div>

        <div className='col-span-2 ml-5 flex flex-col items-baseline gap-7 relative'>
          {/*Price*/}
          <div className='flex items-baseline gap-3'>
            {discount > 0 ? (
              <>
                <span className='text-foreground text-3xl leading-tight font-extrabold'>{price.toLocaleString()}$</span>
                <span className='text-xl leading-[1.2] font-bold text-[#9f9f9f]'>{oldPrice.toLocaleString()}$</span>
              </>
            ) : (
              <span className='text-foreground text-3xl leading-tight font-extrabold'>
                {oldPrice.toLocaleString()}$
              </span>
            )}
          </div>

          {/*Description*/}
          <Typography variant='body' className='leading-tight font-light text-[#9f9f9f]'>
            {description}
          </Typography>

          {/*Button*/}
          <Button
            size='lg'
            className={cn(
              'hover:text-accent h-13.5 gap-3.5 bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)] py-3 has-[>svg]:pr-7.5',
            )}
          >
            <Icon name='shoppingCart' className='size-6 shrink-0' width='24' height='24' />
            <span className='h-full w-px bg-[#FFFFFF66]'></span>
            <Typography variant='h3' as='span' className='font-medium'>
              Basket
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
