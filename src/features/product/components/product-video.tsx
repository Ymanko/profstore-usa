import Image from 'next/image';

import { ProductTitle } from '@/features/product/components/product-tools';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';

export function ProductVideo() {
  return (
    <>
      <ProductTitle className='mb-7.5'>Video</ProductTitle>

      <List
        data={[1, 2]}
        renderItem={_item => (
          <>
            <div className='overflow-hidden rounded'>
              <Image src='/img/video.jpg' alt='video' width={434} height={245} />
            </div>

            <div className='space-y-5 text-[17px] leading-4.5'>
              <Typography className='font-bold'>Avantco Planetary Mixers Overview</Typography>
              <Typography className='font-light'>
                Effortlessly prepare food for your cafe or restaurant with Avantco planetary mixers.
              </Typography>
            </div>
          </>
        )}
        keyExtractor={item => item.toString()}
        className='mb-12.5 space-y-11'
        itemClassName='space-y-5.75'
      />
    </>
  );
}
