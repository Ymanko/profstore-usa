import Image from 'next/image';

import { Typography } from '@/components/ui/Typography';

import { Icon } from '../ui/Icon';

type ProductCardProps = {
  item: {
    id: string;
    title: string;
    featuredImage?: {
      url: string;
      altText?: string | null;
    } | null;
    price: string;
    oldPrice: string;
    availableForSale: boolean;
  };
  onAddToCart?: () => void;
};

export const ProductCard = ({ item, onAddToCart }: ProductCardProps) => {
  const { title, featuredImage, price, oldPrice, availableForSale } = item;

  const currentPrice = parseInt(price);
  const previousPrice = parseInt(oldPrice);
  const hasDiscount = previousPrice > currentPrice;

  return (
    <div className='flex h-full w-full flex-col rounded-lg border p-4'>
      <div className='relative mb-3.5 aspect-square w-full overflow-hidden border-b pb-5'>
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className='w-full object-cover'
            sizes='
            (max-width: 640px) 310px,
            (max-width: 1024px) 50vw,
            25vw
            '
          />
        )}
        <button
          onClick={onAddToCart}
          disabled={!availableForSale}
          className='bg-transpatent text-#0F0F0F hover:text-accent absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-[5px] opacity-30 hover:opacity-100'
        >
          <Icon name='heart' className='' width='18' height='18' />
        </button>
      </div>
      <Typography variant='h3' as='h3' className='mb-1 line-clamp-2'>
        {title}
      </Typography>
      <Typography
        variant='body'
        className={`mb-3 flex items-center gap-2 text-sm ${availableForSale ? 'text-muted-foreground' : 'text-red-600'}`}
      >
        <Icon name='checkmarkSmall' className='' width='22' height='22' />{' '}
        {availableForSale ? 'In stock' : 'Out of stock'}
      </Typography>
      <div className='mt-auto flex items-center justify-between gap-3'>
        <Typography variant='body' className='font-bold'>
          {/* {priceRange.minVariantPrice.amount} $ */}
          <div className='flex items-baseline gap-2'>
            {/* Завжди показуємо актуальну ціну */}
            <span className='text-foreground text-3xl leading-tight font-extrabold'>
              {hasDiscount ? currentPrice : previousPrice}$
            </span>

            {/* Показуємо стару ціну тільки якщо вона більша */}
            {hasDiscount && (
              <span className='text- leading-[1.2] font-bold text-[#9f9f9f] line-through'>{previousPrice}$</span>
            )}
          </div>
        </Typography>

        <button
          onClick={onAddToCart}
          disabled={!availableForSale}
          className='hover:text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)] text-white'
        >
          <Icon name='shoppingCart' className='' width='18' height='18' />
        </button>
      </div>
    </div>
  );
};
