'use server';

import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/shared/queries/customer/query';

import type { CustomerAccessTokenCreateData } from '@/shared/queries/customer/types';

interface VerifyPasswordInput {
  email: string;
  password: string;
}

export async function verifyPassword(input: VerifyPasswordInput): Promise<boolean> {
  try {
    const data = await baseClient<CustomerAccessTokenCreateData>(CUSTOMER_ACCESS_TOKEN_CREATE, { input });

    const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

    if (customerUserErrors.length > 0 || !customerAccessToken) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
