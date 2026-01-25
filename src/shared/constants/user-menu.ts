import type { IconName } from '@/shared/types/icon-names';

export const HEADER_USER_ACTIONS: Array<{
  href: string;
  icon: IconName;
  label: string;
}> = [
  { href: '/basket', icon: 'shopping-cart', label: 'Basket' },
  { href: '/comparison', icon: 'scales', label: 'Comparison' },
  { href: '/profile/wishlist', icon: 'heart', label: 'Favorites' },
  { href: '/profile', icon: 'user', label: 'Sign in' },
];

export const NAV_ITEMS = [
  { label: 'New', href: '/' },
  { label: 'Delivery and payment', href: '/delivery' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'About', href: '/about' },
  { label: 'Producers', href: '/producers' },
  { label: 'Shares', href: '/shares' },
  { label: 'Warranty and service', href: '/warranty-service' },
];
