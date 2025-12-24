import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@/shared/components/ui/typography';

type ProductCardProps = {
  href: string;
  title: string;
  alt: string;
  image: string;
  onClick?: () => void;
};

export const CategoryCard = ({ href, title, image, alt, onClick }: ProductCardProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='border-border group hover:border-border flex h-full flex-col items-center rounded-lg border p-4 text-center transition-all'
    >
      <div className='border-border mb-3 flex h-30 w-full shrink-0 items-center justify-center border-b pb-3 transition-transform group-hover:scale-105'>
        <Image
          src={image || 'https://placehold.co/100x100.png'}
          alt={alt}
          width={100}
          height={100}
          className='object-contain'
          loading='lazy'
        />
      </div>

      <Typography variant='h3' className='flex h-full items-center justify-center uppercase'>
        {title}
      </Typography>
    </Link>
  );
};
