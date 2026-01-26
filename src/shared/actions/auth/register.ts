'use server';

import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_CREATE } from '@/shared/queries/customer/query';

import type { CustomerCreateData } from '@/shared/queries/customer/types';

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  error?: string;
}

export async function register(input: RegisterInput): Promise<RegisterResponse> {
  try {
    const data = await baseClient<CustomerCreateData>(CUSTOMER_CREATE, { input });

    const { customerUserErrors } = data.customerCreate;

    if (customerUserErrors.length > 0) {
      return { success: false, error: customerUserErrors[0].message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
