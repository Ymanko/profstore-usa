import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ContentPage } from '@/features/warranty-service/content-page';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getPageQueryOptions } from '@/shared/queries/pages';

const PAGE_HANDLE = 'about-us';

export default async function AboutPage() {
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getPageQueryOptions(PAGE_HANDLE));

  return (
    <PageWrapper className='pb-25 xl:pb-50'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContentPage handle={PAGE_HANDLE} />
      </HydrationBoundary>
    </PageWrapper>
  );
}
