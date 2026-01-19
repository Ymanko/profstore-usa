import type { QueryRoot } from '@/shared/lib/graphql/graphql';

export type NewProductsResponse = {
  shop: {
    newProductsCount: {
      value: string;
    } | null;
  };
  products: QueryRoot['products'];
};
