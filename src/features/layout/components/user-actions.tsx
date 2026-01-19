import Link from 'next/link';
import React from 'react';

import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';
import { HEADER_USER_ACTIONS } from '@/shared/constants/user-menu';

import type { ComponentProps } from 'react';

export function UserActions({ className, ...props }: ComponentProps<'div'>) {
  const firstItem = HEADER_USER_ACTIONS[0];

  return (
    <div className={className} {...props}>
      <Link
        href={firstItem.href}
        className='hover:text-accent grid justify-items-center gap-2 transition-colors duration-300 xl:hidden'
      >
        <Icon id={firstItem.icon} />
        <Typography variant='body' as='span'>
          {firstItem.label}
        </Typography>
      </Link>

      <List
        data={HEADER_USER_ACTIONS}
        renderItem={item => (
          <Link
            href={item.href}
            className='hover:text-accent grid justify-items-center gap-2 transition-colors duration-300'
          >
            <Icon id={item.icon} />
            <Typography variant='body' as='span'>
              {item.label}
            </Typography>
          </Link>
        )}
        keyExtractor={item => item.label.toLowerCase()}
        className='hidden items-center gap-7.5 xl:flex'
      />
    </div>
  );
}
