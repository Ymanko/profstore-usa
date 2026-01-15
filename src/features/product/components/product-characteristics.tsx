import { ProductTitle, ProductWrapper } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';

interface ProductCharacteristicsProps {
  title?: string | null;
  description?: string | null;
}

export function ProductCharacteristics({ data }: { data?: ProductCharacteristicsProps[] }) {
  return (
    <ProductWrapper className='p-2.5 pt-6'>
      <ProductTitle className='mb-3.75' id={ProductDetailsAnchor.Characteristics}>
        Characteristics
      </ProductTitle>

      <List
        data={data ?? []}
        renderItem={item => (
          <>
            <Typography className='col-span-2 font-bold'>{item.title}:</Typography>
            <Typography className='text-muted-foreground col-span-4 pl-3'>{item.description}</Typography>
          </>
        )}
        keyExtractor={(_, index) => index}
        itemClassName='grid grid-cols-6 pl-5 py-3 odd:bg-white rounded-md even:bg-transparent'
      />
    </ProductWrapper>
  );
}
