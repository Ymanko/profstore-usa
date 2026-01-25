'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { throttle } from 'nuqs';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { AuthProvider } from '@/shared/providers/auth-provider';

import type { Customer } from '@/shared/queries/customer/types';
import type { LayoutProps } from '@/shared/types/common';

interface ProvidersProps extends LayoutProps {
  initialCustomer: Customer | null;
}

export default function Providers({ children, initialCustomer }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialCustomer={initialCustomer}>
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
      </AuthProvider>
    </QueryClientProvider>
  );
}
