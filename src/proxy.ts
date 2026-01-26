import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME, AUTH_PAGES, AUTH_ROUTES, PROTECTED_ROUTES } from '@/shared/lib/auth/constants';

import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  // Check if trying to access protected route without token
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    const signInUrl = new URL(AUTH_ROUTES.SIGN_IN, request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check if trying to access auth pages while already logged in
  const isAuthPage = AUTH_PAGES.some(route => pathname === route);
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.PROFILE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up', '/forgot-password'],
};
