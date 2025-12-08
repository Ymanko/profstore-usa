import Link from 'next/link';
import Image from 'next/image';

import s from './styles.module.scss';
import { FC } from 'react';
import { SearchResults } from '@/components/layout/Header/MiddleNav/middleNav.types';

const DEFAULT_SEARCH_DATA = { products: [], collections: [] };

type TSearchResultListProps = {
  isFocus: boolean;
  searchData: SearchResults;
};

export const SearchResultList: FC<TSearchResultListProps> = ({
  searchData,
  isFocus,
}) => {
  const safeSearchData = searchData || DEFAULT_SEARCH_DATA;

  if (
    (!safeSearchData.products.length && !safeSearchData.collections.length) ||
    !isFocus
  ) {
    return null;
  }

  return (
    <div className={s.searchResultContainer}>
      {safeSearchData.products.length !== 0 && (
        <>
          <h2 className={s.searchResultTitle}>Products</h2>
          <ul className={s.searchResultList}>
            {safeSearchData.products.map(
              ({ id, title, priceRange, images, handle }) => {
                const altText = images.edges[0]?.node?.altText || title;
                const url = images.edges[0]?.node?.url;
                return (
                  <li key={id} className={s.searchResultListItem}>
                    <Link
                      href={`/product/${handle}`}
                      className={s.searchResultListLink}
                    >
                      {url && (
                        <Image src={url} alt={altText} width={60} height={60} />
                      )}
                      <div>
                        <h3 className={s.searchResultListItemTitle}>{title}</h3>
                        <p className={s.searchResultListItemPrice}>
                          {priceRange.maxVariantPrice.amount}$
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              },
            )}
          </ul>
        </>
      )}
      {safeSearchData.collections.length !== 0 && (
        <>
          <h2 className={s.searchResultTitle}>Collections</h2>
          <ul className={s.searchResultList}>
            {safeSearchData.collections.map(({ id, title, handle }) => {
              return (
                <li key={id} className={s.searchResultListItem}>
                  <Link
                    href={`/catalog/${handle}`}
                    className={s.searchResultListLink}
                  >
                    <div>
                      <h3 className={s.searchResultListItemTitle}>{title}</h3>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Link href={'/catalog'} className={s.allResultsLink}>
        All results
      </Link>
    </div>
  );
};
