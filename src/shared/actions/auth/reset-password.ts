'use server';

import { setAuthCookie } from '@/shared/lib/auth/cookies';
import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_RESET } from '@/shared/queries/customer/query';

import type { CustomerResetData } from '@/shared/queries/customer/types';

interface ResetPasswordInput {
  customerId: string;
  resetToken: string;
  password: string;
}

interface ResetPasswordResponse {
  success: boolean;
  error?: string;
}

export async function resetPassword(input: ResetPasswordInput): Promise<ResetPasswordResponse> {
  try {
    // Build the Shopify customer ID in global format
    const customerGid = input.customerId.startsWith('gid://')
      ? input.customerId
      : `gid://shopify/Customer/${input.customerId}`;

    const data = await baseClient<CustomerResetData>(CUSTOMER_RESET, {
      id: customerGid,
      input: {
        resetToken: input.resetToken,
        password: input.password,
      },
    });

    const { customerUserErrors, customerAccessToken } = data.customerReset;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    // If we got an access token, set it as a cookie to log the user in
    if (customerAccessToken?.accessToken && customerAccessToken?.expiresAt) {
      await setAuthCookie(customerAccessToken.accessToken, customerAccessToken.expiresAt);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reset password',
    };
  }
}
