'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { throttle } from 'nuqs';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';

import type { LayoutProps } from '@/shared/types/shared/types/common';

export default function Providers({ children }: LayoutProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter
        defaultOptions={{
          shallow: false,
          scroll: true,
          clearOnDefault: false,
          limitUrlUpdates: throttle(250),
        }}
      >
        {children}
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
