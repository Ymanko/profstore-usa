import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { BannerSlide } from '@/shared/queries/home/content/types';

type BannerSlideProps = {
  data: BannerSlide;
  className?: string;
};

export function MainBannerSlide({ data, className }: BannerSlideProps) {
  const { title, subtitle, buttonText, image, imageAlt, buttonLink } = data;
  const href = buttonLink ?? '/';

  const containerClasses = cn(
    'bg-brand-section-bg relative flex w-full overflow-hidden rounded-[20px]',
    'justify-center md:justify-start',
    'aspect-495/414 md:aspect-668/380 xl:aspect-981/408',
    className,
  );

  const contentWrapperClasses =
    'md:items-stretch relative flex w-full flex-col items-center justify-end gap-5 text-center text-white md:flex-row md:justify-between md:self-end md:text-left';

  if (!buttonText) {
    return (
      <Link href={href} className={cn(containerClasses, 'items-center p-7.5 pb-15')}>
        <BannerImage image={image} imageAlt={imageAlt} title={title} />
        <div className={cn(contentWrapperClasses, 'mt-auto')}>
          <BannerContent title={title} subtitle={subtitle} />
        </div>
      </Link>
    );
  }

  return (
    <div className={cn(containerClasses, 'items-end p-7.5 pb-15 max-[384px]:p-5 max-[384px]:pb-7.5')}>
      <BannerImage image={image} imageAlt={imageAlt} title={title} />
      <Link
        href={href}
        aria-label={title}
        className="absolute inset-0 z-10 before:absolute before:inset-0 before:content-[''] md:hidden"
      />
      <div className={contentWrapperClasses}>
        <BannerContent title={title} subtitle={subtitle} />
        <Button
          className='hidden h-fit min-w-59 justify-center rounded-lg px-4 py-4 text-lg font-medium text-white shadow-sm md:flex'
          options='gradient'
          asChild
        >
          <Link href={href}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}

function BannerImage({ image, imageAlt, title }: { image: string; imageAlt?: string; title: string }) {
  return (
    <div className='absolute inset-0 top-0 z-0 h-full w-full'>
      <Image
        src={image}
        alt={imageAlt ?? title}
        fill
        className='object-cover object-center'
        sizes='(max-width: 768px) 345px, (max-width: 1280px) 668px, 981px'
        priority
        quality={95}
      />
    </div>
  );
}

function BannerContent({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className='flex flex-col'>
      <Typography
        as='h3'
        className='mb-3.5 max-w-131.5 text-[25px] leading-tight font-extrabold uppercase md:text-[35px] lg:text-[45px]'
      >
        {title}
      </Typography>
      {subtitle && <Typography className='md:text-[20px]'>{subtitle}</Typography>}
    </div>
  );
}
