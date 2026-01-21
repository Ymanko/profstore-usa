'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useSearchCriteriaForm } from '@/features/search/hooks/use-search-criteria-form';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import { Typography } from '@/shared/components/ui/typography';
import { getCategoriesQueryOptions } from '@/shared/queries/home/categories/get-categories';
import { getCollectionsWithParentQueryOptions } from '@/shared/queries/search/collections-with-parent/get-collections-with-parent';

export function SearchCriteriaForm() {
  const { data: categories } = useSuspenseQuery(getCategoriesQueryOptions);
  const { data: collections } = useSuspenseQuery(getCollectionsWithParentQueryOptions);
  const { form, onSubmit, selectedCategory, handleCategoryChange } = useSearchCriteriaForm();

  const { register, handleSubmit, setValue } = form;
  const subcategories = collections.filter(col => col.parentCategoryHandle === selectedCategory);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Typography variant='h3' className='font-semibold'>
        Search criteria
      </Typography>

      <div className='flex flex-wrap gap-4'>
        {/* Product search input */}
        <Input type='text' placeholder='Product search' {...register('q')} className='w-full sm:w-60' />

        {/* Categories dropdown */}
        <NativeSelect
          {...register('category', {
            onChange: e => handleCategoryChange(e.target.value),
          })}
          className='w-full sm:w-60'
        >
          <NativeSelectOption value=''>All categories</NativeSelectOption>

          {categories.map(({ node }) => (
            <NativeSelectOption key={node.id} value={node.handle}>
              {node.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        {/* Subcategories dropdown */}
        <NativeSelect {...register('subcategory')} className='w-full sm:w-60' disabled={!selectedCategory}>
          <NativeSelectOption value=''>All subcategories</NativeSelectOption>

          {subcategories.map(collection => (
            <NativeSelectOption key={collection.id} value={collection.handle}>
              {collection.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='search-description'
            {...register('inDescription')}
            onCheckedChange={checked => setValue('inDescription', checked === true)}
          />
          <Label htmlFor='search-description' className='cursor-pointer text-sm'>
            Search in product description
          </Label>
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox
            id='search-subcategories'
            {...register('includeSubcategories')}
            onCheckedChange={checked => setValue('includeSubcategories', checked === true)}
            disabled={!selectedCategory}
          />
          <Label
            htmlFor='search-subcategories'
            className={`cursor-pointer text-sm ${!selectedCategory ? 'text-muted-foreground' : ''}`}
          >
            Search in subcategories
          </Label>
        </div>
      </div>

      <Button type='submit' className='px-8'>
        Search
      </Button>
    </form>
  );
}
