'use server';

import { setAuthCookie } from '@/shared/lib/auth/cookies';
import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/shared/queries/customer/query';

import type { CustomerAccessTokenCreateData } from '@/shared/queries/customer/types';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  error?: string;
}

export async function login(input: LoginInput): Promise<LoginResponse> {
  try {
    const data = await baseClient<CustomerAccessTokenCreateData>(CUSTOMER_ACCESS_TOKEN_CREATE, { input });

    const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    if (!customerAccessToken) {
      return { success: false, error: 'Failed to create access token' };
    }

    await setAuthCookie(customerAccessToken.accessToken, customerAccessToken.expiresAt);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
