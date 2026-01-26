'use server';

import { deleteAuthCookie, getAuthCookie } from '@/shared/lib/auth/cookies';
import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_ACCESS_TOKEN_DELETE } from '@/shared/queries/customer/query';

import type { CustomerAccessTokenDeleteData } from '@/shared/queries/customer/types';

export async function logout(): Promise<{ success: boolean }> {
  try {
    const token = await getAuthCookie();

    if (token) {
      await baseClient<CustomerAccessTokenDeleteData>(CUSTOMER_ACCESS_TOKEN_DELETE, {
        customerAccessToken: token,
      });
    }

    await deleteAuthCookie();
    return { success: true };
  } catch {
    await deleteAuthCookie();
    return { success: true };
  }
}
