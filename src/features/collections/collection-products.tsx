'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { LayoutGrid, LayoutList } from 'lucide-react';

import { Filters } from '@/features/collections/components/filters';
import { LoadMore } from '@/features/collections/components/load-more';
import { SelectWrapper } from '@/features/collections/components/select-wrapper';
import { useCollectionFilters } from '@/features/collections/hooks/use-collection-filters';
import { useCollectionParams } from '@/features/collections/hooks/use-collection-params';
import { useDecodedFilters } from '@/features/collections/hooks/use-decoded-filters';
import { usePriceRange } from '@/features/collections/hooks/use-price-range';
import { usePriceRangeStorage } from '@/features/collections/hooks/use-price-range-storage';
import { List } from '@/shared/components/common/list';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { ProductCard } from '@/shared/components/common/product-card';
import { RichText } from '@/shared/components/common/rich-text';
import { Show } from '@/shared/components/common/show';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import { Typography } from '@/shared/components/ui/typography';
import { STALE_TIME } from '@/shared/constants/stale-time';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { useLayoutMode } from '@/shared/hooks/use-layout-mode';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { cn } from '@/shared/lib/utils';
import {
  GET_SUBCATEGORY_PRODUCTS,
  type Filter,
  type SubcategoryProductsData,
} from '@/shared/queries/collections/get-subcategory-products';

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['subcategory', handle, 'products', { sortKey, reverse, productsPerPage, filters: decodedFilters }],
    queryFn: async ({ pageParam }) => {
      return serverGraphqlFetcher<SubcategoryProductsData>(
        GET_SUBCATEGORY_PRODUCTS,
        {
          handle,
          first: productsPerPage,
          after: (pageParam as string | null) ?? null,
          sortKey,
          reverse,
          filters: decodedFilters,
        },
        {
          tags: ['collection', handle],
        },
      );
    },
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => {
      const pageInfo = lastPage.collection?.products.pageInfo;
      return pageInfo?.hasNextPage ? pageInfo.endCursor : null;
    },
    staleTime: STALE_TIME.FIVE_MINUTES,
  });

  // Combine all products from all pages
  const allProducts = data.pages.flatMap(page => page.collection?.products.edges.map(edge => edge.node) ?? []);

  // Get filters from first page
  const collection = data.pages[0]?.collection;
  const priceFilter = collection?.products.filters.find((f: Filter) => f.type === 'PRICE_RANGE');
  const otherFilters = collection?.products.filters.filter((f: Filter) => f.type !== 'PRICE_RANGE') ?? [];

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
  const handleClearFilters = () => {
    setParams({
      minPrice: null,
      maxPrice: null,
      f: '',
    });

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
          when={allProducts.length > 0}
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
              <Filters
                className='hidden xl:block'
                priceFilter={{
                  basePriceRange,
                  currentMin: params.minPrice ?? null,
                  currentMax: params.maxPrice ?? null,
                  onChange: handlePriceChange,
                }}
                productFilters={{
                  filters: otherFilters,
                  decodedFilters,
                  onChange: handleFilterChange,
                }}
                clearFilters={{
                  hasActiveFilters,
                  onClear: handleClearFilters,
                }}
              />

              {/* Products Grid*/}
              <div className='relative w-full space-y-7.5'>
                <header className='animate-fade-in flex items-center gap-x-4'>
                  <SelectWrapper label='Sort:' className='w-full max-w-95'>
                    <NativeSelect
                      className='w-full'
                      name='collection-sort-select'
                      value={handlers.getSortSelectValue()}
                      onChange={handlers.handleSortChange}
                    >
                      <NativeSelectOption value='BEST_SELLING'>Best Selling</NativeSelectOption>
                      <NativeSelectOption value='PRICE_ASC'>Price: Low to High</NativeSelectOption>
                      <NativeSelectOption value='PRICE_DESC'>Price: High to Low</NativeSelectOption>
                      <NativeSelectOption value='CREATED'>Newest Arrivals</NativeSelectOption>
                    </NativeSelect>
                  </SelectWrapper>

                  <SelectWrapper label='Show:' className='w-full max-w-50'>
                    <NativeSelect
                      className='w-full'
                      name='collection-products-per-page-select'
                      value={productsPerPage.toString()}
                      onChange={handlers.handleShowChange}
                    >
                      <NativeSelectOption value='12'>12</NativeSelectOption>
                      <NativeSelectOption value='24'>24</NativeSelectOption>
                      <NativeSelectOption value='48'>48</NativeSelectOption>
                      <NativeSelectOption value='96'>96</NativeSelectOption>
                    </NativeSelect>
                  </SelectWrapper>

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
                    className='hidden items-center gap-x-4 self-end md:ml-auto md:flex'
                  />
                </header>

                <List
                  data={allProducts}
                  renderItem={product => <ProductCard product={product} view={isGrid ? 'grid' : 'list'} />}
                  keyExtractor={product => product.id}
                  className={cn(
                    'animate-fade-in gap-5',
                    isGrid && 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                    isList && 'flex flex-col',
                  )}
                />

                {/* Load More Button */}
                <Show when={hasNextPage}>
                  <div className='animate-fade-in flex justify-center'>
                    <LoadMore
                      isLoading={isFetchingNextPage}
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    />
                  </div>
                </Show>

                <Show when={!!collection?.fullDescription?.value}>
                  <RichText className='mt-12.5' schema={collection?.fullDescription?.value ?? ''} />
                </Show>
              </div>
            </div>
          </div>
        </Show>
      </Show>
    </PageWrapper>
  );
};
