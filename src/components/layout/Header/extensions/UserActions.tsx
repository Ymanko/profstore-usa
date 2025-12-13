import Link from 'next/link';
import React from 'react';

import { List } from '@/components/common/List';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui/Typography';
import { HEADER_USER_ACTIONS } from '@/constants/user-menu';

import type { IconName } from '@/components/ui/Icon';
import type { FC, ComponentPropsWithoutRef } from 'react';

export const UserActions: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => {
  const firstItem = HEADER_USER_ACTIONS[0];

  return (
    <div className={className} {...props}>
      <Link href={firstItem.href} className='grid justify-items-center gap-2 xl:hidden'>
        <Icon name={firstItem.icon as IconName} className='' width='24' height='24' />
        <Typography variant='body' as='span'>
          {firstItem.label}
        </Typography>
      </Link>

      <List
        data={HEADER_USER_ACTIONS}
        renderItem={item => (
          <Link href={item.href} className='grid justify-items-center gap-2'>
            <Icon name={item.icon as IconName} className='' width='24' height='24' />
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
};
