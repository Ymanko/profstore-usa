import clsx from 'clsx';
// UserMenu.tsx
import Link from 'next/link';

import { Icon } from '@/components/ui/Icon';
import { DESKTOP_HEADER_USER_ACTIONS } from '@/constants/userMenu';

import s from './styles.module.scss';

interface MobileUserActionsListProps {
  className?: string;
}

export const DesktopUserActionsList = ({ className }: MobileUserActionsListProps) => {
  return (
    <ul className={clsx(s.actionsList, className)}>
      {DESKTOP_HEADER_USER_ACTIONS.map((item, i) => (
        <li key={i} className={s.userMenuItem}>
          <Link href={item.href} className={s.userMenuLink}>
            <Icon name={item.icon} className={s.userMenuIcon} width='24' height='24' />
            <p className={s.label}>{item.label}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
