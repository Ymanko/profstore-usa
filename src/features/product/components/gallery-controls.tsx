import { Search } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

function ControlButton(props: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type='button'
      className={cn(
        'absolute bottom-1 left-1.5 z-50',
        'flex h-12 w-21 items-center justify-center xl:h-14 xl:w-26',
        'focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'bg-white transition-opacity duration-200 hover:opacity-75',
      )}
      aria-label='Next image'
      {...props}
    >
      <svg width='34' height='31' viewBox='0 0 34 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M27.9688 6.38484V0L17 8.68L6.03123 0V6.38484L17 15.0648L27.9688 6.38484Z'
          fill='url(#paint0_linear_30_2312)'
        />
        <path
          d='M34 17.5448V7.64795L17 21.1031L0 7.64795V17.5448L17 31L34 17.5448Z'
          fill='url(#paint1_linear_30_2312)'
        />
        <defs>
          <linearGradient
            id='paint0_linear_30_2312'
            x1='16.9998'
            y1='-1.56745'
            x2='17'
            y2='31'
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='white' />
            <stop offset='1' stop-color='#DADCE2' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_30_2312'
            x1='16.9998'
            y1='-1.56745'
            x2='17'
            y2='31'
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='white' />
            <stop offset='1' stop-color='#DADCE2' />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}

function ZoomButton({ isFullscreen, ...props }: ComponentPropsWithoutRef<'button'> & { isFullscreen: boolean }) {
  return (
    <button
      type='button'
      className={cn(
        'absolute top-3.5 left-3.5 z-10',
        'inline-flex size-9 items-center justify-center rounded-md',
        'focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'text-muted-foreground hover:bg-background/70 bg-transparent transition duration-200',
      )}
      aria-label={isFullscreen ? 'Close zoom' : 'Open zoom'}
      {...props}
    >
      <Search className='text-foreground size-5' />
    </button>
  );
}

export { ControlButton, ZoomButton };
