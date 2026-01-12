'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useMedia } from 'react-use';

import { NotFound } from '@/features/layout/not-found';
import { CustomersAlsoBought } from '@/features/product/components/customers-also-bought';
import { Gallery } from '@/features/product/components/gallery';
import { ProductActions } from '@/features/product/components/product-actions';
import { ProductBenefits } from '@/features/product/components/product-benefits';
import { ProductCharacteristics } from '@/features/product/components/product-characteristics';
import { ProductDescription } from '@/features/product/components/product-description';
import { ProductFiles } from '@/features/product/components/product-files';
import { ProductNavigation } from '@/features/product/components/product-navigation';
import {
  ProductArticle,
  ProductBrand,
  ProductPrice,
  ProductWrapper,
} from '@/features/product/components/product-tools';
import { ProductVideo } from '@/features/product/components/product-video';
import { Rating } from '@/features/product/components/rating';
import { RatingSummary } from '@/features/product/components/rating-summary';
import { RelatedProduct } from '@/features/product/components/related-product';
import { ReviewsList } from '@/features/product/components/reviews-list';
import { ProductVideoCarousel } from '@/features/product/components/video-carousel';
import { Show } from '@/shared/components/common/show';
import { Separator } from '@/shared/components/ui/separator';
import { Typography } from '@/shared/components/ui/typography';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';

export function ProductDetails({ handle }: { handle: string }) {
  const isDesktop = useMedia('(min-width: 1280px)');
  const isMobileAndTablet = useMedia('(max-width: 1279px)');

  const { data: product } = useSuspenseQuery(getProductQueryOptions(handle));

  const images = product?.images.edges.map(edge => edge.node) || [];

  const videos = [
    {
      id: '1',
      thumbnail: '/img/video.jpg',
      title: 'Avantco Planetary Mixers Overview',
      description: 'Effortlessly prepare food for your cafe or restaurant with Avantco planetary mixers.',
    },
    {
      id: '2',
      thumbnail: '/img/video.jpg',
      title: 'Avantco Planetary Mixers Overview',
      description: 'Effortlessly prepare food for your cafe or restaurant with Avantco planetary mixers.',
    },
  ];

  return (
    <div className='container'>
      <Show when={product} fallback={<NotFound>Product not found</NotFound>}>
        <Typography variant='h1' as='h1' className='mb-3.5 md:mb-5'>
          {product?.title}
        </Typography>

        <div className='mb-6 items-center justify-between sm:flex md:mb-7.5'>
          <Rating rating={3.5} commentsCount={1} />
          <ProductArticle article='0014' />
        </div>

        <div className='grid gap-12.5 md:gap-8.75 xl:grid-cols-16 xl:gap-5'>
          <Gallery className='xl:col-span-10' items={images} />

          <div className='space-y-6 xl:col-span-6'>
            <ProductWrapper className='px-2.5 py-5 md:px-7.5 md:py-5.5'>
              <ProductPrice newPrice='1,099 $' oldPrice='13,233 $' discount='20%' />
              <Separator className='my-3.75 md:mt-7.5 md:mb-6.25' />
              <ProductBenefits />
            </ProductWrapper>

            <ProductActions />
            <Separator className='mt-1.5 mb-7.5' />
            <ProductBrand title='Quamar (Italy)' src='/img/quamar-logo.png' width={182} height={86} alt='quamar-logo' />
          </div>
        </div>

        <Separator className='my-7.5' />
        <ProductNavigation />

        <div className='pt-10.5 pb-8.5 md:pt-6.25 md:pb-11.25 xl:grid xl:grid-cols-16 xl:gap-5'>
          <div className='xl:col-span-11'>
            <ProductDescription />
            {isDesktop && <ProductCharacteristics />}
          </div>

          {isDesktop && (
            <div className='xl:col-span-5'>
              <ProductVideo videos={videos} />
              <ProductFiles />
            </div>
          )}

          <Separator className='bg-accent my-13 h-0.75! xl:hidden' />
          {isMobileAndTablet && <ProductVideoCarousel videos={videos} />}
        </div>

        <Separator className='bg-accent mb-13 hidden h-0.75! xl:block' />
        {isMobileAndTablet && <ProductCharacteristics />}

        <CustomersAlsoBought />
        <Separator className='bg-accent my-7.5 h-0.75!' />
        <RelatedProduct />

        {isMobileAndTablet && <ProductFiles className='mt-12.5' />}

        <Separator className='bg-accent my-7.5 h-0.75!' />

        <RatingSummary
          averageRating={4.0}
          totalReviews={1}
          breakdown={[
            { stars: 5, count: 3 },
            { stars: 4, count: 3 },
            { stars: 3, count: 3 },
            { stars: 2, count: 3 },
            { stars: 1, count: 0 },
          ]}
        />

        <ReviewsList
          className='mt-5.75'
          reviews={[
            {
              id: '1',
              author: 'Jana L.',
              company: "Nanna's Sweets",
              date: '16.02.2021',
              rating: 2,
              content: `Wow, this Vitamix blender I purchased is extremely durable, has awesome power and so easy to clean.\n\nIt is quite loud on high speed, but hey...I can live with that since it blends the creamiest smoothies ever.`,
            },
          ]}
        />
      </Show>
    </div>
  );
}
