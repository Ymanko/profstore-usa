'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CategoryCard } from '@/components/common/CategoryCard';
import { Section } from '@/components/common/Section';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';
import { Typography } from '@/components/ui/Typography';
import { getCategoriesQueryOptions } from '@/queries/home/get-categories';

export function Categories() {
  const { data: categories } = useSuspenseQuery(getCategoriesQueryOptions);

  return (
    <Section className='pb-10.5 md:pb-12.5'>
      <div className='relative'>
        <Typography variant='h2' as='h2' className='mb-6'>
          Categories
        </Typography>

        <Carousel className="w-full">
          <CarouselContent>
            {categories.map(({ node: category }) => (
              <CarouselItem key={category.id} className='basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/7'>
                <CategoryCard
                  href={`/collections/${category.handle}`}
                  title={category.title}
                  image={category?.image?.url}
                  alt={category?.image?.altText || category.title}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='absolute top-0 right-0 hidden md:flex gap-3'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        {
          categories.length === 0 && (
            <Typography variant='body-lg' className='text-center text-gray-500'>
              No categories found
            </Typography>
          )
        }
      </div>
    </Section >
  );
}

//  href={`/collections/${category.handle}`}
//  title={category.title}
//  image={category.image.url}
//  alt={category.image.altText || category.title}