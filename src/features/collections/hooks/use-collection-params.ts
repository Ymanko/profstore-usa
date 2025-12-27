import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

export function useCollectionParams() {
  const [params, setParams] = useQueryStates(
    {
      sort: parseAsStringEnum(['BEST_SELLING', 'PRICE', 'CREATED', 'TITLE', 'RELEVANCE'] as const).withDefault(
        'BEST_SELLING',
      ),
      reverse: parseAsInteger.withDefault(0),
      show: parseAsInteger.withDefault(12),
      f: parseAsString.withDefault(''),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
    },
    {
      history: 'push',
    },
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'BEST_SELLING' | 'PRICE_ASC' | 'PRICE_DESC' | 'CREATED';

    switch (value) {
      case 'BEST_SELLING':
        setParams({ sort: 'BEST_SELLING', reverse: 0 });
        break;
      case 'PRICE_ASC':
        setParams({ sort: 'PRICE', reverse: 0 });
        break;
      case 'PRICE_DESC':
        setParams({ sort: 'PRICE', reverse: 1 });
        break;
      case 'CREATED':
        setParams({ sort: 'CREATED', reverse: 1 });
        break;
      default:
        setParams({ sort: 'BEST_SELLING', reverse: 0 });
    }
  };

  const handleShowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({ show: parseInt(e.target.value) });
  };

  const getSortSelectValue = () => {
    const sortKey = params.sort;
    const reverse = params.reverse === 1;

    if (sortKey === 'BEST_SELLING') return 'BEST_SELLING';
    if (sortKey === 'PRICE' && !reverse) return 'PRICE_ASC';
    if (sortKey === 'PRICE' && reverse) return 'PRICE_DESC';
    if (sortKey === 'CREATED') return 'CREATED';
    return 'BEST_SELLING';
  };

  return {
    params,
    setParams,
    handlers: {
      handleSortChange,
      handleShowChange,
      getSortSelectValue,
    },
  };
}
