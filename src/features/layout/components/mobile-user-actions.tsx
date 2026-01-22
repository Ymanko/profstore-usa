import Link from 'next/link';
import React from 'react';

import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { HEADER_USER_ACTIONS } from '@/shared/constants/user-menu';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export function MobileUserActions({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <List
      data={HEADER_USER_ACTIONS}
      renderItem={(item, index) => {
        if (index === 0) return null;

        return (
          <Link href={item.href} className='text-primary-foreground'>
            <Icon name={item.icon} />
          </Link>
        );
      }}
      keyExtractor={item => item.label.toLowerCase()}
      className={cn('flex items-center gap-x-6', className)}
      {...props}
    />
  );
}
