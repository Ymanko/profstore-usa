'use client';

import * as Accordion from '@radix-ui/react-accordion';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import { Category } from '../../middleNav.types';
import s from './styles.module.scss';
import { parseSubCategoryData } from '@/utils/parsers/parseSubcategoryData';
import Image from 'next/image';
import { getLastSegment } from '@/utils/parsers/getLastSegment';

interface MobileCatalogMenuProps {
  collections: Category[];
  className?: string;
}

export default function MobileCatalogMenu({
  collections,
  className,
}: MobileCatalogMenuProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={`${s.sidebar} ${className ?? ''}`}
    >
      <Icon className={s.vector} name="vector" />

      <ul className={s.sidebarList}>
        {collections?.map((category) => (
          <Accordion.Item
            key={category.id}
            value={category.id}
            asChild
          >
            <li className={s.sidebarItem}>
              {/* ===== Trigger (головний пункт) ===== */}
              <Accordion.Header>
                <Accordion.Trigger >
                  <span className={s.itemIcon}>
                    <Icon name="equipment" width={20} height={20} />
                  </span>

                  <span className={s.itemTitle}>
                    {category.title}
                  </span>

                  <Icon
                    name="arrowDown"
                    className={s.mobileArrow}
                    width={20}
                    height={20}
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              {/* ===== Content (підменю) ===== */}
              <Accordion.Content>
                <ul className={s.subContainer}>
                  {category.items?.map((sub) => (
                    <li className={s.subItem} key={sub.id}>
                      <Link
                        href={`/catalog/${getLastSegment(sub.id)}`}
                        className={s.subCard}
                      ><Image
                          src={parseSubCategoryData(sub.title).image || 'https://placehold.co/100x100.png'}
                          alt={sub.title}
                          width={30}
                          height={30}
                          className={s.cardImage}
                        />
                        <p>{parseSubCategoryData(sub.title).title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </li>
          </Accordion.Item>
        ))}
      </ul>
    </Accordion.Root>
  );
}