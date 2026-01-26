import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ContentPage } from '@/features/warranty-service/content-page';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getPageQueryOptions } from '@/shared/queries/pages';

const PAGE_HANDLE = 'delivery-and-payment';

export default async function DeliveryPage() {
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getPageQueryOptions(PAGE_HANDLE));

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContentPage handle={PAGE_HANDLE} />
      </HydrationBoundary>
    </PageWrapper>
  );
}
