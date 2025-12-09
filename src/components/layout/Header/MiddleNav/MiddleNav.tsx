'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { Icon } from '@/components/ui/Icon/Icon';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import { DesktopUserActionsList } from './components/DesktopUserActionsList/DesktopUserActionsList';

import { useDebounce } from 'use-debounce';

import { useGetMenuItems } from '@/hooks/useGetMenuItems';
import { useGetSearchData } from '@/hooks/useGetSearchData';

import s from './styles.module.scss';
import { SearchResultList } from '@/components/layout/Header/SearchResultList/SearchResultList';
import { Category } from './middleNav.types';
import { CatalogMenu } from './components/CatalogMenu/CatalogMenu';

export const MiddleNav = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [value] = useDebounce(searchValue, 300);

  const { loadingCollections, dataCollections } = useGetMenuItems();
  const { loadingSearch, searchData } = useGetSearchData(value);

  console.info('dataCollections', dataCollections);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCatalogClick = () => { };

  const toggleCatalog = () => {
    setIsCatalogOpen((prev) => !prev);
    setIsFocus(false)
  };

  const closeCatalog = () => {
    setIsCatalogOpen(false);
  };

  const categories: Category[] = dataCollections?.menu?.items || [];

  return (
    <div className={s.headerMiddle}>
      <AppContainer classes={s.headerMiddleContainer}>
        <Link href={'/'} className={s.logoLink}>
          <Image
            src={'/img/profstore-logo.png'}
            alt={'Profstore logo'}
            width={141}
            height={66}
            className={s.logo}
          />
        </Link>
        <DesktopUserActionsList className={s.userActionList} />
        <div className={s.searchContainer}>
          <button
            className={`${s.catalogBtn} ${isCatalogOpen ? s.active : ''}`}
            onClick={toggleCatalog}
            disabled={loadingCollections}
          >
            {isCatalogOpen ? (
              <Icon name="close" width={24} height={24} />
            ) : (
              <Icon name="viewGrid" width={24} height={24} />
            )}
            {/* <Icon name="viewGrid" width={24} height={24} /> */}
            Catalog
          </button>

          <div className={s.inputWrap}>
            <label htmlFor="search" className="visuallyHidden">
              Search products
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              className={s.searchInput}
              onChange={handleSearchChange}
              value={searchValue}
              onFocus={() => {
                setIsFocus(true)
                setIsCatalogOpen(false);
              }}
              // eslint-disable-next-line no-undef
              onBlur={() => setTimeout(() => setIsFocus(false), 100)}
            />
            <div className={s.iconWrap}>
              {loadingSearch ? (
                <span style={{ fontSize: '12px' }}>...</span>
              ) : (
                <Icon
                  className={s.searchIcon}
                  name="search"
                  width={24}
                  height={24}
                />
              )}
            </div>
            <SearchResultList searchData={searchData} isFocus={isFocus} />
          </div>
        </div>
      </AppContainer>

      {isCatalogOpen && (
        <CatalogMenu
          isOpen={isCatalogOpen}
          onClose={closeCatalog}
          collections={categories}
        />
      )
      }
    </div>
  );
};
