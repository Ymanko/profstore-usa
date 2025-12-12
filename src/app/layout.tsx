import '@/styles/globals.css';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Montserrat, Inter } from 'next/font/google';

import Providers from '@/app/providers';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header/Header';
import { getQueryClient } from '@/lib/tanstack/get-query-client';
import { cn } from '@/lib/utils';
import { getMenuItemsQueryOptions } from '@/queries/get-menu-items';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const montserratFont = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], // Light, Regular, Medium, SemiBold, Bold, ExtraBold
  display: 'swap',
});

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Professional equipment store',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.ensureQueryData(getMenuItemsQueryOptions);

  return (
    <html lang='en'>
      <body className={cn('flex min-h-dvh flex-col antialiased', montserratFont.variable, interFont.variable)}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
