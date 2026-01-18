import { ProductTitle } from '@/features/product/components/product-tools';
import { List } from '@/shared/components/common/list';
import { VideoPlayer } from '@/shared/components/common/video-player';
import { Typography } from '@/shared/components/ui/typography';

import type { Video } from '@/features/product/components/video-carousel';
import type { FC } from 'react';

interface ProductVideoProps {
  videos: Video[];
  className?: string;
}

export const ProductVideo: FC<ProductVideoProps> = ({ videos, className }) => {
  if (videos.length === 0) return null;

  return (
    <div className={className}>
      <ProductTitle className='mb-7.5'>Video</ProductTitle>

      <List
        data={videos}
        renderItem={video => (
          <>
            <VideoPlayer src={video.url} />

            <div className='space-y-5 text-[17px] leading-4.5'>
              <Typography className='font-bold'>{video.title}</Typography>
              <Typography className='font-light'>{video.description}</Typography>
            </div>
          </>
        )}
        keyExtractor={video => video.id}
        className='mb-12.5 space-y-11'
        itemClassName='space-y-5.75'
      />
    </div>
  );
};
