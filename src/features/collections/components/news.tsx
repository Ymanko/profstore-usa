'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { List } from '@/shared/components/common/list';
import { Section } from '@/shared/components/common/section';
import { Typography } from '@/shared/components/ui/typography';
import { getNewsQueryOptions } from '@/shared/queries/blog/get-news';

export function News() {
  const { subcategory } = useParams();
  const tag = typeof subcategory === 'string' ? subcategory : undefined;

  const { data: articles, isLoading, error } = useQuery(
    getNewsQueryOptions({ handle: 'news', first: 3, tag })
  );

  if (isLoading) {
    return (
      <Section className='bg-brand-section-bg py-10 [&_div]:space-y-5.5'>
        <div className='bg-muted-primary/50 h-9 animate-pulse rounded-lg' />

        <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <div key={i} className='bg-muted-primary/50 h-96 animate-pulse rounded-lg' />
          ))}
        </div>
      </Section>
    );
  }

  if (error || !articles || articles.length === 0) return null;

  return (
    <Section className='bg-brand-section-bg py-10 [&_div]:space-y-5.5'>
      <Typography variant='h2' as='h2'>
        News
      </Typography>

      <List
        data={articles}
        renderItem={item => (
          <>
            <div className='relative h-61.25 w-full overflow-hidden rounded-lg'>
              <Image
                src={item.image?.url || ''}
                alt={item.image?.altText || item.title}
                fill
                className='object-cover'
              />
            </div>

            <div className='space-y-2'>
              <Typography variant='h2' as='h3' className='m-0 text-lg'>
                {item.title}
              </Typography>

              <Typography variant='body' className='text-muted-foreground line-clamp-5'>
                {item.excerpt}
              </Typography>
            </div>
          </>
        )}
        keyExtractor={item => item.id}
        className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'
        itemClassName='space-y-4'
      />
    </Section>
  );
}
