import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_DISCOUNTED_PRODUCTS } from '@/shared/queries/products/query';

import type { DiscountedProductsData } from '@/shared/queries/products/types';

export const getDiscountedProductsQueryOptions = queryOptions({
  queryKey: ['discounted-products'],
  queryFn: async () => {
    return serverGraphqlFetcher<DiscountedProductsData>(
      GET_DISCOUNTED_PRODUCTS,
      { first: 20 },
      { tags: ['products', 'discounted'] },
    );
  },
  staleTime: STALE_TIME.FIVE_MINUTES,
  select: data =>
    data.products.edges
      .map(edge => edge.node)
      .filter(product => {
        const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
        return !(!compareAtPrice || parseFloat(compareAtPrice) === 0);
      }),
});
