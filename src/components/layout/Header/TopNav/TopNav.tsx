import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import s from './styles.module.scss';


import Link from 'next/link';
// import { IconSvg } from '../../../ui/Icon/Icon';
import { HamburgerButton } from './components/HamburgerButton/HamburgerButton ';
import { useState } from 'react';
import Image from 'next/image';
import { MobileUserActionsList } from './components/MobileUserActionsList/MobileUserActionsList';
import { NAV_ITEMS } from '@/constants/userMenu';



// interface TopNavProps {
// }

export const TopNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className={s.headerTop}>
      <AppContainer classes={s.headerTopContainer}>
        <div className={s.headerContent}>
          {/* <button className={s.btnOpenMenu} onClick={onClick} aria-label="Open mobile menu">
            <IconSvg name="icon-menu" width="24" height="24" />
          </button> */}
          <HamburgerButton isOpen={isOpenMenu} setIsOpenMenu={() => setIsOpenMenu(prev => !prev)} />
          {/* Навігаційне меню */}
          <nav className={s.nav}>
            <ul className={s.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className={s.navItem}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.socials}>
            {/* {SOCIAL_ICONS.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={s.socialIcon}>
                {social.icon}
              </a>
            ))} */}
          </div>

          {/* Staff Training */}
          <div className={s.staffTraining}>
            <Image src="/img/mortarboard.png" alt="Staff Training" width={24} height={24} />
            <p>Staff Training</p></div>

          {/* Телефон */}
          <a href='tel:5555551234' className={s.phone}>(555) 555-1234</a>

          <MobileUserActionsList className={s.mobileUserActionsList} />
        </div>
      </AppContainer>
    </div>
  );
}