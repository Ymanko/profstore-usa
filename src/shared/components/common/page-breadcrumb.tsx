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
} from '@/shared/components/ui/breadcrumb';

import type { FC } from 'react';

const HOME_PAGE = '/';

export const PageBreadcrumb: FC = () => {
  const pathname = usePathname();
  const allSegments = decodeURIComponent(pathname).split('/').filter(Boolean);

  // Filter out 'collections' from display but keep track of original path
  const displaySegments = allSegments.filter(segment => segment !== 'collections');

  if (displaySegments.length === 0) return null;

  // Helper to build correct path including 'collections' if needed
  const buildPath = (displayIndex: number) => {
    const targetDisplaySegment = displaySegments[displayIndex];
    const originalIndex = allSegments.indexOf(targetDisplaySegment);
    return `/${allSegments.slice(0, originalIndex + 1).join('/')}`;
  };

  return (
    <Breadcrumb className='border-border mb-7.5 border-b pb-4.5'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={HOME_PAGE}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {displaySegments.map((segment, index) => (
          <Fragment key={`${segment}-${index}`}>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            <BreadcrumbItem>
              {index === displaySegments.length - 1 ? (
                <BreadcrumbPage>{segment.charAt(0).toUpperCase() + segment.slice(1)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={buildPath(index)}>{segment.charAt(0).toUpperCase() + segment.slice(1)}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
