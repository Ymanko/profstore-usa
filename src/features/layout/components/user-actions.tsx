'use client';

import Link from 'next/link';
import React from 'react';

import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { Typography } from '@/shared/components/ui/typography';
import { useAuth } from '@/shared/providers/auth-provider';

import type { IconName } from '@/shared/types/icon-names';
import type { ComponentProps } from 'react';

const BASE_USER_ACTIONS: Array<{
  href: string;
  icon: IconName;
  label: string;
}> = [
  { href: '/basket', icon: 'shopping-cart', label: 'Basket' },
  { href: '/comparison', icon: 'scales', label: 'Comparison' },
  { href: '/profile/wishlist', icon: 'heart', label: 'Favorites' },
];

export function UserActions({ className, ...props }: ComponentProps<'div'>) {
  const { isAuthenticated, customer } = useAuth();

  const accountAction = {
    href: isAuthenticated ? '/profile' : '/sign-in',
    icon: 'user' as IconName,
    label: isAuthenticated && customer?.firstName ? customer.firstName : isAuthenticated ? 'Account' : 'Sign in',
  };

  const userActions = [...BASE_USER_ACTIONS, accountAction];
  const firstItem = userActions[0];

  return (
    <div className={className} {...props}>
      <Link
        href={firstItem.href}
        className='hover:text-accent grid justify-items-center gap-2 transition-colors duration-300 xl:hidden'
      >
        <Icon name={firstItem.icon} />
        <Typography variant='body' as='span'>
          {firstItem.label}
        </Typography>
      </Link>

      <List
        data={userActions}
        renderItem={item => (
          <Link
            href={item.href}
            className='hover:text-accent grid justify-items-center gap-2 transition-colors duration-300'
          >
            <Icon name={item.icon} />
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
