export const HEADER_USER_ACTIONS = [
  { label: 'Basket', href: '/basket', icon: 'shoppingCart' },
  { label: 'Comparison', href: '/comparison', icon: 'scales' },
  { label: 'Favorites', href: '/favorites', icon: 'heart' },
  { label: 'Sign in', href: '/sign-in', icon: 'logIn' },
] as const;

export const MOBILE_HEADER_USER_ACTIONS = [
  { href: '/comparison', icon: 'scales' },
  { href: '/favorites', icon: 'heart' },
  { href: '/sign-in', icon: 'user' },
] as const;

export const DESKTOP_HEADER_USER_ACTIONS = [
  { href: '/basket', icon: 'shoppingCart', label: 'Basket' },
  { href: '/comparison', icon: 'scales', label: 'Comparison' },
  { href: '/favorites', icon: 'heart', label: 'Favorites' },
  { href: '/sign-in', icon: 'user', label: 'Sign in' },
] as const;

export const NAV_ITEMS = [
  { label: 'New', href: '/' },
  { label: 'Delivery and payment', href: '/delivery' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'How to Buy', href: '/how-to-buy' },
  { label: 'Producers', href: '/producers' },
  { label: 'Shares', href: '/shares' },
  { label: 'Warranty and service', href: '/warranty' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
