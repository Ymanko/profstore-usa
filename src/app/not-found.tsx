import Link from 'next/link';

import { TransitionLayout } from '@/features/layout/transition-layout';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';

export default function NotFound() {
  return (
    <TransitionLayout>
      <section className='flex min-h-[60vh] items-center justify-center py-20'>
        <div className='container'>
          <div className='mx-auto max-w-2xl text-center'>
            <div className='mb-8'>
              <Typography as='h1' variant='hero' className='text-primary mb-4 text-6xl'>
                404
              </Typography>

              <Typography as='h2' variant='h1' className='text-foreground mb-4'>
                Page Not Found
              </Typography>

              <Typography variant='body-lg' className='text-muted-foreground'>
                Sorry, the page you are looking for does not exist or has been moved.
              </Typography>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <CustomLink href='/' className='bg-primary text-primary-foreground hover:bg-primary/90'>
                Return Home
              </CustomLink>
            </div>
          </div>
        </div>
      </section>
    </TransitionLayout>
  );
}

function CustomLink({ className, ...props }: PropsWithChildren<LinkProps & { className?: string }>) {
  return (
    <Link
      className={cn('font-montserrat rounded-lg px-6 py-3 font-medium transition-colors duration-200', className)}
      {...props}
    />
  );
}
