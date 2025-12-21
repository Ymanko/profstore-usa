import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import type { BannerSlide } from '@/queries/home/get-home-page-content';

type BannerSlideProps = {
  data: BannerSlide;
  className?: string;
};

export const MainBannerSlide = ({ data, className }: BannerSlideProps) => {
  const { title, subtitle, buttonText, image, imageAlt, buttonLink } = data;

  return (
    <>
      {buttonText ? (
        <div
          className={cn(
            'bg-brand-section-bg relative flex h-102 w-full overflow-hidden rounded-[20px]',
            'items-center justify-center md:justify-start',
            'p-7.5 pb-15',
            className,
          )}
        >
          <div className='absolute inset-0 top-0 z-0 h-full w-full'>
            <Image
              src={image}
              alt={imageAlt ? imageAlt : title}
              fill
              className='object-cover object-center'
              sizes='(max-width: 1280px) 100vw, 70vw'
              priority
              quality={90}
            />
          </div>

          <div className='md:items-strech relative mt-auto flex w-full flex-col items-center justify-end gap-5 text-center text-white md:flex-row md:justify-between md:self-end md:text-left'>
            <div className='flex flex-col'>
              <h3 className='mb-3.5 max-w-131.5 text-[25px] leading-tight font-extrabold uppercase md:text-[35px] lg:text-[45px]'>
                {title}
              </h3>
              <p className='md:text-[20px]'>{subtitle}</p>
            </div>
            <Link
              href={buttonLink ? buttonLink : '/'}
              className='bg-secondary hover:bg-secondary/90 flex h-auto min-w-59 justify-center rounded-lg px-4 py-4 text-lg font-medium text-white shadow-sm transition-all hover:scale-105'
            >
              {buttonText || 'Click ME'}
            </Link>
          </div>
        </div>
      ) : (
        <Link
          href={buttonLink ? buttonLink : '/'}
          className={cn(
            'bg-brand-section-bg relative flex h-102 w-full overflow-hidden rounded-[20px]',
            'items-center justify-center md:justify-start',
            'p-7.5 pb-15',
            className,
          )}
        >
          <div className='absolute inset-0 top-0 z-0 h-full w-full'>
            <Image
              src={image}
              alt={imageAlt ? imageAlt : title}
              fill
              className='object-cover object-center'
              sizes='(max-width: 1280px) 100vw, 70vw'
              priority
              quality={90}
            />
          </div>

          <div className='md:items-strech relative mt-auto flex w-full flex-col items-center justify-end gap-5 text-center text-white md:flex-row md:justify-between md:self-end md:text-left'>
            <div className='flex flex-col'>
              <h3 className='mb-3.5 max-w-131.5 text-[25px] leading-tight font-extrabold uppercase md:text-[35px] lg:text-[45px]'>
                {title}
              </h3>
              <p className='md:text-[20px]'>{subtitle}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
