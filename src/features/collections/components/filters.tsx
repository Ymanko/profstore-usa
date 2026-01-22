'use client';

import { CircleX } from 'lucide-react';

import { FilterItem } from '@/features/collections/components/filter-item';
import { PriceRangeFilter } from '@/features/collections/components/price-range-filter';
import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { cn } from '@/shared/lib/utils';

import type { useCollectionFilters } from '@/features/collections/hooks/use-collection-filters';
import type { useDecodedFilters } from '@/features/collections/hooks/use-decoded-filters';
import type { usePriceRangeStorage } from '@/features/collections/hooks/use-price-range-storage';
import type { Filter } from '@/shared/queries/collections/types';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface FiltersProps extends ComponentPropsWithoutRef<'div'> {
  priceFilter: {
    basePriceRange: ReturnType<typeof usePriceRangeStorage>;
    currentMin: number | null;
    currentMax: number | null;
    onChange: ReturnType<typeof useCollectionFilters>['handlePriceChange'];
  };
  productFilters: {
    filters: Filter[];
    decodedFilters: ReturnType<typeof useDecodedFilters>;
    onChange: ReturnType<typeof useCollectionFilters>['handleFilterChange'];
  };
  clearFilters: {
    hasActiveFilters: boolean;
    onClear: () => void;
  };
}

export const Filters: FC<FiltersProps> = ({ className, priceFilter, productFilters, clearFilters, ...props }) => {
  const isMounted = useIsMounted();

  return (
    <div
      className={cn('bg-sidebar animate-fade-in relative w-86 rounded-[10px] px-4.5 py-6 shadow-xs', className)}
      {...props}
    >
      {/* Clear Filters Button */}
      <Show when={clearFilters.hasActiveFilters}>
        <button
          onClick={clearFilters.onClear}
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
              <div className='space-y-4'>
                <Typography variant='bold'>Price</Typography>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='bg-muted-primary/50 h-9 animate-pulse rounded' />
                  <div className='bg-muted-primary/50 h-9 animate-pulse rounded' />
                </div>
                <div className='bg-muted-primary/50 h-1 animate-pulse rounded-full' />
              </div>
            }
          >
            <PriceRangeFilter
              baseMin={priceFilter.basePriceRange.min}
              baseMax={priceFilter.basePriceRange.max}
              currentMin={priceFilter.currentMin ?? undefined}
              currentMax={priceFilter.currentMax ?? undefined}
              onPriceChange={priceFilter.onChange}
            />
          </Show>
        </div>

        {/* Other Filters */}
        <List
          data={productFilters.filters}
          renderItem={(filter: Filter) => (
            <FilterItem
              filter={filter}
              decodedFilters={productFilters.decodedFilters}
              onFilterChange={productFilters.onChange}
            />
          )}
          keyExtractor={(filter: Filter) => filter.id}
          className='space-y-3.5'
          itemClassName='space-y-3.5 border-b pb-4 last:border-0'
        />
      </div>
    </div>
  );
};
