import { cookies } from 'next/headers';

import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from '@/shared/lib/auth/constants';

export async function setAuthCookie(accessToken: string, expiresAt: string) {
  const cookieStore = await cookies();
  const expiresDate = new Date(expiresAt);
  const maxAge = Math.min(Math.floor((expiresDate.getTime() - Date.now()) / 1000), AUTH_COOKIE_MAX_AGE);

  cookieStore.set(AUTH_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
