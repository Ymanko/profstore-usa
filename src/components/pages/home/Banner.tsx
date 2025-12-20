'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { BannerSlide } from '@/components/common/BannerSlide';
import { PopularProductBanner } from '@/components/common/PopularCard';
import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';
import { getPopularProductsQueryOptions } from '@/queries/home/get-popular-products';

export function Banner() {
  const { data: popular } = useSuspenseQuery(getPopularProductsQueryOptions);
  console.log('popular: ', popular);

  console.log('popular products:', popular);

  return (
    <Section className='pb-10.5 md:pb-12.5'>
      <Typography variant='h2' as='h2' className='mb-6'>
        Popular Products
      </Typography>

      {/* Popular Products Carousel
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {popular.products.map(({ node: product }) => (
          <div key={product.id} className='border p-4'>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className='mb-4 h-48 w-full object-cover'
              />
            )}
            <Typography variant='h3' className='mb-2'>
              {product.title}
            </Typography>
            <div className='flex items-center gap-2'>
              {product.compareAtPriceRange.minVariantPrice.amount !== '0.0' && (
                <span className='text-sm text-gray-500 line-through'>
                  ${product.compareAtPriceRange.minVariantPrice.amount}
                </span>
              )}
              <span className='font-bold'>
                ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
              </span>
            </div>
          </div>
        ))}
      </div> */}
      <BannerSlide imageSrc='https://placehold.co/500x500.png' />
      {/* <PopularProductBanner
        title="Bar blender Quamar CE/1 inox"
        image="https://placehold.co/100x200.png"
        price={1200}
        oldPrice={1400}
        saleLabel="Sale / -55%"
        description="Bar blender Quamar CE/1 inox is a professional economy class equipment that combines the optimal..."
      /> */}


      {popular.products.length === 0 && (
        <Typography variant='body-lg' className='text-center text-gray-500'>
          No popular products found
        </Typography>
      )}
    </Section>
  );
}
