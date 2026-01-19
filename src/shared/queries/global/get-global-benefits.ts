import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_GLOBAL_BENEFITS } from '@/shared/queries/global/query';

import type { GlobalBenefitsData, ParsedGlobalBenefits } from '@/shared/queries/global/types';

export const getGlobalBenefitsQueryOptions = queryOptions({
  queryKey: ['global-benefits'],
  queryFn: async () => {
    return serverGraphqlFetcher<GlobalBenefitsData>(
      GET_GLOBAL_BENEFITS,
      {},
      { tags: ['global-benefits'], revalidate: 3600 },
    );
  },
  staleTime: STALE_TIME.ONE_HOUR,
  select: parseGlobalBenefits,
});

function parseGlobalBenefits(data: GlobalBenefitsData): ParsedGlobalBenefits | null {
  const entry = data.metaobjects.edges[0]?.node;
  if (!entry) return null;

  const getField = (key: string) => entry.fields.find(f => f.key === key);

  const benefitsValue = getField('benefits_list')?.value;
  let benefitsList: string[] = [];

  if (benefitsValue) {
    try {
      benefitsList = JSON.parse(benefitsValue);
    } catch {
      benefitsList = [benefitsValue];
    }
  }

  return {
    title: getField('title')?.value || null,
    callToAction: getField('call_to_action')?.value === 'true',
    benefitsList,
    excludedProductId: getField('excluded_products')?.reference?.id || null,
    excludedProductHandle: getField('excluded_products')?.reference?.handle || null,
  };
}
