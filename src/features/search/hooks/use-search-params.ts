import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';

export type SearchParams = {
  q: string;
  category: string;
  subcategory: string;
  inDescription: boolean;
};

export function useSearchParams() {
  const [params, setParams] = useQueryStates(
    {
      q: parseAsString.withDefault(''),
      category: parseAsString.withDefault(''),
      subcategory: parseAsString.withDefault(''),
      inDescription: parseAsBoolean.withDefault(false),
    },
    {
      history: 'push',
    },
  );

  return {
    params,
    setParams,
  };
}
