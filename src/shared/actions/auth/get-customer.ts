'use server';

import { getAuthCookie } from '@/shared/lib/auth/cookies';
import { baseClient } from '@/shared/lib/graphql/base-client';
import { GET_CUSTOMER } from '@/shared/queries/customer/query';

import type { Customer, CustomerData } from '@/shared/queries/customer/types';

export async function getCustomer(): Promise<Customer | null> {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    const data = await baseClient<CustomerData>(GET_CUSTOMER, { customerAccessToken: token });

    return data.customer;
  } catch {
    return null;
  }
}
