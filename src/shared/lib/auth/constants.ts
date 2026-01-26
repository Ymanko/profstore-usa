export const AUTH_COOKIE_NAME = 'shopify_customer_token';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const AUTH_ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
} as const;

export const PROTECTED_ROUTES = ['/profile'];
export const AUTH_PAGES = ['/sign-in', '/sign-up', '/forgot-password'];
