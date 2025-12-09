'use client';
/* @no-recompile */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import { Icon } from '@/components/ui/Icon/Icon'; // Ваша іконка
import s from './styles.module.scss';
import { Category, GetCollectionsData } from '../../middleNav.types';
import MobileCatalogMenu from '../MobileCatalogMenu/MobileCatalogMenu';
import { parseSubCategoryData } from '@/utils/parsers/parseSubcategoryData';
import { getLastSegment } from '@/utils/parsers/getLastSegment';


interface CatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Category[];
}

export const CatalogMenu = ({ isOpen, onClose, collections }: CatalogMenuProps) => {

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false);

  const activeCollection = collections?.find((c) => c.id === activeId);

  const subCategories = activeCollection?.items;
  // 'https://placehold.co/142x110.png'

  if (!isOpen) return null;

  return (
    <>
      <div className={s.rootOverlay}>
        <div className={s.backdrop} onClick={onClose} />
        <div className={s.catalogWrapper}>
          <AppContainer classes={s.catalogAppContainer}>
            {/* <div className={s.catalogContainer}> */}
            {/* --- SIDEBAR (Left part) --- */}
            <aside className={s.sidebar}>
              <Icon className={s.vector} name={"vector"} />
              <ul className={s.sidebarList}>
                {collections?.map((item) => (
                  <li
                    key={item.id}
                    className={`${s.sidebarItem} ${activeId === item.id ? s.active : ''}`}
                    onClick={() => {
                      setActiveId(item.id)
                      setIsOpenSubMenu(true);

                    }}
                  >
                    <span className={s.itemIcon}>
                      <Icon name={"equipment"} width={20} height={20} />
                    </span>
                    <span className={s.itemTitle}>{item.title}</span>

                    <Icon name='arrowDown' className={s.mobileArrow} width={20} height={20} />
                  </li>
                ))}
              </ul>
            </aside>

            {/* --- CONTENT (Right part) --- */}
            {subCategories && subCategories?.length > 0 && <div className={s.contentArea}>
              <button className={s.closeBtn} onClick={onClose}>
                <Icon name="close" width={24} height={24} />
              </button>

              <div className={s.gridContainer}>
                {subCategories?.map((sub) => (
                  <Link key={sub.id} href={`/catalog/${getLastSegment(sub.id)}`} className={s.gridCard} onClick={onClose}>
                    <div className={s.imageWrapper}>
                      <Image
                        src={parseSubCategoryData(sub.title).image || 'https://placehold.co/100x100.png'}
                        alt={sub.title}
                        width={100}
                        height={100}
                        className={s.cardImage}
                      />
                    </div>
                    <p className={s.cardTitle}>{parseSubCategoryData(sub.title).title}</p>
                  </Link>
                ))}
              </div>
            </div>}
            <MobileCatalogMenu collections={collections} className={s.mobileCatalogMenu}></MobileCatalogMenu>
            {/* </div> */}
          </AppContainer>
        </div>
      </div>
    </>
  );
};