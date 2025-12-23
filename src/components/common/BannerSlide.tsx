import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import { Typography } from '../ui/Typography';

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
            'bg-brand-section-bg relative flex w-full overflow-hidden rounded-[20px]',
            'items-end justify-center md:justify-start',
            'p-7.5 pb-15 max-[384px]:p-5 max-[384px]:pb-7.5',
            'aspect-[495/414] md:aspect-[668/380] xl:aspect-[981/408]',
            className,
          )}
        >
          <div className='absolute inset-0 top-0 z-0 h-full w-full'>
            <Image
              src={image}
              alt={imageAlt ? imageAlt : title}
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 345px, (max-width: 1280px) 668px, 981px'
              priority
              quality={95}
            />
          </div>
          <Link
            href={buttonLink ? buttonLink : '/'}
            aria-label={title}
            className="absolute inset-0 z-10 before:absolute before:inset-0 before:content-[''] md:hidden"
          ></Link>
          <div className='md:items-strech relative flex w-full flex-col items-center justify-end gap-5 text-center text-white md:flex-row md:justify-between md:self-end md:text-left'>
            <div className='flex flex-col'>
              <Typography
                as='h3'
                className='mb-3.5 max-w-131.5 text-[25px] leading-tight font-extrabold uppercase md:text-[35px] lg:text-[45px]'
              >
                {title}
              </Typography>
              <Typography className='md:text-[20px]'>{subtitle}</Typography>
            </div>
            <Link
              href={buttonLink ? buttonLink : '/'}
              className='bg-secondary hover:bg-secondary/90 hidden h-auto min-w-59 justify-center rounded-lg px-4 py-4 text-lg font-medium text-white shadow-sm transition-all hover:scale-105 md:flex'
            >
              {buttonText || 'Click ME'}
            </Link>
          </div>
        </div>
      ) : (
        <Link
          href={buttonLink ? buttonLink : '/'}
          className={cn(
            'bg-brand-section-bg relative flex w-full overflow-hidden rounded-[20px]',
            'items-center justify-center md:justify-start',
            'p-7.5 pb-15',
            'aspect-[495/414] md:aspect-[668/380] xl:aspect-[981/408]',
            className,
          )}
        >
          <div className='absolute inset-0 top-0 z-0 h-full w-full'>
            <Image
              src={image}
              alt={imageAlt ? imageAlt : title}
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 345px, (max-width: 1280px) 668px, 981px'
              priority
              quality={95}
            />
          </div>

          <div className='md:items-strech relative mt-auto flex w-full flex-col items-center justify-end gap-5 text-center text-white md:flex-row md:justify-between md:self-end md:text-left'>
            <div className='flex flex-col'>
              <Typography
                as='h3'
                className='mb-3.5 max-w-131.5 text-[25px] leading-tight font-extrabold uppercase md:text-[35px] lg:text-[45px]'
              >
                {title}
              </Typography>
              <Typography className='md:text-[20px]'>{subtitle}</Typography>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
