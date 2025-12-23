'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { ProductCard } from '@/components/common/ProductCard';
import { Section } from '@/components/common/Section';
import { ScrollArea, ScrollBar } from '@/components/ui/Scroll-Area';
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
    { id: 'new' as Tab, label: 'NEW', products: newProducts.edges },
  ];

  const activeProducts = tabs.find(tab => tab.id === activeTab)?.products || [];

  return (
    <Section className='py-2.5'>
      {/* Tabs */}
      <div className='mb-5 flex gap-2.5 rounded-[10px] bg-[#B6CEB4] p-1.5'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-1/2 rounded-[10px] px-4 py-2 font-bold transition-colors md:max-w-65 ${
              activeTab === tab.id ? 'bg-white text-[#3A6F43]' : 'bg-transparent text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ScrollArea className='m-auto w-full max-w-87 md:max-w-167 lg:max-w-full'>
        <div className='flex gap-5 pb-4'>
          {activeProducts.map(({ node: product }) => (
            <div key={product.id} className='w-full shrink-0 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]'>
              <ProductCard
                item={{
                  id: product.id,
                  title: product.title,
                  featuredImage: product.featuredImage,
                  oldPrice: product.priceRange.minVariantPrice.amount,
                  price: product.compareAtPriceRange.minVariantPrice.amount,
                  availableForSale: product.availableForSale,
                }}
                onAddToCart={() => {}}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      {activeProducts.length === 0 && (
        <Typography variant='body-lg' className='text-center text-gray-500'>
          No products found
        </Typography>
      )}
    </Section>
  );
}
