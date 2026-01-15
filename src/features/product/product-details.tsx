'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useMedia } from 'react-use';

import { NotFound } from '@/features/layout/not-found';
import { CustomersAlsoBought } from '@/features/product/components/customers-also-bought';
import { Gallery } from '@/features/product/components/gallery';
import { ProductActions } from '@/features/product/components/product-actions';
import { ProductBenefits } from '@/features/product/components/product-benefits';
import { ProductCharacteristics } from '@/features/product/components/product-characteristics';
import { ProductDescription } from '@/features/product/components/product-description';
import { ProductFiles, type ProductFile } from '@/features/product/components/product-files';
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
import { ReviewForm } from '@/features/product/components/review-form';
import { ReviewsList } from '@/features/product/components/reviews-list';
import { ProductVideoCarousel } from '@/features/product/components/video-carousel';
import { calculateReviewStats, transformReviews } from '@/features/product/utils/review-helpers';
import type { ProductData } from '@/shared/queries/products/get-product';

type FilesMetafield = NonNullable<NonNullable<ProductData['product']>['files']>;

function transformFiles(filesMetafield: FilesMetafield | null | undefined): ProductFile[] {
  if (!filesMetafield?.references?.edges) return [];

  return filesMetafield.references.edges.map(edge => {
    const fields = edge.node.fields;
    const getField = (key: string) => fields.find(f => f.key === key);

    return {
      handle: edge.node.handle,
      title: getField('title')?.value || 'Untitled',
      category: (getField('category')?.value as 'file' | 'manual') || 'file',
      url: getField('file')?.reference?.url || '',
      fileSize: getField('file')?.reference?.originalFileSize || 0,
      mimeType: getField('file')?.reference?.mimeType || '',
    };
  });
}
import { Show } from '@/shared/components/common/show';
import { Separator } from '@/shared/components/ui/separator';
import { Typography } from '@/shared/components/ui/typography';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';
import { getProductReviewsQueryOptions } from '@/shared/queries/reviews/get-product-reviews';

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

export function ProductDetails({ handle }: { handle: string }) {
  const { data: product } = useSuspenseQuery(getProductQueryOptions(handle));
  const { data: reviews = [] } = useQuery(getProductReviewsQueryOptions(product?.id || ''));
  const isMounted = useIsMounted();
  const isDesktop = useMedia('(min-width: 1280px)');
  const isMobileAndTablet = useMedia('(max-width: 1279px)');

  // Debug metafields
  console.log('=== METAFIELDS ===');
  console.log('fullDescription:', product?.fullDescription);
  console.log('videos:', product?.videos);
  console.log('characteristics:', product?.characteristics);
  console.log(
    'files:',
    product?.files?.references.edges.map(edge => edge.node),
  );
  console.log('==================');

  const images = product?.images.edges.map(edge => edge.node) || [];
  const reviewStats = useMemo(() => calculateReviewStats(reviews), [reviews]);
  const formattedReviews = useMemo(() => transformReviews(reviews), [reviews]);
  const productFiles = useMemo(() => transformFiles(product?.files), [product?.files]);

  return (
    <div className='container mb-21'>
      <Show when={product} fallback={<NotFound>Product not found</NotFound>}>
        <Typography variant='h1' as='h1' className='mb-3.5 md:mb-5'>
          {product?.title}
        </Typography>

        <div className='mb-6 items-center justify-between sm:flex md:mb-7.5'>
          <Rating rating={reviewStats.averageRating} commentsCount={reviewStats.totalReviews} />
          <ProductArticle article={product?.variants.edges.at(0)?.node.sku} />
        </div>

        <div className='grid gap-12.5 md:gap-8.75 xl:grid-cols-16 xl:gap-5'>
          <Gallery className='xl:col-span-10' items={images} />

          <div className='space-y-6 xl:col-span-6'>
            <ProductWrapper className='px-2.5 py-5 md:px-7.5 md:py-5.5'>
              <ProductPrice product={product} />
              <Separator className='my-3.75 md:mt-7.5 md:mb-5' />
              <ProductBenefits />
            </ProductWrapper>

            <ProductActions />
            <Separator className='mt-1.5 mb-7.5' />
            <ProductBrand
              title={product?.manufacturer?.value}
              src={product?.brandLogo?.reference?.image?.url ?? ''}
              width={182}
              height={86}
              alt={`${product?.manufacturer?.value} logo`}
            />
          </div>
        </div>

        <Separator className='my-7.5' />
        <ProductNavigation />

        <div className='pt-10.5 pb-8.5 md:pt-6.25 md:pb-11.25 xl:grid xl:grid-cols-16 xl:gap-5'>
          <div className='space-y-12 xl:col-span-11'>
            <ProductDescription />
            <Show when={isMounted && isDesktop}>
              <ProductCharacteristics />
            </Show>
          </div>

          <Show when={isMounted && isDesktop}>
            <div className='xl:col-span-5'>
              <ProductVideo videos={videos} />
              <ProductFiles files={productFiles} />
            </div>
          </Show>

          <Separator className='bg-accent my-13 h-0.75! xl:hidden' />
          <Show when={isMounted && isMobileAndTablet}>
            <ProductVideoCarousel videos={videos} />
          </Show>
        </div>

        <Separator className='bg-accent mb-13 hidden h-0.75! xl:block' />
        <Show when={isMounted && isMobileAndTablet}>
          <ProductCharacteristics />
        </Show>

        <CustomersAlsoBought />
        <Separator className='bg-accent my-7.5 h-0.75!' />
        <RelatedProduct />

        <Show when={isMounted && isMobileAndTablet}>
          <ProductFiles files={productFiles} className='mt-12.5' />
        </Show>

        <Separator className='bg-accent my-7.5 h-0.75!' />

        <div className='grid gap-5.75 md:grid-cols-6 xl:grid-cols-16'>
          <RatingSummary
            className='md:col-span-2 xl:col-span-3'
            averageRating={reviewStats.averageRating}
            totalReviews={reviewStats.totalReviews}
            breakdown={reviewStats.breakdown}
          />

          <ReviewsList className='md:col-span-4 xl:col-span-13' reviews={formattedReviews} />
        </div>

        <Separator className='bg-accent my-7.5 h-0.75!' />
        <ReviewForm productId={product?.id || ''} className='max-w-2xl' />
      </Show>
    </div>
  );
}
