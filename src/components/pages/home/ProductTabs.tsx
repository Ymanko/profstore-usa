'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';
import { getNewProductsQueryOptions } from '@/queries/home/get-new-products';
import { getSaleHitsQueryOptions } from '@/queries/home/get-sale-hits';

type Tab = 'new' | 'saleHits';

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('saleHits');

  const { data: newProducts } = useSuspenseQuery(getNewProductsQueryOptions);
  const { data: saleHits } = useSuspenseQuery(getSaleHitsQueryOptions);

  const tabs = [
    { id: 'saleHits' as Tab, label: 'Sale Hits', products: saleHits.products },
    { id: 'new' as Tab, label: 'New', products: newProducts.edges },
  ];

  const activeProducts = tabs.find(tab => tab.id === activeTab)?.products || [];

  return (
    <Section className='pb-10.5 md:pb-12.5'>
      {/* Tabs */}
      <div className='mb-8 flex gap-4'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id ? 'border-accent text-accent border-b-2' : 'hover:text-accent text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {activeProducts.map(({ node: product }) => (
          <div key={product.id} className='border p-4'>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className='mb-4 h-48 w-full object-cover'
              />
            )}
            <Typography variant='h3' className='mb-2'>
              {product.title}
            </Typography>

            <div className='flex items-center gap-2'>
              {product.compareAtPriceRange.minVariantPrice.amount !== '0.0' && (
                <span className='text-sm text-gray-500 line-through'>
                  ${product.compareAtPriceRange.minVariantPrice.amount}
                </span>
              )}
              <span className='font-bold'>
                ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
              </span>
            </div>
          </div>
        ))}
      </div>

      {activeProducts.length === 0 && (
        <Typography variant='body-lg' className='text-center text-gray-500'>
          No products found
        </Typography>
      )}
    </Section>
  );
}
