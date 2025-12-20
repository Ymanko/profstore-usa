import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  className?: string;
  itemClassName?: string;
}

export const List = <T,>({ data, renderItem, keyExtractor, className, itemClassName }: ListProps<T>) => (
  <ul className={cn(className)}>
    {data.map((item, index) => (
      <li key={keyExtractor(item, index)} className={itemClassName}>
        {renderItem(item, index)}
      </li>
    ))}
  </ul>
);
