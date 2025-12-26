import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ImageProps } from 'next/image';
import type { LinkProps } from 'next/link';

type ProductCardProps = {
  alt: ImageProps['alt'];
  href: LinkProps['href'];
  image: ImageProps['src'];
  onClick?: LinkProps['onClick'];
  title: string;
  titleClassName?: string;
};

export const CategoryCard = ({ href, title, image, alt, onClick, titleClassName }: ProductCardProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='border-border group hover:border-border flex h-full flex-col rounded-lg border p-4 text-center transition-all'
    >
      <div className='border-border mb-3 flex h-30 w-full shrink-0 items-center justify-center border-b pb-3'>
        <Image
          src={image}
          alt={alt}
          width={100}
          height={100}
          className='max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110'
          loading='lazy'
        />
      </div>

      <Typography variant='h3' className={cn('text-center', titleClassName)}>
        {title}
      </Typography>
    </Link>
  );
};
