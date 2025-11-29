'use client';

import Link from 'next/link';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';

import s from './styles.module.scss';
import { FaTelegramPlane, FaViber, FaCommentDots } from 'react-icons/fa';

const NAV_ITEMS = [
  { label: 'New', href: '/' },
  { label: 'Delivery and payment', href: '/delivery' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'How to Buy', href: '/how-to-buy' },
  { label: 'Producers', href: '/producers' },
  { label: 'Shares', href: '/shares' },
  { label: 'Warranty and service', href: '/warranty' },
];

const SOCIAL_ICONS = [
  { icon: <FaTelegramPlane />, href: 'https://t.me/yourchannel' },
  { icon: <FaViber />, href: 'viber://chat?number=%2B1234567890' },
  { icon: <FaCommentDots />, href: '#' }, // інший месенджер
];

export const Header = () => {
  return (
    <header className={s.header}>
      <AppContainer classes={s.headerContainer}>
        <div className={s.headerContent}>
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

          {/* Соцмережі */}
          <div className={s.socials}>
            {SOCIAL_ICONS.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={s.socialIcon}>
                {social.icon}
              </a>
            ))}
          </div>

          {/* Staff Training */}
          <div className={s.staffTraining}>Staff Training</div>

          {/* Телефон */}
          <a href='tel:5555551234' className={s.phone}>(555) 555-1234</a>
        </div>
        <Link href={"/catalog"} className={s.catalogLink}>Catalog</Link>
      </AppContainer>
    </header>
  );
};
