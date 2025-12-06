'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { Icon } from '@/components/ui/Icon/Icon';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import { DesktopUserActionsList } from './components/DesktopUserActionsList/DesktopUserActionsList';

import { useDebounce } from 'use-debounce';

import { useGetCollections } from '@/hooks/useGetCollections';
import { useGetSearchData } from '@/hooks/useGetSearchData';

import s from './styles.module.scss';

export const MiddleNav = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [value] = useDebounce(searchValue, 300);

  const { loadingCollections, collections } = useGetCollections();
  const { loadingSearch, searchData } = useGetSearchData(value);

  console.info('collections', collections);
  console.info('searchData', searchData);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCatalogClick = () => {};

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
            className={s.catalogBtn}
            onClick={handleCatalogClick}
            disabled={loadingCollections}
          >
            <Icon name="viewGrid" width={24} height={24} />
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
          </div>
        </div>
      </AppContainer>
    </div>
  );
};
