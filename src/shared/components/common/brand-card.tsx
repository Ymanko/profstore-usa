import Image from 'next/image';

type Brand = {
  name: string;
  logo: string;
  logoAlt: string;
};

type BrandCardProps = {
  brand: Brand;
  width?: number;
};

export function BrandCard({ brand, width = 152 }: BrandCardProps) {
  return (
    <div className='relative flex aspect-auto h-full max-h-27.5 w-full rounded-[10px] bg-white px-6 py-5'>
      <Image
        src={brand.logo}
        alt={brand.logoAlt}
        width={150}
        height={75}
        className='h-auto w-full object-contain'
        sizes={`${width}px`}
        quality={90}
        loading='lazy'
      />
    </div>
  );
}
