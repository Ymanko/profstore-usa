import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';

export function ProductCharacteristics() {
  return (
    <div className='bg-sidebar rounded-lg p-2.5 pt-6'>
      <ProductTitle className='mb-3.75' id={ProductDetailsAnchor.Characteristics}>
        Characteristics
      </ProductTitle>

      <List
        data={[
          { title: 'Length', description: '160 mm.' },
          { title: 'Width', description: '160 mm.' },
          { title: 'Height', description: '430 mm.' },
          { title: 'Power, kW', description: '0.2' },
          { title: 'Voltage', description: '220-240 V - 50/60 Hz' },
          { title: 'Speed', description: '17 000 rpm' },
        ]}
        renderItem={item => (
          <>
            <Typography className='col-span-2 font-bold'>{item.title}:</Typography>
            <Typography className='text-muted-foreground col-span-4 pl-3'>{item.description}</Typography>
          </>
        )}
        keyExtractor={item => item.title}
        itemClassName='grid grid-cols-6 pl-5 py-3 odd:bg-white rounded-md even:bg-transparent'
      />
    </div>
  );
}
