'use client';

import Link from 'next/link';

import { TransitionLayout } from '@/features/layout/transition-layout';
import { Typography } from '@/shared/components/ui/typography';

interface ErrorPage {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPage) {
  return (
    <TransitionLayout>
      <section className='flex min-h-[60vh] items-center justify-center py-20'>
        <div className='container'>
          <div className='border-border bg-muted/30 mx-auto max-w-2xl rounded-lg border p-8 text-center shadow-sm md:p-12'>
            <div className='mb-6 flex justify-center'>
              <div className='bg-destructive/10 flex h-16 w-16 items-center justify-center rounded-full'>
                <svg
                  className='text-destructive h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
            </div>

            <Typography as='h1' variant='h1' className='text-foreground mb-4'>
              Something went wrong
            </Typography>

            <Typography variant='body-lg' className='text-muted-foreground mb-6'>
              An error occurred while loading the page. Please try refreshing or come back later.
            </Typography>

            {error.message && (
              <div className='bg-destructive/5 mb-8 rounded-md p-4 text-left'>
                <Typography variant='small' className='text-destructive font-mono'>
                  <strong>Error:</strong> {error.message}
                </Typography>
                {error.digest && (
                  <Typography variant='small' className='text-muted-foreground mt-2 font-mono'>
                    ID: {error.digest}
                  </Typography>
                )}
              </div>
            )}

            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <button
                onClick={reset}
                className='bg-primary font-montserrat text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-colors'
              >
                Try again
              </button>
              <Link
                href='/'
                className='border-border bg-background font-montserrat text-foreground hover:bg-muted rounded-lg border px-6 py-3 font-medium transition-colors'
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </TransitionLayout>
  );
}
