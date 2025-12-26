import { baseClient } from '@/shared/lib/graphql/base-client';

export async function serverGraphqlFetcher<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  options?: {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
  },
): Promise<TData> {
  return baseClient<TData>(query, variables, {
    cache: options?.cache,
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  });
}
