import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { PageContent } from '@/features/pages/page-content';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getPageQueryOptions, parsePageData } from '@/shared/queries/pages';

import type { Metadata } from 'next';

const PAGE_HANDLE = 'about';

export async function generateMetadata(): Promise<Metadata> {
  const queryClient = getQueryClient();
  const rawData = await queryClient.fetchQuery(getPageQueryOptions(PAGE_HANDLE));
  const pageData = parsePageData(rawData);

  if (!pageData) {
    return {
      title: 'Page not found',
    };
  }

  return {
    title: pageData.seo.title || pageData.title,
    description: pageData.seo.description || undefined,
  };
}

export default async function AboutPage() {
  const queryClient = getQueryClient();
  const rawData = await queryClient.fetchQuery(getPageQueryOptions(PAGE_HANDLE));
  const pageData = parsePageData(rawData);

  if (!pageData) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageWrapper>
        <PageContent title={pageData.title} contentBlocks={pageData.contentBlocks} />
      </PageWrapper>
    </HydrationBoundary>
  );
}
