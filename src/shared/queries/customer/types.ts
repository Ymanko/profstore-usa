export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerUserError {
  code: string;
  field: string[];
  message: string;
}

export interface CustomerAccessTokenCreateData {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerCreateData {
  customerCreate: {
    customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    } | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerAccessTokenDeleteData {
  customerAccessTokenDelete: {
    deletedAccessToken: string | null;
    deletedCustomerAccessTokenId: string | null;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

export interface CustomerRecoverData {
  customerRecover: {
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerAddress {
  id: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  zip: string;
  country: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: number;
  totalPrice: { amount: string; currencyCode: string };
  processedAt: string;
  fulfillmentStatus: string;
}

export interface Customer {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  defaultAddress: CustomerAddress | null;
  orders: { edges: Array<{ node: CustomerOrder }> };
}

export interface CustomerData {
  customer: Customer | null;
}

export interface CustomerResetData {
  customerReset: {
    customer: {
      id: string;
      email: string;
    } | null;
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface CustomerUpdateData {
  customerUpdate: {
    customer: {
      id: string;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      phone: string | null;
    } | null;
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}
