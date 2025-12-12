'use client';

import * as Accordion from '@radix-ui/react-accordion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/ui/Icon';
import { getPathAfterCom } from '@/utils/parsers/getPathAfterCom';
import { parseSubCategoryData } from '@/utils/parsers/parseSubcategoryData';

import s from './styles.module.scss';

import type { Category } from '../../middleNav.types';

interface MobileCatalogMenuProps {
  collections: Category[];
  className?: string;
  onClose: () => void;
}

export default function MobileCatalogMenu({ collections, className, onClose }: MobileCatalogMenuProps) {
  const router = useRouter();

  return (
    <Accordion.Root type='single' collapsible className={`${s.sidebar} ${className ?? ''}`}>
      <Icon className={s.vector} name='vector' />

      <ul className={s.sidebarList}>
        {collections?.map(category => {
          const hasSub = category.items?.length > 0;

          return (
            <Accordion.Item key={category.id} value={category.id} asChild>
              <li className={s.sidebarItem}>
                <Accordion.Header>
                  {hasSub ? (
                    <Accordion.Trigger className={s.itemButton}>
                      <span className={s.itemIcon}>
                        <Icon name='equipment' width={20} height={20} />
                      </span>

                      <span className={s.itemTitle}>{category.title}</span>

                      {hasSub && <Icon name='arrowDown' className={s.mobileArrow} width={20} height={20} />}
                    </Accordion.Trigger>
                  ) : (
                    // ==== Якщо підкатегорій немає → робимо redirect ====
                    <button
                      className={s.itemButton}
                      onClick={() => {
                        if (category.url) {
                          router.push(getPathAfterCom(category.url));
                          onClose();
                        }
                      }}
                    >
                      <span className={s.itemIcon}>
                        <Icon name='equipment' width={20} height={20} />
                      </span>

                      <span className={s.itemTitle}>{category.title}</span>
                    </button>
                  )}
                </Accordion.Header>

                {hasSub && (
                  <Accordion.Content>
                    <ul className={s.subContainer}>
                      {category.items?.map(sub => (
                        <li className={s.subItem} key={sub.id}>
                          <button
                            className={s.subCard}
                            onClick={() => {
                              if (sub.url) {
                                router.push(getPathAfterCom(sub.url));
                                onClose();
                              }
                            }}
                          >
                            <Image
                              src={parseSubCategoryData(sub.title).image || 'https://placehold.co/100x100.png'}
                              alt={sub.title}
                              width={30}
                              height={30}
                              className={s.cardImage}
                            />

                            <p>{parseSubCategoryData(sub.title).title}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                )}
              </li>
            </Accordion.Item>
          );
        })}
      </ul>
    </Accordion.Root>
  );
}
