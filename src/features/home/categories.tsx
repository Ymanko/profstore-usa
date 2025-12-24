'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CategoryCard } from '@/shared/components/common/category-card';
import { Section } from '@/shared/components/common/section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { Typography } from '@/shared/components/ui/typography';
import { getCategoriesQueryOptions } from '@/shared/queries/home/get-categories';

export function Categories() {
  const { data: categories } = useSuspenseQuery(getCategoriesQueryOptions);

  return (
    <Section className='py-2.5'>
      <div className='relative'>
        <Typography variant='h2' as='h2' className='mb-5'>
          Categories
        </Typography>

        <Carousel
          className='w-full'
          opts={{
            align: 'start',
            slidesToScroll: 'auto',
          }}
        >
          <CarouselContent>
            {categories.map(({ node: category }) => (
              <CarouselItem key={category.id} className='basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/7'>
                <CategoryCard
                  href={`/collections/${category.handle}`}
                  title={category.title}
                  image={category?.image?.url || ''}
                  alt={category?.image?.altText || category.title}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='absolute top-0 right-0 flex gap-3'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        {categories.length === 0 && (
          <Typography variant='body-lg' className='text-center text-gray-500'>
            No categories found
          </Typography>
        )}
      </div>
    </Section>
  );
}
