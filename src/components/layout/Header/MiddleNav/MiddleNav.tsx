'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { AppContainer } from '@/components/common/AppContainer';
import { CatalogMenu } from '@/components/layout/Header/MiddleNav/components/CatalogMenu/CatalogMenu';
import { DesktopUserActionsList } from '@/components/layout/Header/MiddleNav/components/DesktopUserActionsList/DesktopUserActionsList';
import { SearchResultList } from '@/components/layout/Header/SearchResultList/SearchResultList';
import { Icon } from '@/components/ui/Icon';
import { useGetMenuItems } from '@/hooks/useGetMenuItems';
import { useGetSearchData } from '@/hooks/useGetSearchData';

import s from './styles.module.scss';

import type { Category } from '@/components/layout/Header/MiddleNav/middleNav.types';
import type { ChangeEvent } from 'react';

export const MiddleNav = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [value] = useDebounce(searchValue, 300);

  const { loadingCollections, dataCollections } = useGetMenuItems();
  const { loadingSearch, searchData } = useGetSearchData(value);

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

  const categories: Category[] = dataCollections?.menu?.items || [];

  return (
    <div className={s.headerMiddle}>
      <AppContainer className={s.headerMiddleContainer}>
        <Link href='/' className={s.logoLink}>
          <Image src='/img/profstore-logo.png' alt='Profstore logo' width={141} height={66} className={s.logo} />
        </Link>

        <DesktopUserActionsList className={s.userActionList} />
        <div className={s.searchContainer}>
          <button
            className={`${s.catalogBtn} ${isCatalogOpen ? s.active : ''}`}
            onClick={toggleCatalog}
            disabled={loadingCollections}
          >
            {isCatalogOpen ? (
              <Icon name='close' width={24} height={24} />
            ) : (
              <Icon name='viewGrid' width={24} height={24} />
            )}
            {/* <Icon name="viewGrid" width={24} height={24} /> */}
            Catalog
          </button>

          <div className={s.inputWrap}>
            <label htmlFor='search' className='visuallyHidden'>
              Search products
            </label>
            <input
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
              {loadingSearch ? (
                <span style={{ fontSize: '12px' }}>...</span>
              ) : (
                <Icon className={s.searchIcon} name='search' width={24} height={24} />
              )}
            </div>
            <SearchResultList searchData={searchData} isFocus={isFocus} />
          </div>
        </div>
      </AppContainer>

      {isCatalogOpen && <CatalogMenu isOpen={isCatalogOpen} onClose={closeCatalog} collections={categories} />}
    </div>
  );
};
