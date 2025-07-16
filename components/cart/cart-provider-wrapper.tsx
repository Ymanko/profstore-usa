import { ReactNode } from 'react';
import { CartProvider } from './cart-context';
import { getCart } from '@/lib/shopify/server'; // ✅ OK — використовується на сервері

export async function CartProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const cartPromise = getCart();

  return <CartProvider cartPromise={cartPromise}>{children}</CartProvider>;
}