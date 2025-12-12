'use client';

import Link from 'next/link';
import { useState } from 'react';

import { AppContainer } from '@/components/common/AppContainer';
import { SocialLinks } from '@/components/common/SocialLinks/SocialLinks';
import { Icon } from '@/components/ui/Icon';
import { NAV_ITEMS } from '@/constants/userMenu';

import { HamburgerButton } from './components/HamburgerButton/HamburgerButton';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { MobileUserActionsList } from './components/MobileUserActionsList/MobileUserActionsList';
import s from './styles.module.scss';

export const TopNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className={s.headerTop}>
      <AppContainer className={s.headerTopContainer}>
        <div className={s.headerContent}>
          <HamburgerButton className={s.hBtn} isOpen={isOpenMenu} setIsOpenMenu={() => setIsOpenMenu(prev => !prev)} />

          <nav className={s.nav}>
            <ul className={s.navList}>
              {NAV_ITEMS.map(item => (
                <li key={item.label} className={s.navItem}>
                  <Link className={s.navLink} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.socials}>
            <SocialLinks />
          </div>

          <div className={s.staffTraining}>
            <Icon name='mortarboard' width='24' height='24' />
            <p>Staff Training</p>
          </div>

          <a href='tel:5555551234' className={s.phone}>
            <Icon name='callReceive' width='24' height='24' />
            (555) 555-1234
          </a>
          <MobileUserActionsList className={s.mobileUserActionsList} />
        </div>
      </AppContainer>

      {isOpenMenu && <MobileMenu closeMenu={() => setIsOpenMenu(false)} />}
    </div>
  );
};
