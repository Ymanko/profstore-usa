'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { LinkProps } from 'next/link';
import type { ComponentProps } from 'react';

export function NavLink({ children, className, ...props }: ComponentProps<'a'> & LinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'text-primary-foreground truncate transition-colors duration-300',
        pathname === props.href ? 'text-accent pointer-events-none font-medium' : 'hover:text-accent',
        className,
      )}
      {...props}
    >
      <Typography variant='link' as='span' className='text-nowrap'>
        {children}
      </Typography>
    </Link>
  );
}
