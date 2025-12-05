// UserMenu.tsx
import Link from 'next/link';
import clsx from 'clsx';

import { IconSvg } from '@/components/ui/IconSvg/IconSvg';
import { MOBILE_HEADER_USER_ACTIONS } from '@/constants/userMenu';

import s from './styles.module.scss';

interface MobileUserActionsListProps {
  className?: string;
}


export const MobileUserActionsList = ({ className }: MobileUserActionsListProps) => {
  return (
    <ul className={clsx(s.actionsList, className)}>
      {MOBILE_HEADER_USER_ACTIONS.map((item, i) => (
        <li key={i} className={s.userMenuItem}>
          <Link href={item.href} className={s.userMenuLink}>
            <IconSvg name={item.icon} className={s.userMenuIcon} width="24" height="24" />
          </Link>
        </li>
      ))}
    </ul>
  );
};
