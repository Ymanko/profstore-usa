import Link from 'next/link';

import { SocialLinks } from '@/components/common/SocialLinks';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/constants/site-config';
import { NAV_ITEMS } from '@/constants/user-menu';

import s from './styles.module.scss';

interface MobileMenuProps {
  closeMenu: () => void;
}

export const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
  return (
    <div className={s.mobileMenu}>
      <div className={s.content}>
        {/* Блок навігації */}
        <nav className={s.nav}>
          <ul className={s.navList}>
            {NAV_ITEMS.map(item => (
              <li key={item.label} className={s.navItem}>
                <Link
                  className={s.navLink}
                  href={item.href}
                  onClick={closeMenu} // Закриваємо меню після кліку
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Блок телефону */}
        <a href={siteConfig.phone_href} className={s.phone} onClick={closeMenu}>
          <Icon name='callReceive' width='24' height='24' />
          {siteConfig.phone_number}
        </a>

        {/* Блок соціальних посилань */}
        <div className={s.socials}>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};
