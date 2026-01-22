'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import { Label } from '@/shared/components/ui/label';
import { Typography } from '@/shared/components/ui/typography';

import type { Filter, SubcategoryProductsParams } from '@/shared/queries/collections/types';

interface FilterItemProps {
  filter: Filter;
  decodedFilters: SubcategoryProductsParams['filters'];
  onFilterChange: (filterInput: string, checked: boolean) => void;
}

const INITIAL_VISIBLE_COUNT = 5;

export function FilterItem({ filter, decodedFilters, onFilterChange }: FilterItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibleValues = filter.values.slice(0, INITIAL_VISIBLE_COUNT);
  const hiddenValues = filter.values.slice(INITIAL_VISIBLE_COUNT);
  const hasMoreValues = hiddenValues.length > 0;

  const renderCheckbox = (value: Filter['values'][0]) => {
    const isChecked = (decodedFilters || []).some(f => JSON.stringify(f) === value.input);
    const isDisabled = value.count === 0;

    return (
      <div key={value.id} className='flex items-center gap-2'>
        <Checkbox
          id={value.id}
          checked={isChecked}
          disabled={isDisabled}
          onCheckedChange={checked => onFilterChange(value.input, checked === true)}
        />
        <Label
          htmlFor={value.id}
          className='flex w-full cursor-pointer items-center gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-50'
          data-disabled={isDisabled ? '' : undefined}
        >
          <Typography className='flex-1'>{value.label}</Typography>
          <Typography className='text-muted-foreground'>{`(${value.count})`}</Typography>
        </Label>
      </div>
    );
  };

  return (
    <>
      <Typography variant='bold'>{filter.label}</Typography>

      <div className='space-y-2'>
        {/* Always visible options */}
        {visibleValues.map(renderCheckbox)}

        {/* Collapsible additional options */}
        {hasMoreValues && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent className='data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down space-y-2 overflow-hidden'>
              {hiddenValues.map(renderCheckbox)}
            </CollapsibleContent>

            <CollapsibleTrigger className='text-secondary hover:text-secondary/80 mt-2 flex items-center gap-1 text-sm transition-colors'>
              {isOpen ? `Show less` : `Show all`}
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </div>
    </>
  );
}
