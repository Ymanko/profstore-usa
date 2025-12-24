'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CategoryCard } from '@/shared/components/common/category-card';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { RichText } from '@/shared/components/common/rich-text';
import { Section } from '@/shared/components/common/section';
import { Typography } from '@/shared/components/ui/typography';
import { getCategoryByHandleQueryOptions } from '@/shared/queries/categories/get-category-by-handle';

type CategoryDetailProps = {
  handle: string;
};

export function CategoryDetail({ handle }: CategoryDetailProps) {
  const { data: category } = useSuspenseQuery(getCategoryByHandleQueryOptions(handle));

  if (!category) {
    return (
      <Section className='py-10'>
        <Typography variant='body-lg' className='text-center text-gray-500'>
          Category not found
        </Typography>
      </Section>
    );
  }

  return (
    <PageWrapper>
      <div className='space-y-8'>
        <Typography variant='h1' as='h1'>
          {category.title}
        </Typography>

        {category.description && (
          <div className='mb-8'>
            <RichText content={category.description} />
          </div>
        )}

        <div>
          <Typography variant='h2' as='h2' className='mb-5'>
            Subcategories
          </Typography>

          {category.subCollections.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {category.subCollections.map(subCollection => (
                <CategoryCard
                  key={subCollection.id}
                  href={`/collections/${subCollection.handle}`}
                  title={subCollection.title}
                  image={subCollection.image?.url || ''}
                  alt={subCollection.image?.altText || subCollection.title}
                />
              ))}
            </div>
          ) : (
            <Typography variant='body-lg' className='text-center text-gray-500'>
              No subcategories available
            </Typography>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
