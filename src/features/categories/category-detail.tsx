'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ContentBlock } from '@/features/categories/components/content-block';
import { CategoryCard } from '@/shared/components/common/category-card';
import { List } from '@/shared/components/common/list';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Section } from '@/shared/components/common/section';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { getCategoryQueryOptions } from '@/shared/queries/categories/get-category';

type CategoryDetailProps = {
  handle: string;
};

export function CategoryDetail({ handle }: CategoryDetailProps) {
  const { data: category } = useSuspenseQuery(getCategoryQueryOptions(handle));

  if (!category) {
    return (
      <Section className='py-10'>
        <Typography variant='body-lg' className='text-muted-foreground text-center'>
          Category not found
        </Typography>
      </Section>
    );
  }

  return (
    <PageWrapper>
      <div className='container space-y-8'>
        <Typography variant='h1' as='h1'>
          {category.title}
        </Typography>

        <Show
          when={category.subCollections.length > 0}
          fallback={
            <Typography variant='body-lg' className='text-muted-foreground text-center'>
              No categories available
            </Typography>
          }
        >
          <List
            data={category.subCollections}
            keyExtractor={item => item.id}
            renderItem={subCollection => (
              <CategoryCard
                key={subCollection.id}
                href={`/collections/${category.handle}/${subCollection.handle}`}
                title={subCollection.title}
                image={subCollection.image?.url || ''}
                alt={subCollection.image?.altText || subCollection.title}
                titleClassName='text-[17px]'
              />
            )}
            className='grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5 xl:grid-cols-6'
          />
        </Show>

        {/* Content Blocks */}
        <Show when={category.content && category.content.length > 0}>
          <div className='space-y-6'>
            {category.content?.map(block => (
              <ContentBlock
                key={block.id}
                title={block.title}
                text={block.text}
                media={block.media}
                poster={block.poster}
                mediaPosition={block.mediaPosition}
              />
            ))}
          </div>
        </Show>
      </div>
    </PageWrapper>
  );
}
