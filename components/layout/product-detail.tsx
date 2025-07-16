// components/layout/product-detail.tsx

import React from 'react';
import type { Product } from '@/lib/shopify/types';

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.description}</p>
      {/* Додай зображення або інші деталі за бажанням */}
    </section>
  );
}