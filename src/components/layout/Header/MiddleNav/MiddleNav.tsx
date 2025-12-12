'use client';

import { useQuery } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { AppContainer } from '@/components/common/AppContainer';
import { Show } from '@/components/common/Show';
import { SiteLogo } from '@/components/common/SiteLogo';
import { CatalogMenu } from '@/components/layout/Header/MiddleNav/components/CatalogMenu/CatalogMenu';
import { DesktopUserActionsList } from '@/components/layout/Header/MiddleNav/components/DesktopUserActionsList/DesktopUserActionsList';
import { SearchResultList } from '@/components/layout/Header/SearchResultList/SearchResultList';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getMenuItemsQueryOptions } from '@/queries/get-menu-items';
import { searchQueryOptions } from '@/queries/search-query';

import s from './styles.module.scss';

import type { ChangeEvent } from 'react';

export const MiddleNav = () => {
  const { data: categories, isFetching } = useSuspenseQuery(getMenuItemsQueryOptions);

  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [value] = useDebounce(searchValue, 300);
  const { data, isFetching: isLoadingSearch } = useQuery(searchQueryOptions(value));

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const toggleCatalog = () => {
    setIsCatalogOpen(prev => !prev);
    setIsFocus(false);
  };

  const closeCatalog = () => {
    setIsCatalogOpen(false);
  };

  return (
    <div className={s.headerMiddle}>
      <AppContainer className={s.headerMiddleContainer}>
        <SiteLogo />
        <DesktopUserActionsList className={s.userActionList} />
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
              onFocus={() => {
                setIsFocus(true);
                setIsCatalogOpen(false);
              }}
              onBlur={() => setTimeout(() => setIsFocus(false), 100)}
            />
            <div className={s.iconWrap}>
              {isLoadingSearch ? (
                <span style={{ fontSize: '12px' }}>...</span>
              ) : (
                <Icon className={s.searchIcon} name='search' width={24} height={24} />
              )}
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
