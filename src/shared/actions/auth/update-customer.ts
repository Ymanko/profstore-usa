'use server';

import { getAuthCookie, setAuthCookie } from '@/shared/lib/auth/cookies';
import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_UPDATE } from '@/shared/queries/customer/query';

import type { CustomerUpdateData } from '@/shared/queries/customer/types';

interface UpdateCustomerInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface UpdateCustomerResponse {
  success: boolean;
  error?: string;
  customer?: {
    id: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  };
}

export async function updateCustomer(input: UpdateCustomerInput): Promise<UpdateCustomerResponse> {
  try {
    const accessToken = await getAuthCookie();

    if (!accessToken) {
      return { success: false, error: 'Not authenticated' };
    }

    const data = await baseClient<CustomerUpdateData>(CUSTOMER_UPDATE, {
      customerAccessToken: accessToken,
      customer: input,
    });

    const { customerUserErrors, customer, customerAccessToken } = data.customerUpdate;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    // If a new access token was returned (e.g., after email change), update the cookie
    if (customerAccessToken?.accessToken && customerAccessToken?.expiresAt) {
      await setAuthCookie(customerAccessToken.accessToken, customerAccessToken.expiresAt);
    }

    return {
      success: true,
      customer: customer || undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
}
