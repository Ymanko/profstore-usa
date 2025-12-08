'use client';
/* @no-recompile */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import { Icon } from '@/components/ui/Icon/Icon'; // Ваша іконка
import s from './styles.module.scss';
import { GetCollectionsData } from '../../middleNav.types';

interface SubCategory {
  id: string;
  title: string;
  image: string;
}

interface CollectionItem {
  id: string;
  title: string;
  iconName?: string;
  subcategories?: SubCategory[];
}

interface CatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
  collections: CollectionItem[];
}

export const CatalogMenu = ({ isOpen, onClose, collections }: CatalogMenuProps) => {

  const [activeId, setActiveId] = useState<string | null>(collections?.[0]?.id || null);

  // useEffect(() => {
  //   if (!isOpen) return;
  //   if (!collections?.length) return;

  //   setActiveId(collections[0].id);
  // }, [isOpen, collections]);

  const activeCollection = collections?.find((c) => c.id === activeId);

  const mockSubcategories: SubCategory[] = [
    { id: '1', title: 'OVENS AND OVENS', image: 'https://placehold.co/142x110.png' },
    { id: '2', title: 'WOOD OVENS FOR PIZZA', image: 'https://placehold.co/142x110.png' },
    { id: '3', title: 'CONVECTION OVENS', image: 'https://placehold.co/142x110.png' },
    { id: '4', title: 'CABINETS FOR PROOFING', image: 'https://placehold.co/142x110.png' },
    { id: '5', title: 'HEARTH STOVES', image: 'https://placehold.co/142x110.png' },
  ];

  const subItemsToRender = activeCollection?.subcategories || mockSubcategories;

  if (!isOpen) return null;

  return (
    <>
      <div className={s.rootOverlay}>
        <div className={s.backdrop} onClick={onClose} />
        <div className={s.catalogWrapper}>
          <AppContainer>
            <div className={s.catalogContainer}>
              <Icon className={s.vector} name={"vector"} />
              {/* --- SIDEBAR (Left part) --- */}
              <aside className={s.sidebar}>
                <ul className={s.sidebarList}>
                  {collections?.map((item) => (
                    <li
                      key={item.id}
                      className={`${s.sidebarItem} ${activeId === item.id ? s.active : ''}`}
                      onMouseEnter={() => setActiveId(item.id)}
                      onClick={() => setActiveId(item.id)}
                    >
                      <span className={s.itemIcon}>
                        <Icon name={"equipment"} width={20} height={20} />
                      </span>
                      <span className={s.itemTitle}>{item.title}</span>

                      {/* Стрілочка для мобільного (опціонально) */}
                      <Icon name='arrowDown' className={s.mobileArrow} width={20} height={20} />
                    </li>
                  ))}
                </ul>
              </aside>

              {/* --- CONTENT (Right part) --- */}
              <div className={s.contentArea}>
                <button className={s.closeBtn} onClick={onClose}>
                  <Icon name="close" width={24} height={24} />
                </button>

                <div className={s.gridContainer}>
                  {subItemsToRender.map((sub) => (
                    <Link key={sub.id} href={`/catalog/${activeId}/${sub.id}`} className={s.gridCard} onClick={onClose}>
                      <div className={s.imageWrapper}>
                        <Image
                          src={sub.image || '/img/placeholder-oven.png'}
                          alt={sub.title}
                          width={100}
                          height={100}
                          className={s.cardImage}
                        />
                      </div>
                      <p className={s.cardTitle}>{sub.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </AppContainer>
        </div>
      </div>
    </>
  );
};