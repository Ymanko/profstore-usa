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
    </div>
  );
};
