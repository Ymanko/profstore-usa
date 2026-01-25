'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

const PROFILE_NAV_ITEMS = [
  { label: 'Contact information', href: '/profile/contact-information' },
  { label: 'Order history', href: '/profile/order-history' },
  { label: 'Wishlist', href: '/profile/wishlist' },
] as const;

export function ProfileSidebar({ className, ...props }: ComponentProps<'nav'>) {
  const pathname = usePathname();

  return (
    <nav className={cn('bg-sidebar rounded-[10px] px-5 shadow-xs md:px-3 md:py-6', className)} {...props}>
      <ul className='space-y-0'>
        {PROFILE_NAV_ITEMS.map(item => (
          <li key={item.href} className='border-border border-b'>
            <Link
              href={item.href}
              className={cn(
                'hover:text-primary block py-3.75 text-base transition-colors',
                pathname === item.href ? 'text-secondary' : 'text-foreground',
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}

        <li className='border-border border-b'>
          <SidebarButton className='text-destructive hover:text-destructive/60'>Delete my account</SidebarButton>
        </li>

        <li>
          <SidebarButton className='text-muted-foreground hover:text-muted-foreground/60'>Exit</SidebarButton>
        </li>
      </ul>
    </nav>
  );
}

function SidebarButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type='button'
      className={cn('block w-full py-4 text-left text-base transition-colors', className)}
      {...props}
    />
  );
}
