import { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/layout/footer';
import './globals.css';
import { baseUrl } from '@/lib/utils';
import { CartProviderWrapper } from '@/components/cart/cart-provider-wrapper'; // 👈 додай цей імпорт

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <CartProviderWrapper>
          <Header />
          <main>
            {children}
            <Toaster closeButton />
          </main>
          <Footer />
        </CartProviderWrapper>
      </body>
    </html>
  );
}