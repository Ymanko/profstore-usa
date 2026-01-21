import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSearchParams } from '@/features/search/hooks/use-search-params';

export interface SearchFormValues {
  q: string;
  category: string;
  subcategory: string;
  inDescription: boolean;
  includeSubcategories: boolean;
}

export function useSearchCriteriaForm() {
  const { params, setParams } = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(params.category || '');

  const form = useForm<SearchFormValues>({
    defaultValues: {
      q: params.q,
      category: params.category,
      subcategory: params.subcategory,
      inDescription: params.inDescription,
      includeSubcategories: params.includeSubcategories,
    },
  });

  // Handle category change - reset subcategory
  const handleCategoryChange = (value: string) => {
    form.setValue('category', value);
    form.setValue('subcategory', '');
    setSelectedCategory(value);
  };

  // Submit form - update URL params
  const onSubmit = (data: SearchFormValues) => {
    void setParams({
      q: data.q || '',
      category: data.category || '',
      subcategory: data.subcategory || '',
      inDescription: data.inDescription,
      includeSubcategories: data.includeSubcategories,
    });
  };

  return {
    form,
    onSubmit,
    selectedCategory,
    handleCategoryChange,
  };
}
