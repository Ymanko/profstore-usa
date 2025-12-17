'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';
import { getCategoriesQueryOptions } from '@/queries/home/get-categories';

export function Categories() {
  const { data: categories } = useSuspenseQuery(getCategoriesQueryOptions);

  return (
    <Section className='pb-10.5 md:pb-12.5'>
      <Typography variant='h2' as='h2' className='mb-6'>
        Categories
      </Typography>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {categories.map(({ node: category }) => (
          <a
            key={category.id}
            href={`/collections/${category.handle}`}
            className='group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg'
          >
            {category.image && (
              <div className='aspect-square overflow-hidden'>
                <img
                  src={category.image.url}
                  alt={category.image.altText || category.title}
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
                />
              </div>
            )}
            <div className='p-4'>
              <Typography variant='h3' className='mb-2'>
                {category.title}
              </Typography>
              {category.description && (
                <Typography variant='body' className='text-gray-600'>
                  {category.description}
                </Typography>
              )}
            </div>
          </a>
        ))}
      </div>

      {categories.length === 0 && (
        <Typography variant='body-lg' className='text-center text-gray-500'>
          No categories found
        </Typography>
      )}
    </Section>
  );
}
