import type { ReactNode } from 'react';

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export interface ProductIdProps {
  productId: string;
}

export interface HandleProps {
  handle: string;
}
