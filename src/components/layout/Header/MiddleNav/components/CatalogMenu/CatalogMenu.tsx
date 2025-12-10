'use client';
/* @no-recompile */

import { useState } from 'react';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import s from './styles.module.scss';
import { Category } from '../../middleNav.types';
import MobileCatalogMenu from '../MobileCatalogMenu/MobileCatalogMenu';
import { CatalogSidebar } from '../CatalogSidebar/CatalogSidebar';
import { CatalogContent } from '../CatalogContent/CatalogContent';

interface CatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Category[];
}

export const CatalogMenu = ({
  isOpen,
  onClose,
  collections,
}: CatalogMenuProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCollection = collections.find(
    (c) => c.id === activeId
  );

  // const subCategories = activeCollection?.items;

  if (!isOpen) return null;

  return (
    <div className={s.rootOverlay}>
      <div className={s.backdrop} onClick={onClose} />

      <div className={s.catalogWrapper}>
        <AppContainer classes={s.catalogAppContainer}>
          <CatalogSidebar
            collections={collections}
            activeId={activeId}
            onSelect={setActiveId}
            onClose={onClose}
          />

          <CatalogContent
            subCategories={activeCollection?.items}
            onClose={onClose}
          />

          <MobileCatalogMenu
            collections={collections}
            className={s.mobileCatalogMenu}
            onClose={onClose}
          />
        </AppContainer>
      </div>
    </div>
  );
};
