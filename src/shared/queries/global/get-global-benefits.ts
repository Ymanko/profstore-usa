import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

const GET_GLOBAL_BENEFITS = `
  query GetGlobalBenefits {
    metaobjects(type: "global_benefits", first: 1) {
      edges {
        node {
          handle
          fields {
            key
            value
            reference {
              ... on Product {
                id
                handle
              }
            }
          }
        }
      }
    }
  }
`;

export interface GlobalBenefitsData {
  metaobjects: {
    edges: Array<{
      node: {
        handle: string;
        fields: Array<{
          key: string;
          value: string | null;
          reference: {
            id: string;
            handle: string;
          } | null;
        }>;
      };
    }>;
  };
}

export interface ParsedGlobalBenefits {
  title: string | null;
  callToAction: boolean;
  benefitsList: string[];
  excludedProductId: string | null;
  excludedProductHandle: string | null;
}

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

export const getGlobalBenefitsQueryOptions = () =>
  queryOptions({
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
