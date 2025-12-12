'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

const HOME_PATH = '/';

export const SiteLogo = () => {
  const pathname = usePathname();

  return (
    <Link href={HOME_PATH} className={cn(pathname === HOME_PATH && 'pointer-events-none')}>
      <Image
        src='/img/profstore-logo.png'
        alt='Profstore logo'
        width={162}
        height={76}
        className='h-auto max-w-full object-cover'
        loading='lazy'
      />
    </Link>
  );
};
