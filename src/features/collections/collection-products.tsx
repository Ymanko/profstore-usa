'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useState } from 'react';

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { List } from '@/shared/components/common/list';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { useLayoutMode } from '@/shared/hooks/use-layout-mode';
import { cn } from '@/shared/lib/utils';
import { getSubcategoryProductsQueryOptions } from '@/shared/queries/collections/get-subcategory-products';

import type { SubcategoryProductsParams } from '@/shared/queries/collections/get-subcategory-products';

type CollectionProductsProps = {
  handle: string;
};

export function CollectionProducts({ handle }: CollectionProductsProps) {
  const [sortKey, setSortKey] = useState<SubcategoryProductsParams['sortKey']>('BEST_SELLING');
  const [reverse, setReverse] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(24);
  const [selectedFilters, setSelectedFilters] = useState<SubcategoryProductsParams['filters']>([]);
  const { setMode, isGrid, isList } = useLayoutMode('grid');

  const { data } = useSuspenseQuery(
    getSubcategoryProductsQueryOptions({
      handle,
      first: productsPerPage,
      sortKey,
      reverse,
      filters: selectedFilters,
    }),
  );

  if (!data.collection) {
    return (
      <PageWrapper>
        <Typography variant='body-lg' className='text-muted-foreground text-center'>
          Collection not found
        </Typography>
      </PageWrapper>
    );
  }

  const { collection } = data;
  const products = collection.products.edges.map(edge => edge.node);
  const filters = collection.products.filters.filter(f => f.type !== 'PRICE_RANGE'); // Exclude price filter for now

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'best-selling':
        setSortKey('BEST_SELLING');
        setReverse(false);
        break;
      case 'price-low-high':
        setSortKey('PRICE');
        setReverse(false);
        break;
      case 'price-high-low':
        setSortKey('PRICE');
        setReverse(true);
        break;
      case 'newest-arrivals':
        setSortKey('CREATED');
        setReverse(true);
        break;
      default:
        setSortKey('BEST_SELLING');
        setReverse(false);
    }
  };

  const handleShowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(parseInt(e.target.value));
  };

  const handleFilterChange = (filterInput: string, checked: boolean) => {
    try {
      const filterValue = JSON.parse(filterInput);

      if (checked) {
        // Add filter
        setSelectedFilters(prev => [...(prev || []), filterValue]);
      } else {
        // Remove filter - need to match the filter object
        setSelectedFilters(prev => {
          if (!prev) return [];
          return prev.filter(f => JSON.stringify(f) !== JSON.stringify(filterValue));
        });
      }
    } catch (error) {
      console.error('Failed to parse filter:', error);
    }
  };

  return (
    <PageWrapper>
      <Typography variant='h1' as='h1' className='mb-5.75'>
        {collection.title}
      </Typography>

      <div className='xl:grid xl:grid-cols-[auto_1fr] xl:items-start xl:gap-5'>
        {/* Filters*/}
        <div className='bg-sidebar w-86 rounded-[10px] px-4.5 py-6 shadow-xs'>
          <List
            data={filters}
            renderItem={filter => (
              <div key={filter.id} className='space-y-2 border-b pb-4 last:border-0 last:pb-0'>
                <Typography variant='bold'>{filter.label}</Typography>

                <div className='space-y-2'>
                  {filter.values.map(value => {
                    const isChecked = selectedFilters?.some(f => JSON.stringify(f) === value.input) || false;

                    return (
                      <label key={value.id} className='flex cursor-pointer items-center gap-2'>
                        <input
                          type='checkbox'
                          className='size-3.5'
                          value={value.input}
                          checked={isChecked}
                          onChange={e => handleFilterChange(value.input, e.target.checked)}
                        />
                        <Typography className='flex-1'>{value.label}</Typography>
                        <Typography className='text-muted-foreground'>({value.count})</Typography>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            keyExtractor={filter => filter.id}
            className='custom-scrollbar space-y-6 overflow-y-auto pr-2'
          />
        </div>

        {/* Products Grid*/}
        <div className='space-y-7.5'>
          <header className='flex items-center justify-between'>
            <div className='flex items-center gap-x-4'>
              <Typography variant='bold'>Sort:</Typography>
              <NativeSelect defaultValue='best-selling' onChange={handleSortChange}>
                <NativeSelectOption value='best-selling'>Best Selling</NativeSelectOption>
                <NativeSelectOption value='price-low-high'>Price: Low to High</NativeSelectOption>
                <NativeSelectOption value='price-high-low'>Price: High to Low</NativeSelectOption>
                <NativeSelectOption value='newest-arrivals'>Newest Arrivals</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className='flex items-center gap-x-4'>
              <Typography variant='bold'>Show:</Typography>
              <NativeSelect defaultValue='24' onChange={handleShowChange}>
                <NativeSelectOption value='12'>12</NativeSelectOption>
                <NativeSelectOption value='24'>24</NativeSelectOption>
                <NativeSelectOption value='48'>48</NativeSelectOption>
                <NativeSelectOption value='96'>96</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className='flex items-center gap-x-4'>
              <button
                onClick={() => setMode('list')}
                className={cn(
                  'transition-colors',
                  isList ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label='List view'
              >
                <LayoutList size={24} />
              </button>
              <button
                onClick={() => setMode('grid')}
                className={cn(
                  'transition-colors',
                  isGrid ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label='Grid view'
              >
                <LayoutGrid size={24} />
              </button>
            </div>
          </header>

          <Show
            when={products.length > 0}
            fallback={
              <Typography variant='body-lg' className='text-muted-foreground py-20 text-center'>
                No products found
              </Typography>
            }
          >
            <List
              data={products}
              renderItem={product => <ProductCard product={product} />}
              keyExtractor={product => product.id}
              className={cn(
                'gap-5',
                isGrid && 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                isList && 'flex flex-col',
              )}
            />
          </Show>
        </div>
      </div>
    </PageWrapper>
  );
}
