'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { LayoutGrid, LayoutList, Loader2 } from 'lucide-react';
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

import { List } from '@/shared/components/common/list';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import { Typography } from '@/shared/components/ui/typography';
import { useLayoutMode } from '@/shared/hooks/use-layout-mode';
import { cn } from '@/shared/lib/utils';
import { getSubcategoryProductsQueryOptions } from '@/shared/queries/collections/get-subcategory-products';

import type { SubcategoryProductsParams } from '@/shared/queries/collections/get-subcategory-products';

type CollectionProductsProps = {
  handle: string;
};

export function CollectionProducts({ handle }: CollectionProductsProps) {
  const [params, setParams] = useQueryStates(
    {
      sort: parseAsStringEnum(['BEST_SELLING', 'PRICE', 'CREATED', 'TITLE', 'RELEVANCE'] as const).withDefault(
        'BEST_SELLING',
      ),
      reverse: parseAsInteger.withDefault(0),
      show: parseAsInteger.withDefault(12),
      f: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    },
  );

  const { setMode, isGrid, isList } = useLayoutMode('grid');

  const sortKey = params.sort;
  const reverse = params.reverse === 1;
  const productsPerPage = params.show;

  // Decode filters from base64
  const selectedFilters: SubcategoryProductsParams['filters'] = (() => {
    if (!params.f) return [];
    try {
      const decoded = atob(params.f);
      return JSON.parse(decoded);
    } catch {
      return [];
    }
  })();

  const { data, isFetching } = useSuspenseQuery(
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
    const value = e.target.value as 'BEST_SELLING' | 'PRICE_ASC' | 'PRICE_DESC' | 'CREATED';

    switch (value) {
      case 'BEST_SELLING':
        setParams({ sort: 'BEST_SELLING', reverse: 0 });
        break;
      case 'PRICE_ASC':
        setParams({ sort: 'PRICE', reverse: 0 });
        break;
      case 'PRICE_DESC':
        setParams({ sort: 'PRICE', reverse: 1 });
        break;
      case 'CREATED':
        setParams({ sort: 'CREATED', reverse: 1 });
        break;
      default:
        setParams({ sort: 'BEST_SELLING', reverse: 0 });
    }
  };

  const handleShowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({ show: parseInt(e.target.value) });
  };

  const handleFilterChange = (filterInput: string, checked: boolean) => {
    try {
      const filterValue = JSON.parse(filterInput);
      const currentFilters = selectedFilters || [];
      let updatedFilters: NonNullable<SubcategoryProductsParams['filters']>;

      if (checked) {
        // Add filter
        updatedFilters = [...currentFilters, filterValue];
      } else {
        // Remove filter
        updatedFilters = currentFilters.filter(f => JSON.stringify(f) !== JSON.stringify(filterValue));
      }

      // Encode to base64
      const encoded = updatedFilters.length > 0 ? btoa(JSON.stringify(updatedFilters)) : '';
      setParams({ f: encoded });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse filter:', error);
    }
  };

  // Get sort select value
  const getSortSelectValue = () => {
    if (sortKey === 'BEST_SELLING') return 'BEST_SELLING';
    if (sortKey === 'PRICE' && !reverse) return 'PRICE_ASC';
    if (sortKey === 'PRICE' && reverse) return 'PRICE_DESC';
    if (sortKey === 'CREATED') return 'CREATED';
    return 'BEST_SELLING';
  };

  return (
    <PageWrapper>
      <div className='container'>
        <Typography variant='h1' as='h1' className='mb-5.75'>
          {collection.title}
        </Typography>

        <div className='xl:grid xl:grid-cols-[auto_1fr] xl:items-start xl:gap-5'>
          {/* Filters*/}
          <div className='bg-sidebar animate-fade-in w-86 rounded-[10px] px-4.5 py-6 shadow-xs'>
            <List
              data={filters}
              renderItem={filter => (
                <div key={filter.id} className='space-y-2 border-b pb-4 last:border-0 last:pb-0'>
                  <Typography variant='bold'>{filter.label}</Typography>

                  <div className='space-y-2'>
                    {filter.values.map(value => {
                      const isChecked = (selectedFilters || []).some(f => JSON.stringify(f) === value.input);

                      return (
                        <label key={value.id} className='flex cursor-pointer items-center gap-2'>
                          <input
                            type='checkbox'
                            className='size-3.5'
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
          <div className='relative space-y-7.5'>
            {isFetching && (
              <div className='bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm'>
                <Loader2 className='text-primary size-8 animate-spin' />
              </div>
            )}

            <header className='animate-fade-in flex items-center justify-between'>
              <div className='flex items-center gap-x-4'>
                <Typography variant='bold'>Sort:</Typography>
                <NativeSelect value={getSortSelectValue()} onChange={handleSortChange}>
                  <NativeSelectOption value='BEST_SELLING'>Best Selling</NativeSelectOption>
                  <NativeSelectOption value='PRICE_ASC'>Price: Low to High</NativeSelectOption>
                  <NativeSelectOption value='PRICE_DESC'>Price: High to Low</NativeSelectOption>
                  <NativeSelectOption value='CREATED'>Newest Arrivals</NativeSelectOption>
                </NativeSelect>
              </div>

              <div className='flex items-center gap-x-4'>
                <Typography variant='bold'>Show:</Typography>
                <NativeSelect value={productsPerPage.toString()} onChange={handleShowChange}>
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
                renderItem={product => <ProductCard product={product} view={isGrid ? 'grid' : 'list'} />}
                keyExtractor={product => product.id}
                className={cn(
                  'animate-fade-in gap-5',
                  isGrid && 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                  isList && 'flex flex-col',
                )}
              />
            </Show>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
