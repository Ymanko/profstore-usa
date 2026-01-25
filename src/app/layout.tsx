import '@/app/globals.css';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Montserrat, Inter } from 'next/font/google';

import Providers from '@/app/providers';
import { Footer } from '@/features/layout/footer';
import { Header } from '@/features/layout/header';
import { getCustomer } from '@/shared/actions/auth/get-customer';
import { SvgSprite } from '@/shared/components/common/svg-sprite';
import { getQueryClient } from '@/shared/lib/tanstack/get-query-client';
import { cn } from '@/shared/lib/utils';
import { getMenuItemsQueryOptions } from '@/shared/queries/menu/get-menu-items';

import type { LayoutProps } from '@/shared/types/common';
import type { Metadata } from 'next';

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

export default async function RootLayout({ children }: LayoutProps) {
  const queryClient = getQueryClient();
  const [, customer] = await Promise.all([queryClient.ensureQueryData(getMenuItemsQueryOptions), getCustomer()]);

  return (
    <html lang='en'>
      <body className={cn('flex min-h-dvh flex-col antialiased', montserratFont.variable, interFont.variable)}>
        <SvgSprite />
        <Providers initialCustomer={customer}>
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
