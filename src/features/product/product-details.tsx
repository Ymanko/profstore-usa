'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMedia } from 'react-use';

import { PopularCollectionProducts } from '@/features/collections/components/popular-collection-products';
import { NotFound } from '@/features/layout/not-found';
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
import { Show } from '@/shared/components/common/show';
import { Separator } from '@/shared/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Typography } from '@/shared/components/ui/typography';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';

export function ProductDetails({ handle }: { handle: string }) {
  const params = useParams();
  const subcategory = Array.isArray(params.subcategory) ? params.subcategory[0] : params.subcategory;

  const isDesktop = useMedia('(min-width: 1280px)');
  const isMobileAndTablet = useMedia('(max-width: 1279px)');

  const { data: product } = useSuspenseQuery(getProductQueryOptions(handle));

  const images = product?.images.edges.map(edge => edge.node) || [];

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
          {/*Gallery*/}
          <Gallery className='xl:col-span-10' items={images} />

          {/*Additional info*/}
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

            <Show when={isDesktop}>
              <ProductCharacteristics />
            </Show>
          </div>

          <Show when={isDesktop}>
            <div className='xl:col-span-5'>
              <ProductVideo />
              <ProductFiles />
            </div>
          </Show>

          <Separator className='bg-accent my-13 h-0.75! xl:hidden' />

          <Show when={isMobileAndTablet}>
            <ProductVideo />
          </Show>
        </div>

        <Separator className='bg-accent mb-13 hidden h-0.75! xl:block' />

        <Show when={isMobileAndTablet}>
          <ProductCharacteristics />
        </Show>

        <Show when={isMobileAndTablet}>
          <div className='bg-sidebar rounded-lg p-2.5'>
            <Tabs defaultValue='files'>
              <TabsList className='w-full gap-4.25 rounded-xl bg-white px-5 py-2.5'>
                <TabsTrigger value='files'>Files</TabsTrigger>
                <TabsTrigger value='manuals'>Manuals</TabsTrigger>
              </TabsList>

              <div className='p-5'>
                <TabsContent value='files' className='grid grid-cols-2 gap-3.75 md:grid-cols-3 md:gap-5 xl:grid-cols-2'>
                  Download available files here.
                </TabsContent>

                <TabsContent
                  value='manuals'
                  className='grid grid-cols-2 gap-3.75 md:grid-cols-3 md:gap-5 xl:grid-cols-2'
                >
                  Download available manuals here.
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Show>

        <PopularCollectionProducts handle={subcategory ?? ''} />

        <PopularCollectionProducts handle={subcategory ?? ''} />
      </Show>
    </div>
  );
}
