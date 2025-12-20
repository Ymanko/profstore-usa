import { baseClient } from '@/lib/graphql/base-client';

export async function graphqlFetcher<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
): Promise<TData> {
  return baseClient<TData>(query, variables);
}
