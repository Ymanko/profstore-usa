'use client';

import { usePathname } from 'next/navigation';

import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

const TITLES: Record<string, string> = {
  '/profile/contact-information': 'Contact information',
  '/profile/order-history': 'Order history',
  '/profile/wishlist': 'Wishlist',
};

export function ProfileTitle({ className }: { className?: string }) {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? 'Profile';

  return (
    <Typography variant='h1' className={cn('text-2xl md:text-3xl', className)}>
      {title}
    </Typography>
  );
}
