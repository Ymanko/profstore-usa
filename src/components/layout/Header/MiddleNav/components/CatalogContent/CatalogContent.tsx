'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/ui/Icon';
import { getLastSegment } from '@/utils/parsers/getLastSegment';
import { parseSubCategoryData } from '@/utils/parsers/parseSubcategoryData';

import s from './styles.module.scss';

import type { SubCategory } from '../../middleNav.types';

interface CatalogContentProps {
  subCategories?: SubCategory[];
  onClose: () => void;
}

export const CatalogContent = ({ subCategories, onClose }: CatalogContentProps) => {
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <div className={s.contentArea}>
      <button className={s.closeBtn} onClick={onClose}>
        <Icon name='close' width={24} height={24} />
      </button>

      <div className={s.gridContainer}>
        {subCategories.map(sub => {
          const parsed = parseSubCategoryData(sub.title);

          return (
            <Link key={sub.id} href={getLastSegment(sub.id)} className={s.gridCard} onClick={onClose}>
              <div className={s.imageWrapper}>
                <Image
                  src={parsed.image || 'https://placehold.co/100x100.png'}
                  alt={parsed.title}
                  width={100}
                  height={100}
                  className={s.cardImage}
                />
              </div>

              <p className={s.cardTitle}>{parsed.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
