// MobileMenu.tsx
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import s from './styles.module.scss';

import { FaTelegramPlane, FaViber, FaCommentDots } from 'react-icons/fa';
import Link from 'next/link';

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
  { icon: <FaCommentDots />, href: '#' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className={s.mobileMenuOverlay}>
      <AppContainer classes={s.mobileMenuContainer}>
        <nav className={s.mobileNav}>
          <ul className={s.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={s.navItem}>
                <Link href={item.href} onClick={onClose}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.mobileSocials}>
          {SOCIAL_ICONS.map((social, index) => (
            <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={s.socialIcon}>
              {social.icon}
            </a>
          ))}
        </div>
      </AppContainer>
    </div>
  );
};
