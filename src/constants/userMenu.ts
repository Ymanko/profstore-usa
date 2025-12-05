export const HEADER_USER_ACTIONS = [
  { label: 'Basket', href: '/basket', icon: 'icon-shopping-cart' },
  { label: 'Comparison', href: '/comparison', icon: 'icon-scales' },
  { label: 'Favorites', href: '/favorites', icon: 'icon-heart' },
  { label: 'Sign in', href: '/sign-in', icon: 'icon-log-in' },
] as const;

export const MOBILE_HEADER_USER_ACTIONS = [
  { href: '/comparison', icon: 'icon-scales' },
  { href: '/favorites', icon: 'icon-heart' },
  { href: '/sign-in', icon: 'icon-user' },
] as const;

export const NAV_ITEMS = [
  { label: 'New', href: '/' },
  { label: 'Delivery and payment', href: '/delivery' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'How to Buy', href: '/how-to-buy' },
  { label: 'Producers', href: '/producers' },
  { label: 'Shares', href: '/shares' },
  { label: 'Warranty and service', href: '/warranty' },
];
