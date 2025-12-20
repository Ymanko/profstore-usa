'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { BannerSlide } from '@/components/common/BannerSlide';
import { PopularProductBanner } from '@/components/common/PopularCard';
import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';
import { getHomePageContentQueryOptions } from '@/queries/home/get-home-page-content';
import { getPopularProductsQueryOptions } from '@/queries/home/get-popular-products';

export function Banner() {
  const { data: popularProducts } = useSuspenseQuery(getPopularProductsQueryOptions);
  const { data: { bannerSlides } } = useSuspenseQuery(getHomePageContentQueryOptions);

  console.log('popularProducts: ', popularProducts);
  console.log('popularProducts[1].image', popularProducts[1].image);
  // {
  // productId: getLastSegment(popular.products[0].node.id)
  // title: popular.products[0].node.title,
  // image: popular.products[0].node.metafields?[q].key === "custom_product_image" && popular.products[0].node.metafields?[q].value,
  // price: popular.products[0].node.compareAtPriceRange.minVariantPrice.amount,
  // oldPrice: popular.products[0].node.priceRange.minVariantPrice.amount,
  // description:  popular.products[0].node.metafields?[0].key === "short_description" && popular.products[0].node.metafields?[0].value,
  // }


  return (
    <Section className='pb-10.5 md:pt-7.5 md:pb-12.5'>

      <div className='flex gap-5'>
        <BannerSlide imageSrc={bannerSlides[1].image || 'https://placehold.co/500x500.png'} />
        <div className='xl:block hidden shrink-0'>
          <PopularProductBanner
            title="Bar blender Quamar CE/1 inox"
            image={popularProducts[1].image || "https://placehold.co/100x200.png"}
            price={1200}
            oldPrice={1400}
            saleLabel="Sale / -55%"
            description="Bar blender Quamar CE/1 inox is a professional economy class equipment that combines the optimal..."
          />
        </div>


        {popularProducts.length === 0 && (
          <Typography variant='body-lg' className='text-center text-gray-500'>
            No popular products found
          </Typography>
        )}
      </div>
    </Section>
  );
}
