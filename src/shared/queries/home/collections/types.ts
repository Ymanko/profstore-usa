import type { QueryRoot } from '@/shared/lib/graphql/graphql';

export type ProductCollectionsResponse = {
  shop: {
    newProductsCount: {
      value: string;
    } | null;
  };
  recommended: QueryRoot['collection'];
  new: QueryRoot['products'];
  saleHits: QueryRoot['collection'];
};
