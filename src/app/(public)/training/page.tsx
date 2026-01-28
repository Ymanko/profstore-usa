import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { TrainingContent } from '@/features/training/training-content';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getTrainingPageQueryOptions } from '@/shared/queries/pages';

const HANDLE = 'training';

export default async function TrainingPage() {
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getTrainingPageQueryOptions(HANDLE));

  return (
    <PageWrapper className='pb-25 xl:pb-50'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TrainingContent handle={HANDLE} />
      </HydrationBoundary>
    </PageWrapper>
  );
}
