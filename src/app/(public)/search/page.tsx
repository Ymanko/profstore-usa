import { Suspense } from 'react';

import { SearchContent } from '@/features/search/components/search-content';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { Typography } from '@/shared/components/ui/typography';

import type { Metadata } from 'next';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search - ${q}` : 'Search',
    description: q ? `Search results for "${q}"` : 'Search products',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <PageWrapper className='pb-25 xl:pb-50'>
      <div className='container'>
        <Typography className='mb-5 text-2xl font-bold md:mb-5.5 md:text-3xl xl:mb-7' variant='h1'>
          Search{q && <span className='text-secondary'> - {q}</span>}
        </Typography>

        <Suspense fallback={<div className='py-12 text-center'>Loading...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
