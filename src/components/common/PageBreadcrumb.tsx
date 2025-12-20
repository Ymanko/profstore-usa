'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

import type { FC } from 'react';

const HOME_PAGE = '/';

export const PageBreadcrumb: FC = () => {
  const pathname = usePathname();
  const segments = decodeURIComponent(pathname).split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <Breadcrumb className='border-border mb-7.5 border-b pb-4.5'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={HOME_PAGE}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => (
          <Fragment key={segment}>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            <BreadcrumbItem>
              {index === segments.length - 1 ? (
                <BreadcrumbPage>{segment.charAt(0).toUpperCase() + segment.slice(1)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/${segments.slice(0, index + 1).join('/')}`}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
