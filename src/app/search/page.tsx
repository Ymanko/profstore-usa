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
    <PageWrapper>
      <div className='container space-y-6'>
        <Typography variant='h1'>Search{q && <span className='text-primary'> - {q}</span>}</Typography>

        <Suspense fallback={<div className='py-12 text-center'>Loading...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
