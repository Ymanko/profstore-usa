'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useSearchCriteriaForm } from '@/features/search/hooks/use-search-criteria-form';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import { getCategoriesQueryOptions } from '@/shared/queries/home/categories/get-categories';
import { getCollectionsWithParentQueryOptions } from '@/shared/queries/search/collections-with-parent/get-collections-with-parent';

export function SearchCriteriaForm() {
  const { data: categories } = useSuspenseQuery(getCategoriesQueryOptions);
  const { data: collections } = useSuspenseQuery(getCollectionsWithParentQueryOptions);
  const { form, onSubmit, selectedCategory, handleCategoryChange } = useSearchCriteriaForm();

  const { register, handleSubmit, setValue } = form;
  const subcategories = collections.filter(col => col.parentCategoryHandle === selectedCategory);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-5'>
      <div className='grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3'>
        {/* Product search input */}
        <Input
          {...register('q')}
          type='text'
          placeholder='Product search'
          className='font-montserrat h-12.5 w-full px-2.5 py-3.5 text-[17px] leading-4.25 font-light md:col-span-2 md:text-lg xl:col-span-1'
        />

        {/* Categories dropdown */}
        <NativeSelect
          {...register('category', {
            onChange: e => handleCategoryChange(e.target.value),
          })}
          className='[&_select]:font-montserrat w-full [&_select]:h-12.5 [&_select]:text-[17px] [&_select]:leading-4.25 [&_select]:font-light'
        >
          <NativeSelectOption value=''>All categories</NativeSelectOption>

          {categories.map(({ node }) => (
            <NativeSelectOption key={node.id} value={node.handle}>
              {node.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        {/* Subcategories dropdown */}
        <NativeSelect
          {...register('subcategory')}
          className='[&_select]:font-montserrat w-full [&_select]:h-12.5 [&_select]:text-[17px] [&_select]:leading-4.25 [&_select]:font-light'
          disabled={!selectedCategory}
        >
          <NativeSelectOption value=''>All subcategories</NativeSelectOption>

          {subcategories.map(collection => (
            <NativeSelectOption key={collection.id} value={collection.handle}>
              {collection.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          id='search-description'
          {...register('inDescription')}
          onCheckedChange={checked => setValue('inDescription', checked === true)}
          className='size-5.5'
        />
        <Label
          htmlFor='search-description'
          className='font-montserrat cursor-pointer text-[17px] leading-4.25 font-light'
        >
          Search in product description
        </Label>
      </div>

      <Button type='submit' options='gradient' size='lg' className='mt-1 h-13.75 w-40.5 text-xl font-medium md:mt-2.5'>
        Search
      </Button>
    </form>
  );
}
