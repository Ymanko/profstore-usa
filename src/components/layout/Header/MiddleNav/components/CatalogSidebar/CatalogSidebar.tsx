'use client';

import { useRouter } from 'next/navigation';

import { Icon } from '@/components/ui/Icon';
import { getPathAfterCom } from '@/utils/parsers/getPathAfterCom';

import s from './styles.module.scss';

import type { Category } from '@/components/layout/Header/MiddleNav/middleNav.types';

interface CatalogSidebarProps {
  collections: Category[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export const CatalogSidebar = ({ collections, activeId, onSelect, onClose }: CatalogSidebarProps) => {
  const router = useRouter();

  return (
    <aside className={s.sidebar}>
      <Icon className={s.vector} name='vector' />

      <ul className={s.sidebarList}>
        {collections.map(item => (
          <li
            key={item.id}
            className={`${s.sidebarItem} ${activeId === item.id ? s.active : ''}`}
            onClick={() => {
              if (!item.items || item.items.length === 0) {
                if (item.url) {
                  router.push(getPathAfterCom(item.url));
                  onClose();
                }
                return;
              }

              onSelect(item.id);
            }}
          >
            <span className={s.itemIcon}>
              <Icon name='equipment' width={20} height={20} />
            </span>

            <span className={s.itemTitle}>{item.title}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
