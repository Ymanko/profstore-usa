'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { LoaderCircle, Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

import { AppContainer } from '@/components/common/AppContainer';
import { Show } from '@/components/common/Show';
import { CatalogMenu } from '@/components/layout/Header/MiddleNav/components/CatalogMenu/CatalogMenu';
import { SearchResultList } from '@/components/layout/Header/SearchResultList/SearchResultList';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { SEARCH_DEBOUNCE_MS } from '@/constants/search';
import { useSearchState } from '@/hooks/use-search-state';
import { cn } from '@/lib/utils';
import { getMenuItemsQueryOptions } from '@/queries/get-menu-items';
import { searchQueryOptions } from '@/queries/search-query';

import s from '../MiddleNav/styles.module.scss';

import type { ChangeEvent, ComponentPropsWithoutRef, FC } from 'react';

export const Searchbar: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => {
  const { data: categories, isFetching } = useSuspenseQuery(getMenuItemsQueryOptions);

  const { searchValue, setSearchValue, isFocus, isCatalogOpen, handleFocus, handleBlur, toggleCatalog, closeCatalog } =
    useSearchState();

  const [debouncedValue] = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const { data, isFetching: isLoadingSearch } = useQuery(searchQueryOptions(debouncedValue.trim()));

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={cn(s.headerMiddle, className)} {...props}>
      <AppContainer className={s.headerMiddleContainer}>
        <div className={s.searchContainer}>
          <Button
            className={cn('h-13', s.catalogBtn, isCatalogOpen && s.active)}
            onClick={toggleCatalog}
            disabled={isFetching}
          >
            <Show when={isCatalogOpen} fallback={<Icon name='viewGrid' width={24} height={24} />}>
              <Icon name='close' width={24} height={24} />
            </Show>
            Catalog
          </Button>

          <div className={s.inputWrap}>
            <Label htmlFor='search' className='sr-only'>
              Search products
            </Label>
            <Input
              id='search'
              type='text'
              placeholder='Search products...'
              className={s.searchInput}
              onChange={handleSearchChange}
              value={searchValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <div className={s.iconWrap}>
              <Show when={isLoadingSearch} fallback={<Search className='size-6' />}>
                <LoaderCircle className='size-6 animate-spin' />
              </Show>
            </div>

            <SearchResultList searchData={data ?? null} isFocus={isFocus} />
          </div>
        </div>
      </AppContainer>

      <Show when={isCatalogOpen}>
        <CatalogMenu isOpen={isCatalogOpen} onClose={closeCatalog} collections={categories} />
      </Show>
    </div>
  );
};
