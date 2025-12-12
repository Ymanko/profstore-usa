'use client';

import { ApolloProvider } from '@apollo/client/react';
import { throttle } from 'nuqs';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { client } from '@/lib/apollo/appolo-client';

import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter
      defaultOptions={{
        shallow: false,
        scroll: true,
        clearOnDefault: false,
        limitUrlUpdates: throttle(250),
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NuqsAdapter>
  );
}
