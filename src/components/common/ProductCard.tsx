import Image from 'next/image';
import { Typography } from '@/components/ui/Typography';

type ProductCardProps = {
  item: {
    id: string;
    title: string;
    featuredImage?: {
      url: string;
      altText?: string | null;
    } | null;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    availableForSale: boolean;
  };
  onAddToCart?: () => void;
};

export const ProductCard = ({ item, onAddToCart }: ProductCardProps) => {
  const { title, featuredImage, priceRange, availableForSale } = item;

  return (
    <div className="flex flex-col rounded-lg border p-4 w-full h-full">
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-md">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="w-full object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        )}
      </div>
      <Typography variant="h3" as="h3" className="mb-1 line-clamp-2">
        {title}
      </Typography>
      <Typography
        variant="body"
        className={`mb-3 text-sm ${availableForSale ? 'text-green-600' : 'text-red-600'
          }`}
      >
        {availableForSale ? 'In stock' : 'Out of stock'}
      </Typography>
      <div className="mt-auto flex items-center justify-between gap-3">
        <Typography variant="body" className="font-semibold">
          {priceRange.minVariantPrice.amount}{' '}
          {priceRange.minVariantPrice.currencyCode}
        </Typography>

        <button
          onClick={onAddToCart}
          disabled={!availableForSale}
          className="rounded-md bg-black px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
};
