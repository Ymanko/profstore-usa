import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ContactsContent } from '@/features/contacts/contacts-content';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { getPageQueryOptions } from '@/shared/queries/pages';

import type { Metadata } from 'next';

const PAGE_HANDLE = 'contact';

export const metadata: Metadata = {
  title: 'Contacts | ProfStore',
  description: 'Contact information and store location',
};

export default async function ContactsPage() {
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getPageQueryOptions(PAGE_HANDLE));

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContactsContent handle={PAGE_HANDLE} />
      </HydrationBoundary>
    </PageWrapper>
  );
}
