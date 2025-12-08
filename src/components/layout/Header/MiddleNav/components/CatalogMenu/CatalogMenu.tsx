'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import { Icon } from '@/components/ui/Icon/Icon'; // Ваша іконка
import s from './styles.module.scss';
import { GetCollectionsData } from '../../middleNav.types';

// Типи даних (адаптуйте під ваш реальний API)
interface SubCategory {
  id: string;
  title: string;
  image: string;
}

interface CollectionItem {
  id: string;
  title: string; // Наприклад: "Steam ovens and stoves"
  iconName?: string; // Назва іконки для Icon component
  subcategories?: SubCategory[]; // Діти для правої частини
}

interface CatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
  collections: CollectionItem[]; // Замініть any на ваш тип CollectionItem[]
}

export const CatalogMenu = ({ isOpen, onClose, collections }: CatalogMenuProps) => {
  // Стейт для активної категорії в сайдбарі
  const [activeId, setActiveId] = useState<string | null>(null);

  // Встановлюємо першу категорію активною при відкритті
  useEffect(() => {
    if (isOpen && collections?.length > 0 && !activeId) {
      setActiveId(collections[0].id);
    }
  }, [isOpen, collections, activeId]);

  // Знаходимо дані активної колекції для відображення справа
  // ТУТ ВАЖЛИВО: Адаптуйте це під структуру вашого об'єкта collections
  const activeCollection = collections?.find((c) => c.id === activeId);

  // Мок-дані для демонстрації правої частини (якщо у вас в API ще немає subcategories)
  // Видаліть це, коли підключите реальні children
  const mockSubcategories: SubCategory[] = [
    { id: '1', title: 'OVENS AND OVENS', image: '/img/oven-1.png' },
    { id: '2', title: 'WOOD OVENS FOR PIZZA', image: '/img/oven-2.png' },
    { id: '3', title: 'CONVECTION OVENS', image: '/img/oven-3.png' },
    { id: '4', title: 'CABINETS FOR PROOFING', image: '/img/oven-4.png' },
    { id: '5', title: 'HEARTH STOVES', image: '/img/oven-5.png' },
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
              {/* <Icon className={s.vector} name={"vector"} /> */}
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
                      <Icon name="close" className={s.mobileArrow} width={16} height={16} />
                    </li>
                  ))}
                </ul>
              </aside>

              {/* --- CONTENT (Right part) --- */}
              <main className={s.contentArea}>
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
              </main>

            </div>
          </AppContainer>
        </div>
      </div>
    </>
  );
};