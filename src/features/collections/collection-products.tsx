'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { CircleX, LayoutGrid, LayoutList, Loader2 } from 'lucide-react';

import { useCollectionFilters } from '@/features/collections/hooks/use-collection-filters';
import { useCollectionParams } from '@/features/collections/hooks/use-collection-params';
import { useDecodedFilters } from '@/features/collections/hooks/use-decoded-filters';
import { usePriceRange } from '@/features/collections/hooks/use-price-range';
import { usePriceRangeStorage } from '@/features/collections/hooks/use-price-range-storage';
import { List } from '@/shared/components/common/list';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import { Typography } from '@/shared/components/ui/typography';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { useLayoutMode } from '@/shared/hooks/use-layout-mode';
import { cn } from '@/shared/lib/utils';
import { getSubcategoryProductsQueryOptions } from '@/shared/queries/collections/get-subcategory-products';

import { FilterItem } from './components/filter-item';
import { PriceRangeFilter } from './components/price-range-filter';

import type { FC } from 'react';

export const CollectionProducts: FC<{
  handle: string;
}> = ({ handle }) => {
  const isMounted = useIsMounted();
  const { setMode, isGrid, isList } = useLayoutMode('grid');
  const { params, setParams, handlers } = useCollectionParams();

  const sortKey = params.sort;
  const reverse = params.reverse === 1;
  const productsPerPage = params.show;

  const decodedFilters = useDecodedFilters({ f: params.f, minPrice: params.minPrice, maxPrice: params.maxPrice });

  const {
    data: { collection },
    isFetching,
  } = useSuspenseQuery(
    getSubcategoryProductsQueryOptions({
      handle,
      first: productsPerPage,
      sortKey,
      reverse,
      filters: decodedFilters,
    }),
  );

  const products = collection?.products.edges.map(edge => edge.node) ?? [];
  const priceFilter = collection?.products.filters.find(f => f.type === 'PRICE_RANGE');
  const otherFilters = collection?.products.filters.filter(f => f.type !== 'PRICE_RANGE') ?? [];

  const priceRange = usePriceRange(priceFilter);

  // Price range storage with validation (updates every 10 minutes or when range expands)
  const basePriceRange = usePriceRangeStorage({
    handle,
    priceRange,
    hasActiveFilters: params.minPrice !== null || params.maxPrice !== null,
    isMounted,
  });

  // Filters management - handlers only
  const { handleFilterChange, handlePriceChange } = useCollectionFilters({
    decodedFilters,
    setParams,
    basePriceRange,
  });

  // Check if any filters are active
  const hasActiveFilters = params.minPrice !== null || params.maxPrice !== null || params.f !== '';

  // Clear all filters
  const handleClearFilters = async () => {
    // Clear URL params
    setParams({
      minPrice: null,
      maxPrice: null,
      f: '',
    });
    // Clear session storage for price range
    sessionStorage.removeItem(`price-range-${handle}`);
  };

  return (
    <PageWrapper>
      <Show
        when={collection}
        fallback={
          <Typography variant='body-lg' className='text-muted-foreground text-center'>
            Collection not found
          </Typography>
        }
      >
        <Show
          when={products.length > 0}
          fallback={
            <Typography variant='body-lg' className='text-muted-foreground py-20 text-center'>
              No products yet
            </Typography>
          }
        >
          <div className='container'>
            <Typography variant='h1' as='h1' className='mb-5.75'>
              {collection?.title}
            </Typography>

            <div className='xl:grid xl:grid-cols-[auto_1fr] xl:items-start xl:gap-5'>
              {/* Filters*/}
              <div className='bg-sidebar animate-fade-in relative w-86 rounded-[10px] px-4.5 py-6 shadow-xs'>
                {/* Clear Filters Button */}
                <Show when={hasActiveFilters}>
                  <button
                    onClick={handleClearFilters}
                    className='text-secondary hover:text-secondary/80 animate-fade-in absolute top-7 right-7 inline-flex w-fit items-center gap-1 text-sm font-medium transition-colors'
                    type='button'
                  >
                    <CircleX className='size-4' />
                    Clear all filters
                  </button>
                </Show>

                <div className='custom-scrollbar space-y-6 overflow-y-auto pr-2'>
                  {/* Price Filter - Always First */}
                  <div className='border-b pb-4'>
                    <Show
                      when={isMounted}
                      fallback={
                        <div className='space-y-3.5'>
                          <Typography variant='bold'>Price</Typography>

                          <div className='grid grid-cols-2 gap-3'>
                            <div className='bg-muted-primary h-9 animate-pulse rounded' />
                            <div className='bg-muted-primary h-9 animate-pulse rounded' />
                          </div>
                          <div className='bg-muted-primary h-1 animate-pulse rounded-full' />
                        </div>
                      }
                    >
                      <PriceRangeFilter
                        baseMin={basePriceRange.min}
                        baseMax={basePriceRange.max}
                        currentMin={params.minPrice ?? undefined}
                        currentMax={params.maxPrice ?? undefined}
                        onPriceChange={handlePriceChange}
                      />
                    </Show>
                  </div>

                  {/* Other Filters */}
                  <List
                    data={otherFilters}
                    renderItem={filter => (
                      <FilterItem filter={filter} decodedFilters={decodedFilters} onFilterChange={handleFilterChange} />
                    )}
                    keyExtractor={filter => filter.id}
                    className='space-y-3.5'
                    itemClassName='space-y-3.5 border-b pb-4 last:border-0'
                  />
                </div>
              </div>

              {/* Products Grid*/}
              <div className='relative space-y-7.5'>
                {isFetching && (
                  <div className='bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm'>
                    <Loader2 className='text-primary size-8 animate-spin' />
                  </div>
                )}

                <header className='animate-fade-in flex items-center justify-between'>
                  <div className='flex items-center gap-x-4'>
                    <Typography variant='bold'>Sort:</Typography>
                    <NativeSelect value={handlers.getSortSelectValue()} onChange={handlers.handleSortChange}>
                      <NativeSelectOption value='BEST_SELLING'>Best Selling</NativeSelectOption>
                      <NativeSelectOption value='PRICE_ASC'>Price: Low to High</NativeSelectOption>
                      <NativeSelectOption value='PRICE_DESC'>Price: High to Low</NativeSelectOption>
                      <NativeSelectOption value='CREATED'>Newest Arrivals</NativeSelectOption>
                    </NativeSelect>
                  </div>

                  <div className='flex items-center gap-x-4'>
                    <Typography variant='bold'>Show:</Typography>
                    <NativeSelect value={productsPerPage.toString()} onChange={handlers.handleShowChange}>
                      <NativeSelectOption value='12'>12</NativeSelectOption>
                      <NativeSelectOption value='24'>24</NativeSelectOption>
                      <NativeSelectOption value='48'>48</NativeSelectOption>
                      <NativeSelectOption value='96'>96</NativeSelectOption>
                    </NativeSelect>
                  </div>

                  <List
                    data={[
                      { label: 'List view', icon: LayoutList, mode: 'list' },
                      { label: 'Grid view', icon: LayoutGrid, mode: 'grid' },
                    ]}
                    renderItem={item => (
                      <button
                        type='button'
                        onClick={() => setMode(item.mode as 'list' | 'grid')}
                        aria-label={item.label}
                        className={cn(
                          'transition-colors',
                          (item.mode === 'list' && isList) || (item.mode === 'grid' && isGrid)
                            ? 'text-secondary'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <item.icon size={24} strokeWidth={2.25} />
                      </button>
                    )}
                    keyExtractor={item => item.mode}
                    className='flex items-center gap-x-4'
                  />
                </header>

                <List
                  data={products}
                  renderItem={product => <ProductCard product={product} view={isGrid ? 'grid' : 'list'} />}
                  keyExtractor={product => product.id}
                  className={cn(
                    'animate-fade-in gap-5',
                    isGrid && 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                    isList && 'flex flex-col',
                  )}
                />
              </div>
            </div>
          </div>
        </Show>
      </Show>
    </PageWrapper>
  );
};
