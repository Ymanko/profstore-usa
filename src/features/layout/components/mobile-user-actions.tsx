import Link from 'next/link';

import { List } from '@/shared/components/common/list';
import { Icon } from '@/shared/components/ui/icon';
import { HEADER_USER_ACTIONS } from '@/shared/constants/user-menu';
import { cn } from '@/shared/lib/utils';

import type { IconName } from '@/shared/components/ui/icon';
import type { ComponentPropsWithoutRef, FC } from 'react';

export const MobileUserActions: FC<ComponentPropsWithoutRef<'ul'>> = ({ className, ...props }) => {
  return (
    <List
      data={HEADER_USER_ACTIONS}
      renderItem={(item, index) => {
        if (index === 0) return null;

        return (
          <Link href={item.href} className='text-primary-foreground'>
            <Icon name={item.icon as IconName} className='' width='24' height='24' />
          </Link>
        );
      }}
      keyExtractor={item => item.label.toLowerCase()}
      className={cn('flex items-center gap-x-6', className)}
      {...props}
    />
  );
};
