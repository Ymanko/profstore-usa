import { List } from '@/components/common/List';
import { NavLink } from '@/components/common/NavLink';
import { NAV_ITEMS } from '@/constants/user-menu';
import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

export function Navbar({ className, ...props }: ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav className={cn(className)} {...props}>
      <List
        data={NAV_ITEMS}
        renderItem={item => <NavLink href={item.href}>{item.label}</NavLink>}
        keyExtractor={item => item.label.toLowerCase()}
      />
    </nav>
  );
}
