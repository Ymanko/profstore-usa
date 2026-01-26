'use server';

import { baseClient } from '@/shared/lib/graphql/base-client';
import { CUSTOMER_RECOVER } from '@/shared/queries/customer/query';

import type { CustomerRecoverData } from '@/shared/queries/customer/types';

interface RecoverResponse {
  success: boolean;
  error?: string;
}

export async function recoverPassword(email: string): Promise<RecoverResponse> {
  try {
    const data = await baseClient<CustomerRecoverData>(CUSTOMER_RECOVER, { email });

    const { customerUserErrors } = data.customerRecover;

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
